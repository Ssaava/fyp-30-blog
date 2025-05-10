/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { MarkdownEditor } from "@/components/markdown-editor";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  published: boolean;
  author: {
    _id: string;
    name: string;
  };
}

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string | undefined>("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  console.log("Id: ", id);
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch post");
        }

        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags || []);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the post");
      } finally {
        setIsLoading(false);
      }
    };

    if (id && isAuthenticated) {
      fetchPost();
    }
  }, [id, isAuthenticated]);

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = async (publish: boolean) => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!content?.trim()) {
      setError("Content is required");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          tags,
          published: publish,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update post");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the post");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || !post) return null;

  // Check if the user is authorized to edit this post
  if (user.role !== "admin" && post.author._id !== user._id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>
            You are not authorized to edit this post
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <MarkdownEditor value={content} onChange={setContent} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a tag and press Enter"
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={isSaving}
            >
              Save as Draft
            </Button>
            <Button onClick={() => handleSave(true)} disabled={isSaving}>
              {isSaving ? "Saving..." : "Publish"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
