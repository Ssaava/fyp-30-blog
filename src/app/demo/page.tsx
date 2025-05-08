"use client";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DemoPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const screenshots = [
    {
      title: "Home Page",
      description:
        "The landing page of our application showcasing key features and recent blog posts.",
      image: "/placeholder.svg?height=720&width=1280",
    },
    {
      title: "Dashboard",
      description:
        "User dashboard with analytics and content management features.",
      image: "/placeholder.svg?height=720&width=1280",
    },
    {
      title: "Blog Editor",
      description:
        "Rich text editor for creating and editing blog posts with markdown support.",
      image: "/placeholder.svg?height=720&width=1280",
    },
    {
      title: "User Profile",
      description:
        "User profile page with customization options and activity history.",
      image: "/placeholder.svg?height=720&width=1280",
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Project Demo</h1>

        <Tabs defaultValue="video" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="video">Video Walkthrough</TabsTrigger>
            <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center p-8 text-center">
                  <Play className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Video Demo Coming Soon
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We&apos;re currently working on a comprehensive video
                    walkthrough of our project.
                  </p>
                  <Button variant="outline" asChild>
                    <Link
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Our YouTube Channel
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">
                    About This Demo
                  </h3>
                  <p className="text-muted-foreground">
                    Our video walkthrough demonstrates the key features of our
                    project, including:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                    <li>User registration and authentication</li>
                    <li>Blog post creation and management</li>
                    <li>User profile customization</li>
                    <li>Search and filtering functionality</li>
                    <li>Responsive design across devices</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="screenshots" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="relative">
                  <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
                    <Image
                      src={screenshots[activeSlide].image || "/placeholder.svg"}
                      alt={screenshots[activeSlide].title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={prevSlide}
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={nextSlide}
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold">
                    {screenshots[activeSlide].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {screenshots[activeSlide].description}
                  </p>
                </div>

                <div className="flex justify-center mt-4">
                  {screenshots.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full mx-1 ${
                        index === activeSlide
                          ? "bg-primary"
                          : "bg-muted-foreground/30"
                      }`}
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Go to screenshot ${index + 1}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Try It Yourself</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Want to experience our project firsthand? Check out our live demo or
            explore the source code on GitHub.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link
                href="https://fyp-web-based-system.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href="https://github.com/Ssaava/FYP-web-based-system"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
