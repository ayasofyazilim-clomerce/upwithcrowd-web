"use client";

import {toast} from "@/components/ui/sonner";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import type {
  PagedResultDto_ListProjectsMembersResponseDto,
  UpwithCrowd_Payment_PaymentStatus,
  UpwithCrowd_Payment_SavePaymentTransactionDto,
  UpwithCrowd_Projects_ProjectsDetailResponseDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {JSONContent} from "@repo/ayasofyazilim-ui/organisms/tiptap";
import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import Link from "next/link";
import {useParams} from "next/navigation";
import {useCallback, useState} from "react";
import {useMember} from "@/app/providers/member";
import {postApiPaymentTransaction} from "@/actions/upwithcrowd/payment/post-action";
import FundingTable from "../_components/funding-card";
import ProjectSummary from "../_components/project-summary";
import SupportCard from "../_components/support-card";

export default function ProjectDetails({
  data,
  isEditable,
  projectsMember,
}: {
  data: UpwithCrowd_Projects_ProjectsDetailResponseDto;
  isEditable?: boolean;
  projectsMember: PagedResultDto_ListProjectsMembersResponseDto;
}) {
  const {id: projectId} = useParams<{id: string}>();
  const [currentImageIndex, _setCurrentImageIndex] = useState(0);
  const [customAmount, setCustomAmount] = useState<string>("");
  const donationOptions = [10, 25, 50, 100, 250, 500];
  const [selectedDonation, setSelectedDonation] = useState(donationOptions[0]);
  const {currentMember} = useMember();
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
          amount,
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
    } finally {
      setIsLoading(false);
    }
  };

  const fundedPercentage = 0;

  const formatRoleName = useCallback((name: string) => {
    return name
      .replace("UpwithCrowd:CustomRoles:", "")
      .split(/(?=[A-Z])/)
      .join(" ")
      .trim();
  }, []);

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:gap-20 lg:flex-row">
          <div className="lg:w-3/5">
            <ProjectSummary
              basics={data}
              currentImageIndex={currentImageIndex}
              fundedPercentage={fundedPercentage}
              funding={data}
            />

            <TipTapEditor
              editorClassName="mt-8"
              editorContent={data.projectContent ? (JSON.parse(data.projectContent) as JSONContent) : {}}
              mode="live"
            />
          </div>
          <div className="lg:w-1/3">
            <SupportCard
              customAmount={customAmount}
              donationOptions={donationOptions}
              handleCustomAmountChange={handleCustomAmountChange}
              isLoading={isLoading}
              onDonate={handleDonation}
              selectedDonation={selectedDonation}
              setSelectedDonation={setSelectedDonation}
            />
            <FundingTable data={data} />
            <div className="mt-6">
              {data.privilege ? (
                <div className="mb-8">
                  <h2 className="mb-2 text-xl font-bold md:text-2xl">Ayrıcalıklar</h2>
                  <p>{data.privilege}</p>
                </div>
              ) : null}
            </div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold md:text-2xl">Project Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectsMember.items?.map((member) => (
                    <div className="flex items-center space-x-4" key={member.customRoleID}>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{(member.name?.[0] || "") + (member.surname?.[0] || "")}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">
                          {member.name} {member.surname}
                        </p>
                        <p className="text-muted-foreground text-sm">{member.mail}</p>
                        <div className="flex flex-col text-sm">
                          <span className="text-primary">{formatRoleName(member.customRoleName || "")}</span>{" "}
                          <span>{member.customRoleType}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="my-12 space-y-4">
          {/* Badge section */}
          {/* <div className="flex items-center justify-center space-x-2">
            <Badge variant="secondary" className="rounded-full px-4 py-1">
              <Sparkles className="mr-2 h-4 w-4" />
              Our Story
            </Badge>
          </div> */}

          {/* Title section with modern border design */}
          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-background px-6">
                <h2 className="text-4xl font-bold tracking-tight">Project Details</h2>
              </div>
            </div>
          </div> */}
        </div>

        {/*<div className="mt-16 flex flex-col gap-8 md:gap-20 lg:flex-row">
          <div className="flex flex-col lg:w-3/5">
            <div className="relative mb-8 w-full">
              {/* Blog post content */}
        {/* <div dangerouslySetInnerHTML={{__html: blogPost}} />
            </div>
          </div>
          <div className="lg:w-1/3">
            {/* Table of Contents */}
        {/*<Card className="sticky top-0">
              <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <div dangerouslySetInnerHTML={{__html: tableOfContents}} />
              </CardContent>
            </Card>
          </div>
        </div>*/}
      </main>

      {/* Fixed bottom-right link component */}
      {isEditable ? (
        <div className="fixed bottom-8 right-8 z-50">
          <Link
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-full shadow-lg transition-all"
            href={`/projects/${projectId}/basics`}>
            <button className="px-6 py-3 font-medium" type="button">
              Edit Project
            </button>
          </Link>
        </div>
      ) : null}
    </>
  );
}
