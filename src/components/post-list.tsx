/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch posts");
        }

        setPosts(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/3" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-8">No posts found</div>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post._id} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl">
              <Button
                variant="link"
                className="p-0 h-auto text-2xl font-bold hover:no-underline"
                onClick={() => router.push(`/posts/${post._id}`)}
              >
                {post.title}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 text-muted-foreground">
              {post.content.replace(/[#*`]/g, "").substring(0, 200)}...
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              By {post.author.name} •{" "}
              {format(new Date(post.createdAt), "MMMM d, yyyy")}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/posts/${post._id}`)}
            >
              Read More
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
