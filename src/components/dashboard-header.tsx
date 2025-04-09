"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { ThemeToggle } from "@/components/theme-toggle";

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}</p>
      </div>
      <div className="flex gap-2">
        <ThemeToggle />
        <Button variant="outline" onClick={() => router.push("/")}>
          View Blog
        </Button>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
