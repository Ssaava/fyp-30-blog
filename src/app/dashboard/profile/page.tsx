/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import rehypeSanitize from "rehype-sanitize";

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const [about, setAbout] = useState<string | undefined>("Nothing to preview");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (user) {
      setAbout(user.about || "Nothing to preview");
      setAvatarUrl(user.avatarUrl || "/placeholder.svg?height=200&width=200");
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          about,
          avatarUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      setMessage({ type: "success", text: "Profile updated successfully" });

      // Update the user object in auth context
      if (user) {
        user.about = about;
        user.avatarUrl = avatarUrl;
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "An error occurred while updating profile",
      });
    } finally {
      setIsSaving(false);
    }
  };

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
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              Update your profile information visible to other users
            </CardDescription>
          </CardHeader>
          <CardContent>
            {message.text && (
              <Alert
                variant={message.type === "error" ? "destructive" : "default"}
                className="mb-4"
              >
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={avatarUrl || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="avatarUrl">Avatar URL</Label>
                  <Input
                    id="avatarUrl"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter a URL for your avatar image or leave as default
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="about">About Me</Label>

                <div data-color-mode={`${theme}`}>
                  <div className="mb-1 text-right text-xs text-muted-foreground">
                    Markdown supported
                  </div>
                  <div className="wmde-markdown-var"> </div>
                  <MDEditor
                    value={about}
                    onChange={setAbout}
                    height={"100%"}
                    previewOptions={{
                      rehypePlugins: [[rehypeSanitize]],
                    }}
                    visibleDragbar={false}
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  This information will be displayed publicly on your profile
                  page
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Cancel
            </Button>
            <div className="space-x-2">
              <Button
                onClick={() => router.push(`/authors/${user._id}`)}
                variant="outline"
              >
                View Public Profile
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
