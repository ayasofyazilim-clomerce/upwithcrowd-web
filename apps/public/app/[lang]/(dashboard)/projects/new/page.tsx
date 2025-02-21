"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ChevronRight, Rocket, Coins, BookOpen, Users, Layout, CreditCard} from "lucide-react";
import Link from "next/link";
import {useState} from "react";

export default function ProjectOnboarding() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const steps = [
    {
      id: "basics",
      icon: <Rocket className="h-6 w-6" />,
      title: "Basic Information",
      description: "Project fundamentals",
      content: "Define your project's core information including title, category, team, location and timeline.",
      tips: [
        "Choose a clear, concise project title",
        "Select appropriate project categories",
        "Set project location and duration",
        "Define your project scope",
      ],
    },
    {
      id: "about",
      icon: <BookOpen className="h-6 w-6" />,
      title: "About Us",
      description: "Team and background",
      content: "Tell your story and introduce your team to potential supporters.",
      tips: ["Present your team members", "Share your experience", "Highlight achievements", "Explain your motivation"],
    },
    {
      id: "funding",
      icon: <Coins className="h-6 w-6" />,
      title: "Funding Details",
      description: "Financial setup",
      content: "Configure your funding goals, timeline, and requirements for your project.",
      tips: [
        "Set your funding target",
        "Define funding duration",
        "Establish minimum contribution",
        "Plan reward tiers",
      ],
    },

    {
      id: "documents",
      icon: <Layout className="h-6 w-6" />,
      title: "Documents",
      description: "Project documentation",
      content: "Upload necessary documents to support your project proposal.",
      tips: [
        "Include business plan",
        "Add technical documentation",
        "Provide legal documents",
        "Share project timeline",
      ],
    },
    {
      id: "images",
      icon: <Layout className="h-6 w-6" />,
      title: "Images",
      description: "Visual content",
      content: "Add compelling visuals to showcase your project.",
      tips: ["Upload high-quality images", "Include project mockups", "Add team photos", "Show project progress"],
    },
    {
      id: "faq",
      icon: <Users className="h-6 w-6" />,
      title: "FAQ",
      description: "Common questions",
      content: "Address potential questions from supporters.",
      tips: ["Answer common questions", "Explain project risks", "Address concerns", "Provide clear information"],
    },
    {
      id: "terms",
      icon: <CreditCard className="h-6 w-6" />,
      title: "Terms & Conditions",
      description: "Legal requirements",
      content: "Review and accept project terms and conditions.",
      tips: ["Read terms carefully", "Understand obligations", "Accept conditions", "Review legal requirements"],
    },
    {
      id: "finish",
      icon: <Rocket className="h-6 w-6" />,
      title: "Finish Project",
      description: "Final submission",
      content: "Review and submit your project for approval.",
      tips: ["Review all sections", "Check requirements", "Verify information", "Submit for review"],
    },
  ];

  return (
    <div className="container mx-auto flex h-auto">
      <section className="mx-auto w-full max-w-7xl p-4 md:p-8">
        <div className="mb-8 max-w-2xl">
          {/* <Link href="/projects/new/basics/?type=project">Project</Link>
          <Link href="/projects/new/basics/?type=girisim">Girişim</Link> */}
          <h1 className="mb-2 text-3xl font-bold">Start Creating Your Project</h1>
          <p className="text-muted-foreground">
            We&apos;ll guide you through creating a successful project. You can find important points and tips at each
            step.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="from-primary/0 via-primary/50 to-primary/0 absolute bottom-0 left-8 top-0 z-0 w-0.5 bg-gradient-to-b" />

          {steps.map((step, index) => (
            <div className="relative mb-8 last:mb-0" key={step.id}>
              {/* Timeline Dot */}
              <div
                className={`border-background absolute left-6 z-10 h-5 w-5 rounded-full border-4 transition-all duration-300 ease-in-out
                ${activeStep === step.id ? "bg-primary scale-125" : "bg-muted"}`}
                style={{top: "24px"}}
              />

              <Card
                className="ml-16 transition-all duration-300 ease-in-out hover:shadow-lg"
                onMouseEnter={() => {
                  setActiveStep(step.id);
                }}
                onMouseLeave={() => {
                  setActiveStep(null);
                }}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-full p-2 ${activeStep === step.id ? "bg-primary text-primary-foreground" : "bg-muted"} transition-colors duration-300`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{step.title}</CardTitle>
                        <span className="text-muted-foreground text-sm">Step {index + 1}</span>
                      </div>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{step.content}</p>
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="mb-2 font-medium">Important Tips:</h4>
                    <ul className="space-y-2">
                      {step.tips.map((tip, i) => (
                        <li className="text-muted-foreground flex items-center gap-2 text-sm" key={i}>
                          <div className="bg-primary h-1 w-1 rounded-full" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}

          <div className="ml-16 flex gap-4 pt-4">
            <Link href="/projects/new/basics/?type=project">
              <Button className="bg-primary hover:bg-primary/90 gap-2" size="lg">
                Start Creating Project
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button className="gap-2" disabled size="lg" variant="outline">
              Start Creating Enterprise
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
