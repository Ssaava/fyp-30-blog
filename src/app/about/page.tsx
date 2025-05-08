import { SiteLayout } from "@/components/site-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function AboutPage() {
  const milestones = [
    {
      date: "September 2024",
      title: "Project Initiation",
      description: "Project proposal submission and approval",
    },
    {
      date: "October 2024",
      title: "Research Phase",
      description: "Literature review and requirement gathering",
    },
    {
      date: "December 2024",
      title: "Design Phase",
      description: "System architecture and UI/UX design",
    },
    {
      date: "February 2025",
      title: "Development Phase",
      description: "Implementation of core features",
    },
    {
      date: "April 2025",
      title: "Testing Phase",
      description: "Quality assurance and user acceptance testing",
    },
    {
      date: "May 2025",
      title: "Project Completion",
      description: "Final presentation and submission",
    },
  ];

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          About Our Project
        </h1>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Project Background</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Our final year project addresses Water Quality by developing an
              innovative solution that combines Machine Learning and IoT. This
              project emerged from our observation of Poor Water Quality and the
              need for Improved Water Quality Sources.
            </p>
            <p>
              Throughout our academic journey, we&apos;ve developed the skills
              and knowledge necessary to tackle this challenge. This project
              represents the culmination of our undergraduate studies and
              demonstrates our ability to apply theoretical concepts to
              real-world problems.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  To develop a comprehensive solution that effectively addresses
                  Water Quality while demonstrating technical excellence and
                  innovation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  To create a scalable and sustainable system that can be
                  extended beyond the academic project to provide real-world
                  value.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Implement a fully functional prototype</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Validate the solution through user testing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Document the development process</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Present findings and results effectively</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Project Timeline</h2>
          <div className="relative border-l border-muted-foreground/30 pl-8 ml-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="mb-12 relative">
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-10 top-1"></div>
                <h3 className="text-xl font-bold">{milestone.date}</h3>
                <h4 className="text-lg font-semibold text-primary">
                  {milestone.title}
                </h4>
                <p className="text-muted-foreground">{milestone.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
