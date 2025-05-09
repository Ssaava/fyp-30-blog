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
                  In many rural and urban communities, access to safe drinking
                  water remains a major public health challenge. Traditional
                  water testing methods are often expensive, slow, and require
                  laboratory infrastructure and skilled personnel. This delay in
                  detecting water contamination leads to health issues such as
                  waterborne diseases, especially in low-resource settings.
                  Furthermore, there is limited use of real-time data and
                  predictive insights in existing monitoring systems.
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    To develop a real-time water quality monitoring system:
                  </li>
                  <li>To implement an affordable and scalable solution:</li>
                  <li>
                    To integrate AI and machine learning for predictive
                    analysis:
                  </li>
                  <li>To provide a user-friendly web interface:</li>
                  <li>To assess the accuracy and efficiency of the system:</li>
                  <li>To raise awareness and promote safe water practices:</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Proposed Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We propose an affordable, real-time water quality monitoring
                  system that integrates biosensors with a web-based dashboard
                  powered by AI and machine learning. The biosensors collect
                  physicochemical water parameters such as pH, turbidity, and
                  temperature. This data is transmitted to a backend server
                  built with Flask, stored in SQLiteDB, and analyzed using ML
                  models to detect anomalies and predict contamination risks.
                  The system is accessible via a responsive web interface,
                  enabling communities, researchers, and policymakers to make
                  data-driven decisions about water safety.
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
