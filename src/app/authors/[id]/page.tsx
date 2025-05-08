/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/header";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MarkdownRenderer } from "@/components/markdown-renderer";

interface Author {
  _id: string;
  name: string;
  about: string;
  avatarUrl: string;
  role: string;
  postsCount: number;
}

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

export default function AuthorPage() {
  const [author, setAuthor] = useState<Author | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setIsLoading(true);

        // Fetch author information
        const authorResponse = await fetch(`/api/users/${params.id}/public`);

        if (!authorResponse.ok) {
          const data = await authorResponse.json();
          throw new Error(data.message || "Failed to fetch author information");
        }

        const authorData = await authorResponse.json();
        setAuthor(authorData);

        // Fetch author's posts
        const postsResponse = await fetch(`/api/posts?author=${params.id}`);

        if (!postsResponse.ok) {
          const data = await postsResponse.json();
          throw new Error(data.message || "Failed to fetch author's posts");
        }

        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching author information"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchAuthor();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-4/6" />
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

  if (error || !author) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || "Author not found"}</AlertDescription>
          </Alert>
          <Button onClick={() => router.push("/")} className="mt-4">
            Back to Home
          </Button>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={author.avatarUrl || "/placeholder.svg"}
                  alt={author.name}
                />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl mb-2">{author.name}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge>{author.role}</Badge>
                  <Badge variant="outline">{author.postsCount} posts</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <MarkdownRenderer content={author.about} />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="posts">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            {posts.length === 0 ? (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">No published posts yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post._id} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        <Button
                          variant="link"
                          className="p-0 h-auto text-xl font-bold hover:no-underline"
                          onClick={() => router.push(`/posts/${post._id}`)}
                        >
                          {post.title}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {post.content.replace(/[#*`]/g, "").substring(0, 150)}
                        ...
                      </p>
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
                    </CardContent>
                    <CardContent className="pt-0">
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(post.createdAt), "MMMM d, yyyy")}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
