"use client";

import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "@/components/ui/sonner";
import type {
  PagedResultDto_ListProjectInvestorDto,
  PagedResultDto_ListProjectsMembersResponseDto,
  UpwithCrowd_Files_FileResponseListDto,
  UpwithCrowd_Payment_PaymentStatus,
  UpwithCrowd_Payment_SavePaymentTransactionDto,
  UpwithCrowd_Projects_ProjectsDetailResponseDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {postApiPaymentTransaction} from "@repo/actions/upwithcrowd/payment-transaction/post-action";
import type {JSONContent} from "@repo/ayasofyazilim-ui/organisms/tiptap";
import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import {formatCurrency} from "@repo/ui/utils";
import {useSession} from "@repo/utils/auth";
import {Crown} from "lucide-react";
import {useParams} from "next/navigation";
import React, {useCallback, useState} from "react";
import {useMember} from "@/app/providers/member";
import FundingTable from "../_components/funding-card";
import MobileSupportDrawer from "../_components/mobile-support-card";
import ProjectSummary from "../_components/project-summary";
import AuthCard from "./_components/auth-card";
import DocumentsCard from "./_components/documents-card";
import {InvestorsDialog} from "./_components/investors-card";
import ProjectActions from "./_components/project-actions";

export default function ProjectDetails({
  data,
  isEditable,
  projectsMember,
  fileResponse,
  investorResponse,
}: {
  data: UpwithCrowd_Projects_ProjectsDetailResponseDto;
  isEditable?: boolean;
  projectsMember: PagedResultDto_ListProjectsMembersResponseDto;
  fileResponse: UpwithCrowd_Files_FileResponseListDto[];
  investorResponse: PagedResultDto_ListProjectInvestorDto | null;
}) {
  const {id: projectId} = useParams<{id: string}>();
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

  const {session} = useSession();

  const handleDonation = async (amount: number) => {
    try {
      setIsLoading(true);
      const paymentTransactionResponse = await postApiPaymentTransaction({
        requestBody: {
          projectID: projectId,
          memberID: currentMember?.id,
          amount,
          paymentType: "CreditCard",
          type: "Increase",
          paymentStatus: "Pending" as UpwithCrowd_Payment_PaymentStatus,
        } as UpwithCrowd_Payment_SavePaymentTransactionDto,
      });

      if (paymentTransactionResponse.type === "success") {
        toast.success("Desteğiniz için teşekkür ederiz!");
      } else {
        toast.error(paymentTransactionResponse.message || "Bir şeyler yanlış gitti");
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

  const getInitialsFromMaskedName = (name: string | undefined) => {
    if (!name) return "";

    // Split the name by spaces
    const parts = name.split(" ");
    let initials = "";

    // Extract first visible letter from each part
    for (const part of parts) {
      if (part.length > 0) {
        initials += part[0];
      }
    }

    return initials;
  };

  // Map preview investors to the required format
  const previewInvestors = (investorResponse?.items || []).map((investor) => ({
    id: investor.id || "",
    name: investor.name || "",
    amount: investor.amount || 0,
    memberQualidied: investor.memberQualidied || false,
  }));

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:gap-20 lg:flex-row">
        <div className="lg:w-3/5">
          <ProjectSummary
            basics={data}
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
          {isEditable ? <ProjectActions projectId={projectId} /> : null}
          {!isEditable && (
            <>
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
            </>
          )}

          {session?.user?.access_token ? (
            <>
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
                  <CardTitle className="text-xl font-bold md:text-2xl">Proje Ekibi</CardTitle>
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
            </>
          ) : (
            <AuthCard description="Proje ekibini görmek için giriş yapın veya üye olun" title="Proje Ekibi" />
          )}

          {/* Conditionally render investors card or auth card */}
          {!isEditable && (
            <>
              {investorResponse?.items && investorResponse.items.length > 0 ? (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold md:text-2xl">Yatırımcılar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {investorResponse.items.slice(0, 3).map((payment) => (
                        <div className="flex items-center space-x-4" key={payment.id}>
                          <div className="relative">
                            {payment.memberQualidied ? (
                              <div className="absolute -right-1 -top-1 z-10">
                                <Crown className="h-4 w-4 text-yellow-500" />
                              </div>
                            ) : null}
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{getInitialsFromMaskedName(payment.name ?? "")}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{payment.name}</p>
                            <p className="text-muted-foreground text-sm">{formatCurrency(payment.amount)}</p>
                          </div>
                        </div>
                      ))}

                      {(investorResponse.totalCount || 0) > 3 && (
                        <InvestorsDialog
                          investorResponse={investorResponse}
                          previewInvestors={previewInvestors}
                          totalCount={investorResponse.totalCount || 0}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <AuthCard
                  description="Yatırımcı bilgilerini görmek için giriş yapın veya üye olun"
                  title="Yatırımcılar"
                />
              )}
            </>
          )}

          {/* Conditionally render DocumentsCard or AuthCard based on authentication status */}
          {session?.user?.access_token ? (
            <DocumentsCard fileResponse={fileResponse} />
          ) : (
            <AuthCard description="Proje belgelerini görmek için giriş yapın veya üye olun" title="Belgeler" />
          )}
        </div>
      </div>
    </main>
  );
}
