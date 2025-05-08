"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { TagCloud } from "./tag-cloud";

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
  const searchParams = useSearchParams();

  // Get current search parameters
  const currentAuthor = searchParams.get("author");
  const currentSearch = searchParams.get("search");
  const currentTag = searchParams.get("tag");

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
        // Use the public endpoint that doesn't require authentication
        const response = await fetch("/api/users/public");
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchRecentPosts();
    fetchAuthors();
  }, []);

  // Initialize search term from URL if present
  useEffect(() => {
    if (currentSearch) {
      setSearchTerm(currentSearch);
    }
  }, [currentSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Build the query parameters
    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }

    // Preserve other existing filters
    if (currentAuthor) {
      params.set("author", currentAuthor);
    }

    if (currentTag) {
      params.set("tag", currentTag);
    }

    // Navigate with the updated search parameters
    router.push(`/?${params.toString()}`);
  };

  const handleAuthorFilter = (authorId: string) => {
    // Build the query parameters
    const params = new URLSearchParams();

    // Toggle author filter
    if (currentAuthor === authorId) {
      // If clicking the same author, remove the filter
    } else {
      params.set("author", authorId);
    }

    // Preserve other existing filters
    if (currentSearch) {
      params.set("search", currentSearch);
    }

    if (currentTag) {
      params.set("tag", currentTag);
    }

    // Navigate with the updated search parameters
    router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/");
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
          {(currentSearch || currentAuthor || currentTag) && (
            <Button
              variant="link"
              onClick={clearFilters}
              className="px-0 mt-2 h-auto text-sm"
            >
              Clear filters
            </Button>
          )}
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
                  variant={
                    currentAuthor === author._id.toString()
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => handleAuthorFilter(author._id.toString())}
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

      <TagCloud />
    </div>
  );
}
