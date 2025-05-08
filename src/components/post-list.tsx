/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const searchParams = useSearchParams();

  // Get search parameters
  const authorId = searchParams.get("author");
  const searchTerm = searchParams.get("search");
  const tag = searchParams.get("tag");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        // Build query parameters
        const params = new URLSearchParams();

        if (authorId) {
          params.set("author", authorId);
        }

        if (searchTerm) {
          params.set("search", searchTerm);
        }

        if (tag) {
          params.set("tag", tag);
        }

        // Fetch posts with filters
        const response = await fetch(`/api/posts?${params.toString()}`);
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
  }, [authorId, searchTerm, tag]);

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
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Show active filters if any
  const hasFilters = authorId || searchTerm || tag;

  if (posts.length === 0) {
    return (
      <div>
        {hasFilters && (
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Active filters:</h2>
            <div className="flex flex-wrap gap-2">
              {authorId && <Badge variant="secondary">Author filter</Badge>}
              {searchTerm && (
                <Badge variant="secondary">Search: {searchTerm}</Badge>
              )}
              {tag && <Badge variant="secondary">Tag: {tag}</Badge>}
            </div>
            <Button
              variant="link"
              className="px-0 mt-2"
              onClick={() => router.push("/")}
            >
              Clear all filters
            </Button>
          </div>
        )}
        <div className="text-center py-8 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">No posts found</p>
          {hasFilters && (
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search filters
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {hasFilters && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Active filters:</h2>
          <div className="flex flex-wrap gap-2">
            {authorId && <Badge variant="secondary">Author filter</Badge>}
            {searchTerm && (
              <Badge variant="secondary">Search: {searchTerm}</Badge>
            )}
            {tag && <Badge variant="secondary">Tag: {tag}</Badge>}
          </div>
          <Button
            variant="link"
            className="px-0 mt-2"
            onClick={() => router.push("/")}
          >
            Clear all filters
          </Button>
        </div>
      )}

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
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/?tag=${encodeURIComponent(tag)}`);
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                By{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(
                      `/authors/${encodeURIComponent(post.author._id)}`
                    );
                  }}
                >
                  {post.author.name}
                </Button>{" "}
                • {format(new Date(post.createdAt), "MMMM d, yyyy")}
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
    </div>
  );
}
