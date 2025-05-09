import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SiteLayout } from "@/components/site-layout";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "KISEJJERE RASHID",
      role: "Project Lead",
      bio: "Computer Science student specializing in software development with experience in web technologies and project management.",
      image: "/rashid.jpeg",
      links: {
        github: "https://github.com/rashidkisejjere0784",
        linkedin: "https://www.linkedin.com/in/rashid-kisejjere-720158217/",
        email: "mailto:rashidkisejjere0784@gmail.com",
      },
    },
    {
      name: "SSENTEZA EMMANUEL",
      role: "Backend Developer",
      bio: "Software Engineering student with strong skills in database design, API development, and server-side programming.",
      image: "/emma.png",
      links: {
        github: "https://github.com/Ssaava",
        linkedin: "https://www.linkedin.com/in/ssava-ema/",
        email: "mailto:ssavaemma4@gmail.com",
      },
    },
    {
      name: "SSEMAGANDA TREVOUR",
      role: "Frontend Developer",
      bio: "Computer Science student focusing on user interface design and frontend development with experience in React and modern CSS frameworks.",
      image: "/trevor.jpeg",
      links: {
        github: "https://github.com/Percy256",
        linkedin: "https://www.linkedin.com/in/trevour-ssemaganda-346432227/",
        email: "mailto:semagandatrevour@gmail.com",
      },
    },
    {
      name: "GUM PRISCILLA",
      role: "Database Specialist",
      bio: "Software Engineering student with expertise in database management, data modeling, and query optimization.",
      image: "/gum.jpeg",
      links: {
        github: "https://github.com/Priscillasky",
        linkedin: "https://www.linkedin.com/in/gum-priscilla/",
        email: "mailto:member4@example.com",
      },
    },
  ];

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Team</h1>

        <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
          Meet the talented individuals behind this final year project. Our
          diverse team brings together complementary skills and perspectives to
          create an innovative solution.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="flex flex-col h-full">
              <div className="relative w-full pt-[100%]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                <p className="text-primary font-medium">{member.role}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{member.bio}</p>
              </CardContent>
              <CardFooter className="flex justify-center space-x-4 pt-2">
                <Link
                  href={member.links.github}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href={member.links.linkedin}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href={member.links.email}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail size={20} />
                  <span className="sr-only">Email</span>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Project Supervision</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This project is supervised by Dr Alex Mwotil, Lecturer in the
            Department of Networks at Makerere University.
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
