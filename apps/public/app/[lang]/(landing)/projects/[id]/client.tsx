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

// Add this mock data at the top of the file, after the imports
const mockDocuments = [
  {
    id: 1,
    title: "Proje Başvuru Belgesi",
    description: "Projenin resmi başvuru ve onay belgesi",
    date: "2023-12-15",
    type: "pdf",
  },
  {
    id: 2,
    title: "Patent Sertifikası",
    description: "Teknoloji için alınan uluslararası patent belgesi",
    date: "2024-01-20",
    type: "pdf",
  },
  {
    id: 3,
    title: "Ödül Sertifikası - Medikal İnovasyon 2023",
    description: "Uluslararası Medikal İnovasyon Yarışması Birincilik Ödülü",
    date: "2023-11-05",
    type: "image",
  },
  {
    id: 4,
    title: "Hukuki Durum Raporu",
    description: "Projenin güncel yasal durumu ve fikri mülkiyet hakları raporu",
    date: "2024-02-10",
    type: "doc",
  },
];

export default function ProjectDetails({
  data,
  isEditable,
  projectsMember,
  fileResponse,
}: {
  data: UpwithCrowd_Projects_ProjectsDetailResponseDto;
  isEditable?: boolean;
  projectsMember: PagedResultDto_ListProjectsMembersResponseDto;
  fileResponse: UpwithCrowd_Files_FileResponseListDto[];
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
        toast.success("Desteğiniz için teşekkür ederiz!");
      } else {
        toast.error(paymentResponse.message || "Bir şeyler yanlış gitti");
      }
    } catch (error) {
      toast.error("An error occurred while processing your payment");
    } finally {
      setIsLoading(false);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return (
          <svg
            className="lucide lucide-file-text"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <line x1="10" x2="8" y1="9" y2="9" />
          </svg>
        );
      case "image":
        return (
          <svg
            className="lucide lucide-image"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg">
            <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        );
      default:
        return (
          <svg
            className="lucide lucide-file"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        );
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

            {/* Add new Investors Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold md:text-2xl">Yatırımcılar</CardTitle>
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
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold md:text-2xl">Belge, Ödül, Hukuki Durum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDocuments.map((doc) => (
                    <div
                      className="hover:bg-muted/50 group flex items-center gap-3 rounded-lg border p-3 transition-all"
                      key={doc.id}>
                      <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                        {getFileIcon(doc.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{doc.title}</h4>
                          <Button
                            className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                            size="icon"
                            variant="ghost">
                            <svg
                              className="lucide lucide-download"
                              fill="none"
                              height="16"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              width="16"
                              xmlns="http://www.w3.org/2000/svg">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                            <span className="sr-only">İndir</span>
                          </Button>
                        </div>
                        <p className="text-muted-foreground line-clamp-2 text-sm">{doc.description}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-muted-foreground text-xs">{doc.date}</span>
                          <span className="bg-muted-foreground inline-flex h-1.5 w-1.5 rounded-full" />
                          <span className="text-muted-foreground text-xs uppercase">{doc.type}</span>
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
              Projeyi Düzenle
            </Button>
          </Link>
        </div>
      ) : null}
    </>
  );
}
