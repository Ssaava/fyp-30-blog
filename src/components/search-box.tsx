// components/SearchBox.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentAuthor = searchParams.get("author");
  const currentSearch = searchParams.get("search");
  const currentTag = searchParams.get("tag");

  useEffect(() => {
    if (currentSearch) {
      setSearchTerm(currentSearch);
    }
  }, [currentSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }

    if (currentAuthor) {
      params.set("author", currentAuthor);
    }

    if (currentTag) {
      params.set("tag", currentTag);
    }

    router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/");
  };

  return (
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
  );
}
