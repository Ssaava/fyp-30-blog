import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Presentation, FileArchive } from "lucide-react";
import Link from "next/link";

export default function ResourcesPage() {
  const documents = [
    {
      title: "Project Proposal",
      description:
        "Initial project proposal document outlining the problem statement, objectives, and methodology.",
      type: "PDF",
      size: "1.2 MB",
      date: "September 15, 2024",
      link: "#",
    },
    {
      title: "Literature Review",
      description:
        "Comprehensive review of existing research and solutions related to our project domain.",
      type: "PDF",
      size: "2.8 MB",
      date: "October 30, 2024",
      link: "#",
    },
    {
      title: "System Design Document",
      description:
        "Detailed system architecture, database schema, and component design specifications.",
      type: "PDF",
      size: "3.5 MB",
      date: "December 10, 2024",
      link: "#",
    },
    {
      title: "Progress Report",
      description:
        "Mid-project progress report detailing accomplishments, challenges, and next steps.",
      type: "PDF",
      size: "1.8 MB",
      date: "February 5, 2025",
      link: "#",
    },
    {
      title: "Final Report",
      description:
        "Comprehensive final project report with methodology, findings, and conclusions.",
      type: "PDF",
      size: "5.2 MB",
      date: "May 20, 2025",
      link: "#",
    },
  ];

  const presentations = [
    {
      title: "Project Introduction",
      description:
        "Initial presentation introducing the project concept and objectives.",
      type: "PPTX",
      size: "4.5 MB",
      date: "September 20, 2024",
      link: "#",
    },
    {
      title: "Midterm Presentation",
      description: "Progress update and demonstration of initial prototype.",
      type: "PPTX",
      size: "6.2 MB",
      date: "January 15, 2025",
      link: "#",
    },
    {
      title: "Final Presentation",
      description:
        "Comprehensive presentation of the completed project and findings.",
      type: "PPTX",
      size: "8.7 MB",
      date: "May 10, 2025",
      link: "#",
    },
  ];

  const codeResources = [
    {
      title: "Source Code",
      description: "Complete source code of the project with documentation.",
      type: "ZIP",
      size: "12.4 MB",
      date: "May 25, 2025",
      link: "#",
    },
    {
      title: "Database Schema",
      description: "SQL scripts and database schema documentation.",
      type: "ZIP",
      size: "0.8 MB",
      date: "May 25, 2025",
      link: "#",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "PPTX":
        return <Presentation className="h-6 w-6 text-orange-500" />;
      case "ZIP":
        return <FileArchive className="h-6 w-6 text-blue-500" />;
      default:
        return <FileText className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Project Resources
        </h1>

        <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
          Access and download project documentation, presentations, and other
          resources related to our final year project.
        </p>

        <Tabs defaultValue="documents" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="presentations">Presentations</TabsTrigger>
            <TabsTrigger value="code">Code Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((doc, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader className="flex flex-row items-start gap-4">
                    {getIcon(doc.type)}
                    <div>
                      <CardTitle className="text-xl">{doc.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {doc.type} • {doc.size} • {doc.date}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{doc.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={doc.link}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="presentations" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {presentations.map((presentation, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader className="flex flex-row items-start gap-4">
                    {getIcon(presentation.type)}
                    <div>
                      <CardTitle className="text-xl">
                        {presentation.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {presentation.type} • {presentation.size} •{" "}
                        {presentation.date}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">
                      {presentation.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={presentation.link}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="code" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {codeResources.map((resource, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader className="flex flex-row items-start gap-4">
                    {getIcon(resource.type)}
                    <div>
                      <CardTitle className="text-xl">
                        {resource.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {resource.type} • {resource.size} • {resource.date}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">
                      {resource.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={resource.link}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">All Resources</h2>
          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...documents, ...presentations, ...codeResources].map(
                    (resource, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {resource.title}
                        </TableCell>
                        <TableCell>{resource.type}</TableCell>
                        <TableCell>{resource.size}</TableCell>
                        <TableCell>{resource.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={resource.link}>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}
