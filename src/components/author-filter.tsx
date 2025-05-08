"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Author {
  _id: string;
  name: string;
}

export function AuthorFilter() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentAuthor = searchParams.get("author");
  const currentSearch = searchParams.get("search");
  const currentTag = searchParams.get("tag");

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await fetch("/api/users/public");
        const data = await res.json();
        setAuthors(data);
      } catch (err) {
        console.error("Error fetching authors", err);
      }
    };

    fetchAuthors();
  }, []);

  const handleAuthorFilter = (authorId: string) => {
    const params = new URLSearchParams();

    if (currentAuthor === authorId) {
      // toggle off
    } else {
      params.set("author", authorId);
    }

    if (currentSearch) params.set("search", currentSearch);
    if (currentTag) params.set("tag", currentTag);

    router.push(`/?${params.toString()}`);
  };

  return (
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
  );
}
