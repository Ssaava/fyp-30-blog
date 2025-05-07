"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Final Year Group Blog
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
