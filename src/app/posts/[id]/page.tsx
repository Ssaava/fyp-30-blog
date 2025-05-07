/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { useAuth } from "@/lib/auth-context";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  author: {
    _id: string;
    name: string;
  };
}

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [authorAvatar, setAuthorAvatar] = useState<string>(
    "/placeholder.svg?height=200&width=200"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch post");
        }

        setPost(data);

        // Fetch author info to get avatar
        if (data.author && data.author._id) {
          try {
            const authorResponse = await fetch(
              `/api/users/${data.author._id}/public`
            );
            if (authorResponse.ok) {
              const authorData = await authorResponse.json();
              if (authorData.avatarUrl) {
                setAuthorAvatar(authorData.avatarUrl);
              }
            }
          } catch (error) {
            console.error("Error fetching author info:", error);
          }
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the post");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-500">{error || "Post not found"}</p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Back to Home
            </Button>
          </div>
        </div>
      </>
    );
  }

  const canEdit =
    user && (user._id === post.author._id || user.role === "admin");

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/4">
            <Card className="p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Button
                    variant="link"
                    className="p-0 h-auto flex items-center gap-2 text-sm"
                    onClick={() => router.push(`/authors/${post.author._id}`)}
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={authorAvatar || "/placeholder.svg"}
                        alt={post.author.name}
                      />
                      <AvatarFallback>
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {post.author.name}
                  </Button>
                  <span>•</span>
                  <span>
                    {format(new Date(post.createdAt), "MMMM d, yyyy")}
                  </span>
                  {canEdit && (
                    <>
                      <span>•</span>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm"
                        onClick={() =>
                          router.push(`/dashboard/posts/${post._id}/edit`)
                        }
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(`/?tag=${encodeURIComponent(tag)}`)
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <MarkdownRenderer content={post.content} />
              </div>
            </Card>
          </div>
          <div className="md:w-1/4">
            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
}
