// components/SearchBoxFallback.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SearchBoxFallback() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Search</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" />
        </div>
        <Skeleton className="h-4 mt-4 w-24" />
      </CardContent>
    </Card>
  );
}
