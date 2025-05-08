/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { DashboardHeader } from "@/components/dashboard-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarkdownRenderer } from "@/components/markdown-renderer";
// import MarkdownRenderer from "@/components/markdown-renderer"

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const [about, setAbout] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeTab, setActiveTab] = useState<string>("edit");
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (user) {
      setAbout(user.about || "");
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
                <div className="border rounded-md">
                  <Tabs
                    defaultValue="edit"
                    value={activeTab}
                    onValueChange={setActiveTab}
                  >
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                      <TabsList>
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <div className="text-xs text-muted-foreground">
                        Markdown supported
                      </div>
                    </div>
                    <TabsContent value="edit" className="p-0">
                      <Textarea
                        id="about"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Write something about yourself..."
                        className="min-h-[200px] border-0 focus-visible:ring-0 rounded-none resize-none"
                      />
                    </TabsContent>
                    <TabsContent value="preview" className="p-4 min-h-[200px]">
                      {about ? (
                        <div className="prose dark:prose-invert max-w-none">
                          <MarkdownRenderer content={about} />
                        </div>
                      ) : (
                        <div className="text-muted-foreground italic">
                          Nothing to preview
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
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
