"use client";

import { Suspense } from "react";
import { AuthorFilter } from "./author-filter";
import { RecentPosts } from "./recent-posts";
import { SearchBox } from "./search-box";
import { TagCloud } from "./tag-cloud";
import { SearchBoxFallback } from "./search-box-fallback";

export function Sidebar() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<SearchBoxFallback />}>
        <SearchBox />
      </Suspense>
      <Suspense fallback={<div>Loading posts...</div>}>
        <RecentPosts />
      </Suspense>
      <Suspense fallback={<div>Loading authors...</div>}>
        <AuthorFilter />
      </Suspense>
      <Suspense fallback={<div>Loading Tags...</div>}>
        <TagCloud />
      </Suspense>
    </div>
  );
}
