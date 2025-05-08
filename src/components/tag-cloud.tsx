/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Tag {
  name: string;
  count: number;
}

export function TagCloud() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/posts");
        const posts = await response.json();

        // Extract and count tags
        const tagCounts: Record<string, number> = {};
        posts.forEach((post: any) => {
          post.tags.forEach((tag: string) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        });

        // Convert to array and sort by count
        const tagArray = Object.entries(tagCounts).map(([name, count]) => ({
          name,
          count,
        }));
        tagArray.sort((a, b) => b.count - a.count);

        setTags(tagArray);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleTagClick = (tag: string) => {
    // Build the query parameters
    const params = new URLSearchParams(searchParams.toString());

    // Toggle tag filter
    if (currentTag === tag) {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }

    // Navigate with the updated search parameters
    router.push(`/?${params.toString()}`);
  };

  if (isLoading || tags.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Popular Tags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag.name}
              variant={currentTag === tag.name ? "default" : "outline"}
              className="cursor-pointer hover:bg-accent"
              onClick={() => handleTagClick(tag.name)}
            >
              {tag.name} ({tag.count})
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
