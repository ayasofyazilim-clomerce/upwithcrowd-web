"use client";

import {
  UpwithCrowd_Projects_ProjectsFundingResponseDto,
  UpwithCrowd_Payment_PaymentStatus,
  UpwithCrowd_Projects_ProjectsResponseDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";
import ProjectCreator from "../_components/project-creator";
import SupportCard from "../_components/support-card";
import ProjectSummary from "../_components/project-summary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { postApiPaymentTransaction } from "@/actions/upwithcrowd/payment/post-action";
import { UpwithCrowd_Payment_SavePaymentTransactionDto } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useMember } from "@/app/providers/member";

export default function ProjectDetails({
  funding,
  basics,
}: {
  basics: UpwithCrowd_Projects_ProjectsResponseDto;
  funding: UpwithCrowd_Projects_ProjectsFundingResponseDto;
}) {
  const { id: projectId } = useParams<{ id: string }>();
  const [currentImageIndex] = useState(0);
  const [customAmount, setCustomAmount] = useState<string>("");
  const donationOptions = [10, 25, 50, 100, 250, 500];
  const [selectedDonation, setSelectedDonation] = useState(donationOptions[0]);
  const { currentMember } = useMember();
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
    if (value) {
      setSelectedDonation(Number(value));
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleDonation = async (amount: number) => {
    try {
      setIsLoading(true);
      const paymentResponse = await postApiPaymentTransaction({
        requestBody: {
          projectID: projectId,
          memberID: currentMember?.id,
          amount: amount,
          paymentType: "CreditCard",
          type: "Increase",
          paymentStatus: "Pending" as UpwithCrowd_Payment_PaymentStatus,
        } as UpwithCrowd_Payment_SavePaymentTransactionDto,
      });

      if (paymentResponse.type === "success") {
        toast.success("Thank you for your support!");
      } else {
        toast.error(paymentResponse.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("An error occurred while processing your payment");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fundedPercentage =
    ((funding.fundableAmount ?? 0) / (funding.fundNominalAmount ?? 1)) * 100;

  const blogPost = `
    <article class="prose lg:prose-xl mx-auto">
      <header class="mb-8">
        <h1 id="evolution-of-our-vision" class="text-3xl font-extrabold leading-tight mb-4">The Evolution of Our Vision</h1>
        <p class="text-lg text-gray-600">January 15, 2025 · 7 min read</p>
      </header>

      <section class="mb-12">
        <h2 id="introduction" class="text-3xl font-semibold mb-3">Introduction</h2>
        <p class="text-lg leading-relaxed text-gray-700">
          Embarking on a journey to create something meaningful is never an easy task. In this article, we delve into the story behind our project — its inception, challenges, and aspirations for the future.
        </p>
      </section>

      <figure class="mb-10 flex items-center justify-center flex-col">
        <img class="w-2/3 rounded-lg shadow-md" src="https://placehold.co/600x200" alt="Team Collaboration">
        <figcaption class="text-sm text-center mt-2 text-gray-500">Collaboration is at the heart of our progress.</figcaption>
      </figure>

      <section class="mb-12">
        <h2 id="our-inspiration" class="text-3xl font-semibold mb-3">Our Inspiration</h2>
        <p class="text-lg leading-relaxed text-gray-700 mb-4">
          The idea for our project was born out of a simple realization: technology is evolving faster than ever, yet its potential remains untapped in many areas. We aimed to bridge this gap with an innovative solution.
        </p>
        <blockquote class="italic border-l-4 border-blue-500 pl-4 text-gray-600 mb-6">
          "Innovation distinguishes between a leader and a follower." – Steve Jobs
        </blockquote>
      </section>

      <section class="mb-12">
        <h2 id="development-phase" class="text-3xl font-semibold mb-3">The Development Phase</h2>
        <p class="text-lg leading-relaxed text-gray-700">
          The development journey has been an enlightening experience for our team. From brainstorming sessions to rigorous testing, each step taught us something new. We faced challenges, celebrated small victories, and kept moving forward.
        </p>
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li>Collaborative design workshops to refine the user interface.</li>
          <li>Implementing cutting-edge technologies for scalability.</li>
          <li>Extensive testing to ensure a seamless user experience.</li>
        </ul>
      </section>

      <figure class="mb-10 flex items-center justify-center flex-col">
        <img class="w-2/3 rounded-lg shadow-md" src="https://placehold.co/600x200" alt="Development Progress">
        <figcaption class="text-sm text-center mt-2 text-gray-500">Early prototypes of our project in action.</figcaption>
      </figure>

      <section class="mb-12">
        <h2 id="looking-to-the-future" class="text-3xl font-semibold mb-3">Looking to the Future</h2>
        <p class="text-lg leading-relaxed text-gray-700 mb-4">
          The journey doesn't end here. We have ambitious plans to expand the scope of our project, integrate user feedback, and explore new possibilities. Here's a sneak peek at what's next:
        </p>
        <ol class="list-decimal pl-6 mt-4 space-y-2">
          <li>Launching a beta version to gather real-world insights.</li>
          <li>Introducing AI-driven features to enhance functionality.</li>
          <li>Building partnerships to reach a broader audience.</li>
        </ol>
      </section>
    </article>
  `;

  const tableOfContents = `
    <div class="sticky top-0 max-h-screen overflow-y-auto">
      <h2 class="text-xl font-bold mb-4">Table of Contents</h2>
      <ul class="list-disc pl-4 space-y-2">
        <li><a href="#introduction" class="text-blue-500 hover:underline">Introduction</a></li>
        <li><a href="#our-inspiration" class="text-blue-500 hover:underline">Our Inspiration</a></li>
        <li><a href="#development-phase" class="text-blue-500 hover:underline">The Development Phase</a></li>
        <li><a href="#looking-to-the-future" class="text-blue-500 hover:underline">Looking to the Future</a></li>
      </ul>
    </div>
  `;

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:gap-20 lg:flex-row">
          <div className="lg:w-3/5">
            <ProjectSummary
              basics={basics}
              funding={funding}
              currentImageIndex={currentImageIndex}
              fundedPercentage={fundedPercentage}
            />
            {/* PROJECT DETAILS SECTION BEGIN */}
            <h2 className="mb-2 text-xl font-bold md:text-2xl">
              What is the {basics.projectName}?{" "}
            </h2>
            <p className="mb-8 text-lg">{basics.projectDefinition}</p>
          </div>
          <div className="lg:w-1/3">
            <ProjectCreator />
            <SupportCard
              donationOptions={donationOptions}
              selectedDonation={selectedDonation}
              setSelectedDonation={setSelectedDonation}
              customAmount={customAmount}
              handleCustomAmountChange={handleCustomAmountChange}
              onDonate={handleDonation}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="my-12 space-y-4">
          {/* Badge section */}
          <div className="flex items-center justify-center space-x-2">
            <Badge variant="secondary" className="rounded-full px-4 py-1">
              <Sparkles className="mr-2 h-4 w-4" />
              Our Story
            </Badge>
          </div>

          {/* Title section with modern border design */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-background px-6">
                <h2 className="text-4xl font-bold tracking-tight">
                  Project Details
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-8 md:gap-20 lg:flex-row">
          <div className="flex flex-col lg:w-3/5">
            <div className="relative mb-8 w-full">
              {/* Blog post content */}
              <div dangerouslySetInnerHTML={{ __html: blogPost }} />
            </div>
          </div>
          <div className="lg:w-1/3">
            {/* Table of Contents */}
            <Card className="sticky top-0">
              <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Fixed bottom-right link component */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link
          href={`/projects/${projectId}/basics`}
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-full shadow-lg transition-all"
        >
          <button className="px-6 py-3 font-medium">Edit Project</button>
        </Link>
      </div>
    </>
  );
}
