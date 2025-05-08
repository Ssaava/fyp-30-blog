"use client";

import { SiteLayout } from "@/components/site-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FAQsPage() {
  const faqs = [
    {
      question: "What is the purpose of this project?",
      answer:
        "This project aims to solve the problem of water quality in Uganda. We're addressing Water Quality by developing an Affordable Water Quality Monitoring System.",
    },
    {
      question: "What technologies are used in this project?",
      answer:
        "We're using a modern tech stack including Next.js for the frontend and backend, MongoDB for the database, and various other technologies like [list other relevant technologies].",
    },
    {
      question: "How can I access the demo or prototype?",
      answer:
        "You can access our interactive demo on the Demo page of this website. The demo showcases the key features and functionality of our project.",
    },
    {
      question: "Is the source code available?",
      answer:
        "Yes, the source code for this project is available on our GitHub repository. You can find the link in the Resources section or in the footer of this website.",
    },
    {
      question: "Who are the team members?",
      answer:
        "Our team consists of 4 final year students from Makerere University Bachelor of Science in Software Engineering Class. You can learn more about each team member on our Team page.",
    },
    {
      question: "How was the project developed?",
      answer:
        "The project was developed following an agile methodology. We started with extensive research, followed by design, implementation, and testing phases. The development process is documented in our blog posts.",
    },
    {
      question: "What are the key features of your solution?",
      answer:
        "The key features include recording different sensor values. These features work together to provide water parameters that are used to determine the portability of Water.",
    },
    {
      question: "How can I provide feedback or suggestions?",
      answer:
        "We welcome feedback and suggestions! You can reach out to us through the contact form on our Contact page or by emailing us directly at ssavaemma4@gmail.com.",
    },
  ];

  const categories = [
    {
      title: "Project Overview",
      description: "General information about the project",
      faqs: [0, 4, 5],
    },
    {
      title: "Technical Details",
      description: "Information about technologies and implementation",
      faqs: [1, 6],
    },
    {
      title: "Access & Resources",
      description: "How to access demos and resources",
      faqs: [2, 3, 7],
    },
  ];

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h1>

        <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
          Find answers to common questions about our final year project. If you
          don&apos;t see your question here, feel free to contact us.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {category.faqs.map((faqIndex) => (
                    <li key={faqIndex}>{faqs[faqIndex].question}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SiteLayout>
  );
}
