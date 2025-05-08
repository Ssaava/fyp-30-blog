import { SiteLayout } from "@/components/site-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AcknowledgmentsPage() {
  const supervisors = [
    {
      name: "Dr. Alex Mwotil",
      title: "Project Supervisor",
      department: "Department of Computer Networks",
      bio: "Dr. Alex Mwotil specializes in software engineering and has provided invaluable guidance throughout the development of this project.",
      image: "/placeholder.svg?height=300&width=300",
    },
    // {
    //   name: "Prof. John Doe",
    //   title: "Technical Advisor",
    //   department: "Department of Information Technology",
    //   bio: "Prof. Doe's expertise in database systems and web technologies has been crucial to the technical implementation of our project.",
    //   image: "/placeholder.svg?height=300&width=300",
    // },
  ];

  const institutions = [
    {
      name: "Makerere University",
      description:
        "For providing the resources, facilities, and academic environment necessary for this project.",
      logo: "/placeholder.svg?height=200&width=200",
    },
    // {
    //   name: "Department of Computer Science",
    //   description:
    //     "For the technical support, equipment, and academic guidance throughout the project.",
    //   logo: "/placeholder.svg?height=200&width=200",
    // },
  ];

  const others = [
    // {
    //   name: "Industry Partner Name",
    //   description:
    //     "For providing access to industry data and expert consultation.",
    //   logo: "/placeholder.svg?height=200&width=200",
    // },
    {
      name: "Open Source Community",
      description:
        "For the various open-source tools and libraries that made this project possible.",
      logo: "/placeholder.svg?height=200&width=200",
    },
  ];

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Acknowledgments</h1>

        <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
          We would like to express our sincere gratitude to all those who have
          contributed to the success of this project.
        </p>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Supervisors & Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supervisors.map((supervisor, index) => (
              <Card
                key={index}
                className="flex flex-col md:flex-row overflow-hidden"
              >
                <div className="relative w-full md:w-1/3 pt-[100%] md:pt-0">
                  <Image
                    src={supervisor.image || "/placeholder.svg"}
                    alt={supervisor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <CardTitle className="text-xl mb-1">
                    {supervisor.name}
                  </CardTitle>
                  <p className="text-primary font-medium">{supervisor.title}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {supervisor.department}
                  </p>
                  <p className="text-muted-foreground">{supervisor.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Institutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {institutions.map((institution, index) => (
              <Card key={index} className="flex flex-col items-center p-6">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={institution.logo || "/placeholder.svg"}
                    alt={institution.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <CardHeader className="text-center p-0 mb-2">
                  <CardTitle>{institution.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-0">
                  <p className="text-muted-foreground">
                    {institution.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">
            Additional Acknowledgments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {others.map((other, index) => (
              <Card key={index} className="flex flex-col items-center p-6">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={other.logo || "/placeholder.svg"}
                    alt={other.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <CardHeader className="text-center p-0 mb-2">
                  <CardTitle>{other.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-0">
                  <p className="text-muted-foreground">{other.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Special Thanks</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We would also like to thank our families and friends for their
            unwavering support throughout this project. Your encouragement and
            patience have been invaluable.
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
