import { PostList } from "@/components/post-list";
import { Sidebar } from "@/components/sidebar";
import { SiteLayout } from "@/components/site-layout";
import { Suspense } from "react";

export default function BlogPage() {
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
            <Suspense fallback={<div>Loading Posts...</div>}>
              <PostList />
            </Suspense>
          </div>
          <div className="max-w-[20rem]">
            <Suspense fallback={<div>Filtering Posts</div>}>
              <Sidebar />
            </Suspense>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
