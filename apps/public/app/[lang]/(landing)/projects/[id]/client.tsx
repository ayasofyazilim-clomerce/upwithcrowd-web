"use client";

import React, {useCallback, useState} from "react";
import {toast} from "@/components/ui/sonner";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import type {
  PagedResultDto_ListProjectsMembersResponseDto,
  UpwithCrowd_Files_FileResponseListDto,
  UpwithCrowd_Payment_PaymentStatus,
  UpwithCrowd_Payment_SavePaymentTransactionDto,
  UpwithCrowd_Projects_ProjectsDetailResponseDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {JSONContent} from "@repo/ayasofyazilim-ui/organisms/tiptap";
import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import Link from "next/link";
import {useParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useMember} from "@/app/providers/member";
import {postApiPaymentTransaction} from "@/actions/upwithcrowd/payment/post-action";
import FundingTable from "../_components/funding-card";
import ProjectSummary from "../_components/project-summary";
import MobileSupportDrawer from "../_components/mobile-support-card";

export default function ProjectDetails({
  data,
  isEditable,
  projectsMember,
  fileResponse,
}: {
  data: UpwithCrowd_Projects_ProjectsDetailResponseDto;
  isEditable?: boolean;
  projectsMember: PagedResultDto_ListProjectsMembersResponseDto;
  fileResponse: UpwithCrowd_Files_FileResponseListDto;
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

  const groupedMembers = useCallback(() => {
    const grouped = (projectsMember.items ?? [])
      .filter((member) => member.customRoleType !== "Investor")
      .reduce<
        Record<
          string,
          {
            name: string | undefined;
            surname: string | undefined;
            mail: string | undefined;
            roles: {customRoleName: string}[];
          }
        >
      >((acc, member) => {
        const key = member.mail;
        acc[key] = {
          name: member.name || undefined,
          surname: member.surname || undefined,
          mail: member.mail,
          roles: [],
        };

        acc[key].roles.push({
          customRoleName: member.customRoleName || "",
        });
        return acc;
      }, {});

    return Object.values(grouped);
  }, [projectsMember.items]);

  const groupedInvestors = useCallback(() => {
    const grouped = (projectsMember.items ?? [])
      .filter((member) => member.customRoleType === "Investor")
      .reduce<
        Record<
          string,
          {
            name: string | undefined;
            surname: string | undefined;
            mail: string | undefined;
            roles: {customRoleName: string}[];
          }
        >
      >((acc, member) => {
        const key = member.mail;
        acc[key] = {
          name: member.name || undefined,
          surname: member.surname || undefined,
          mail: member.mail,
          roles: [],
        };

        acc[key].roles.push({
          customRoleName: member.customRoleName || "",
        });
        return acc;
      }, {});

    return Object.values(grouped);
  }, [projectsMember.items]);

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:gap-20 lg:flex-row">
          <div className="lg:w-3/5">
            <ProjectSummary
              basics={data}
              currentImageIndex={currentImageIndex}
              fileResponse={fileResponse}
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
            <MobileSupportDrawer
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
                  {groupedMembers().map((member) => (
                    <div className="flex items-center space-x-4" key={member.mail}>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{(member.name?.[0] || "") + (member.surname?.[0] || "")}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">
                          {member.name} {member.surname}
                        </p>
                        <p className="text-muted-foreground text-sm">{member.mail}</p>
                        <div className="flex flex-col gap-2 text-sm">
                          {member.roles.map((role) => (
                            <span className="text-primary" key={role.customRoleName}>
                              {formatRoleName(role.customRoleName)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add new Investors Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold md:text-2xl">Investors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groupedInvestors().map((member) => (
                    <div className="flex items-center space-x-4" key={member.mail}>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{(member.name?.[0] || "") + (member.surname?.[0] || "")}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">
                          {member.name} {member.surname}
                        </p>
                        <p className="text-muted-foreground text-sm">{member.mail}</p>
                        <div className="flex flex-col gap-2 text-sm">
                          {member.roles.map((role) => (
                            <span className="text-primary" key={role.customRoleName}>
                              {formatRoleName(role.customRoleName)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="my-12 space-y-4" />
      </main>

      {/* Fixed bottom-right link component */}
      {isEditable ? (
        <div className="fixed bottom-16 left-4 right-4 z-50 md:bottom-16 md:left-auto md:right-8">
          <Link
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block w-full rounded-full shadow-lg transition-all md:w-auto"
            href={`/projects/${projectId}/basics`}>
            <Button className="w-full rounded-md md:w-auto md:rounded-full" size="lg" type="button">
              Edit Project
            </Button>
          </Link>
        </div>
      ) : null}
    </>
  );
}
