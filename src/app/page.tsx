import { Header } from "@/components/header";
import { PostList } from "@/components/post-list";
import { Sidebar } from "@/components/side-bar/sidebar";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
            <PostList />
          </div>
          <div className="md:w-1/4">
            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
}
