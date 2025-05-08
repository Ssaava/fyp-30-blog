"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Post {
  _id: string;
  title: string;
}

export function RecentPosts() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch("/api/posts?limit=5");
        const data = await res.json();
        setRecentPosts(data.slice(0, 5));
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
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
  );
}
