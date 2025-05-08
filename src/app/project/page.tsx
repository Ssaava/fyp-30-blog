import { SiteLayout } from "@/components/site-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Database,
  FileCode,
  GitBranch,
  Globe,
  Server,
  Smartphone,
} from "lucide-react";

export default function ProjectPage() {
  const technologies = [
    {
      icon: <FileCode className="h-8 w-8 text-primary" />,
      name: "Next.js",
      description: "React framework for building full-stack web applications",
    },
    {
      icon: <Database className="h-8 w-8 text-primary" />,
      name: "SQLiteDB",
      description: "SQL database for storing application data",
    },
    {
      icon: <Server className="h-8 w-8 text-primary" />,
      name: "Flask",
      description: "Python Framework for server-side logic",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      name: "Responsive Design",
      description: "Mobile-first approach using Tailwind CSS",
    },
    {
      icon: <GitBranch className="h-8 w-8 text-primary" />,
      name: "Git & GitHub",
      description: "Version control and collaboration",
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      name: "Vercel",
      description: "Deployment and hosting platform",
    },
  ];

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Project Details</h1>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Problem Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Here we Describe the problem our project aims to solve. What
                  are the current challenges or gaps in existing solutions?
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>To develop a system that Monitors Water Quality</li>
                  <li>
                    To implement Affordable Water Quality Monitoring System
                  </li>
                  <li>
                    To evaluate the effectiveness of IoT and Machine Learning in
                    Monitoring Water Quality
                  </li>
                  <li>To document and share our findings through Research</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Proposed Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Here we Describe our proposed solution. How does it address
                  the problem? What makes it innovative or effective?
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4">
                  {tech.icon}
                  <CardTitle className="text-xl">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">
            Project Diagrams & Visuals
          </h2>
          <Tabs defaultValue="architecture">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="architecture">
                System Architecture
              </TabsTrigger>
              <TabsTrigger value="flowchart">Process Flowchart</TabsTrigger>
              <TabsTrigger value="wireframes">UI Wireframes</TabsTrigger>
            </TabsList>
            <TabsContent
              value="architecture"
              className="p-4 border rounded-md mt-4"
            >
              <div className="aspect-video relative bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">
                  System Architecture Diagram
                </p>
                {/* Replace with actual diagram */}
                {/* <Image src="/images/architecture.png" alt="System Architecture" fill className="object-contain" /> */}
              </div>
              <p className="mt-4 text-muted-foreground">
                [Description of the system architecture diagram. Explain the
                components and their interactions.]
              </p>
            </TabsContent>
            <TabsContent
              value="flowchart"
              className="p-4 border rounded-md mt-4"
            >
              <div className="aspect-video relative bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Process Flowchart</p>
                {/* Replace with actual flowchart */}
                {/* <Image src="/images/flowchart.png" alt="Process Flowchart" fill className="object-contain" /> */}
              </div>
              <p className="mt-4 text-muted-foreground">
                [Description of the process flowchart. Explain the steps and
                decision points.]
              </p>
            </TabsContent>
            <TabsContent
              value="wireframes"
              className="p-4 border rounded-md mt-4"
            >
              <div className="aspect-video relative bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">UI Wireframes</p>
                {/* Replace with actual wireframes */}
                {/* <Image src="/images/wireframes.png" alt="UI Wireframes" fill className="object-contain" /> */}
              </div>
              <p className="mt-4 text-muted-foreground">
                [Description of the UI wireframes. Explain the key screens and
                user interactions.]
              </p>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </SiteLayout>
  );
}
