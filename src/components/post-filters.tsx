"use client";

import { useSearchParams } from "next/navigation";

interface PostFiltersProps {
  onFiltersChange: (filters: {
    authorId: string | null;
    searchTerm: string | null;
    tag: string | null;
  }) => void;
}

export function PostFilters({ onFiltersChange }: PostFiltersProps) {
  const searchParams = useSearchParams();

  const authorId = searchParams.get("author");
  const searchTerm = searchParams.get("search");
  const tag = searchParams.get("tag");

  // Notify parent about filters
  onFiltersChange({ authorId, searchTerm, tag });

  return null; // This component only exists to trigger logic
}
