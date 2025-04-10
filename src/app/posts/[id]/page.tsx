/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { useAuth } from "@/lib/auth-context";
import { MarkdownRenderer } from "@/components/markdown-renderer";

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

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch post");
        }

        setPost(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the post");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

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
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span>By {post.author.name}</span>
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
                    <Badge key={tag} variant="secondary">
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
