"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { DashboardHeader } from "@/components/dashboard-header";
import { UserPostList } from "@/components/user-post-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminUserList } from "@/components/admin-user-list";

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />

      <div className="mt-8">
        <Tabs
          defaultValue="posts"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="posts">My Posts</TabsTrigger>
            {user.role === "admin" && (
              <TabsTrigger value="users">Manage Users</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Posts</h2>
              <Button onClick={() => router.push("/dashboard/posts/new")}>
                Create New Post
              </Button>
            </div>
            <UserPostList />
          </TabsContent>
          {user.role === "admin" && (
            <TabsContent value="users" className="mt-6">
              <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
              <AdminUserList />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
