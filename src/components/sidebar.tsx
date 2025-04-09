"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface Post {
  _id: string;
  title: string;
}

interface Author {
  _id: string;
  name: string;
}

export function Sidebar() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch("/api/posts?limit=5");
        const data = await response.json();
        setRecentPosts(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchRecentPosts();
    fetchAuthors();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleAuthorFilter = (authorId: string) => {
    router.push(`/?author=${authorId}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <li key={post._id}>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-left text-sm font-normal hover:underline"
                    onClick={() => router.push(`/posts/${post._id}`)}
                  >
                    {post.title}
                  </Button>
                </li>
              ))
            ) : (
              <li className="text-sm text-muted-foreground">No recent posts</li>
            )}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Authors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {authors.length > 0 ? (
              authors.map((author) => (
                <Badge
                  key={author._id}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => handleAuthorFilter(author._id)}
                >
                  {author.name}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No authors found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
