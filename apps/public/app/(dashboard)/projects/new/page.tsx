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
      title: "Basics",
      description: "Project fundamentals",
      content:
        "Define your project's core information including title, category, team, location and timeline. These details help potential supporters quickly understand your project.",
      tips: [
        "Choose a clear, concise project title (max 60 characters)",
        "Write a descriptive subtitle (max 135 characters)",
        "Select appropriate project categories and types",
        "Set realistic project timeline",
      ],
    },
    {
      id: "funding",
      icon: <Coins className="h-6 w-6" />,
      title: "Funding",
      description: "Financial setup",
      content:
        "Configure your project's funding details including collection type, amounts, and rates. A well-planned funding structure is crucial for project success.",
      tips: [
        "Set appropriate nominal and fundable amounts",
        "Configure collection type and fund rates",
        "Consider whether to allow over-funding",
        "Define minimum contribution amount",
      ],
    },
    {
      id: "story",
      icon: <BookOpen className="h-6 w-6" />,
      title: "Story",
      description: "Project narrative",
      content:
        "Tell your project's story using rich content editor. Include risks and challenges, and be transparent about AI usage if applicable.",
      tips: [
        "Write a compelling project narrative",
        "Be transparent about risks and challenges",
        "Declare any AI involvement in your project",
        "Add FAQs to address common questions",
      ],
    },
    {
      id: "people",
      icon: <Users className="h-6 w-6" />,
      title: "People",
      description: "Project team",
      content: "Introduce yourself and your team. A complete profile helps build trust with potential supporters.",
      tips: [
        "Complete your personal profile",
        "Create a custom profile URL",
        "Add project collaborators",
        "Verify your contact information",
      ],
    },
    {
      id: "blocks",
      icon: <Layout className="h-6 w-6" />,
      title: "Blocks",
      description: "Content blocks",
      content:
        "Use content blocks to create a rich, visual presentation of your project. Add images, videos, and other media to bring your story to life.",
      tips: [
        "Include high-quality project images",
        "Add videos to demonstrate your project",
        "Organize content in logical sections",
        "Use media to explain complex concepts",
      ],
    },
    {
      id: "payment",
      icon: <CreditCard className="h-6 w-6" />,
      title: "Payment",
      description: "Payment setup",
      content:
        "Set up your payment details to receive funds from supporters. Configure payment options and review transaction fees.",
      tips: [
        "Set up your payment account",
        "Review payment processing fees",
        "Configure payout preferences",
        "Verify banking information",
      ],
    },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold">Start Creating Your Project</h1>
        <p className="text-muted-foreground">
          We'll guide you through creating a successful project. You can find important points and tips at each step.
        </p>
      </div>

      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="from-primary/0 via-primary/50 to-primary/0 absolute bottom-0 left-8 top-0 z-0 w-0.5 bg-gradient-to-b" />

        {steps.map((step, index) => (
          <div key={step.id} className="relative mb-8 last:mb-0">
            {/* Timeline Dot */}
            <div
              className={`border-background absolute left-6 z-10 h-5 w-5 rounded-full border-4 transition-all duration-300 ease-in-out
                ${activeStep === step.id ? "bg-primary scale-125" : "bg-muted"}`}
              style={{top: "24px"}}
            />

            <Card
              className="ml-16 transition-all duration-300 ease-in-out hover:shadow-lg"
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}>
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
                      <li key={i} className="text-muted-foreground flex items-center gap-2 text-sm">
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

        <div className="ml-16 flex pt-4">
          <Link href="/projects/new/basics">
            <Button className="gap-2" size="lg">
              Start Creating Project
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
