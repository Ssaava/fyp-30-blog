"use client";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Code, Database, Lightbulb, Server } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Author {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  published: boolean;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const features = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Innovative Solution",
      description:
        "Addressing real-world problems with cutting-edge technology",
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Modern Tech Stack",
      description: "Built with Next.js, MongoDB, and other modern technologies",
    },
    {
      icon: <Database className="h-8 w-8 text-primary" />,
      title: "Data-Driven",
      description: "Leveraging data analysis for informed decision making",
    },
    {
      icon: <Server className="h-8 w-8 text-primary" />,
      title: "Scalable Architecture",
      description: "Designed to grow and adapt to changing requirements",
    },
  ];

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch("/api/posts?limit=3");

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setRecentPosts(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <SiteLayout>
      <section className="bg-gradient-to-b from-muted/50 to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Final Year Project Blog
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Documenting our journey in developing an innovative solution for
            Affordable Water Quality Monitoring
          </p>
          <Button size="lg" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Recent Blog Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post._id} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>
                    {new Date(post.createdAt).toLocaleDateString()} •{" "}
                    {post.author.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="line-clamp-3 text-muted-foreground">
                    {post.content.substring(0, 150)}...
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`/posts/${post._id}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Project Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-lg shadow-sm border"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Explore Our Project?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover our methodology, progress, and findings through our
            detailed documentation and blog posts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/project">Project Details</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blog">Read Our Blog</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
