import {Avatar, AvatarFallback} from "@repo/ayasofyazilim-ui/atoms/avatar";
import {Card, CardHeader, CardTitle, CardContent} from "@repo/ayasofyazilim-ui/atoms/card";
import DocumentCard from "@repo/ayasofyazilim-ui/molecules/document-card";
import {Crown} from "lucide-react";
import React, {useState} from "react";
import {formatCurrency} from "@repo/ui/utils";
import AuthCard from "./auth-card";
import FundingTable from "./funding-card";
import ProjectTeam from "./project-team";
import type {
  UpwithCrowd_Projects_ProjectsDetailResponseDto,
  PagedResultDto_ListProjectsMembersResponseDto,
  UpwithCrowd_Files_FileResponseListDto,
  PagedResultDto_ListProjectInvestorDto,
  UpwithCrowd_Projects_ProjectStatisticsDto,
  UpwithCrowd_Payment_PaymentStatus,
  UpwithCrowd_Payment_SavePaymentTransactionDto,
  UpwithCrowd_Members_ListMemberResponseDto,
} from "@repo/actions/upwithcrowd/types";
import ProjectSummary from "./project-summary";
import TipTapEditor, {type JSONContent} from "@repo/ayasofyazilim-ui/organisms/tiptap";
import ProjectActions from "./project-actions";
import MobileSupportDrawer from "./mobile-support-card";
import {toast} from "@repo/ayasofyazilim-ui/atoms/sonner";
import {useParams} from "next/navigation";
import type {Session} from "node_modules/@repo/utils/auth/auth-types";
import {postApiPaymentTransaction} from "@repo/actions/upwithcrowd/payment-transaction/post-action";
import {InvestorsDialog} from "./investors-card";
import StatsCard from "./stats-card";
import {handleFileDownload} from "../file-upload/index";

function ProjectTemplate({
  data,
  isEditable,
  projectsMember,
  fileResponse,
  investorResponse,
  imageResponse,
  statsResponse,
  session,
  currentMember,
  isPreview,
}: {
  data: UpwithCrowd_Projects_ProjectsDetailResponseDto;
  isEditable?: boolean;
  projectsMember: PagedResultDto_ListProjectsMembersResponseDto | null;
  imageResponse: UpwithCrowd_Files_FileResponseListDto[];
  fileResponse: UpwithCrowd_Files_FileResponseListDto[];
  investorResponse: PagedResultDto_ListProjectInvestorDto | null;
  statsResponse: UpwithCrowd_Projects_ProjectStatisticsDto | null;
  session: Session | null;
  currentMember:
    | (UpwithCrowd_Members_ListMemberResponseDto & {
        profileImage?: string;
      })
    | null;
  isPreview?: boolean;
}) {
  const {id: projectId, lang} = useParams<{id: string; lang: string}>();
  const [customAmount, setCustomAmount] = useState<string>("");
  const donationOptions = [10, 25, 50, 100, 250, 500];
  const [selectedDonation, setSelectedDonation] = useState(donationOptions[0]);

  const allInvestorsLink = !isPreview ? `/${lang}/projects/${projectId}/investors` : undefined;

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
      const paymentTransactionResponse = await postApiPaymentTransaction({
        requestBody: {
          projectID: projectId,
          memberID: currentMember?.id,
          amount,
          paymentType: "CreditCard",
          type: "Decrease",
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

  // Prepare document tabs for the DocumentsCard component
  // Filter files for Patent, Trademark, etc.
  const getFileNameFromPath = (fullPath: string): string => {
    const matches = /[^/]+$/.exec(fullPath);
    return matches ? matches[0] : fullPath;
  };

  const getFileType = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase() || "";
    if (extension === "pdf") return "pdf";
    if (["jpg", "jpeg", "png", "gif"].includes(extension)) return "image";
    return "doc";
  };

  const fileData = fileResponse.map((i) => {
    const fileName = getFileNameFromPath(i.fullPath || "");
    const fileType = getFileType(fileName);
    return {...i, fileId: i.fileId || "", fileName, fileType};
  });
  const legalFiles = fileData.filter((file) => file.fileTypeNamespace === "ProjectLegalDocument");
  const patentFiles = fileData.filter((file) =>
    ["TrademarkRegistration", "ApplicationForaPatent", "Patent", "ISOCertificate", "Other"].includes(
      file.fileTypeNamespace ?? "",
    ),
  );

  // Create tab configuration
  const documentTabs = [
    {
      value: "patent",
      label: "Patent, Marka ve Tescil Bilgileri",
      files: patentFiles.map((file) => ({
        ...file,
        onDownloadClick: () => {
          void fetch(`/api/file/${file.fileId}/download`).then((response) => {
            handleFileDownload({response, file: {...file, fileId: file.fileId || ""}, actionType: "download"});
          });
        },
      })),
    },
    {
      value: "legal",
      label: "Hukuki Durum",
      files: legalFiles.map((file) => ({
        ...file,
        onDownloadClick: () => {
          void fetch(`/api/file/${file.fileId}/download`).then((response) => {
            handleFileDownload({response, file: {...file, fileId: file.fileId || ""}, actionType: "download"});
          });
        },
      })),
    },
  ];
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:gap-20 lg:flex-row">
        <div className="lg:w-3/5">
          <ProjectSummary basics={data} fileResponse={imageResponse} funding={data} statsResponse={statsResponse} />

          <TipTapEditor
            editorClassName="mt-8"
            editorContent={data.projectContent ? (JSON.parse(data.projectContent) as JSONContent) : {}}
            mode={isEditable ? "preview" : "live"}
          />
        </div>
        <div className="space-y-8 lg:w-1/3">
          {isEditable ? <ProjectActions projectId={projectId} /> : null}
          {!isEditable && !isPreview && (
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
              <FundingTable projectDetail={data} statsResponse={statsResponse} />
            </>
          )}

          {session ? (
            <div className="mt-6">
              {data.privilege ? (
                <div className="mb-8">
                  <h2 className="mb-2 text-xl font-bold md:text-2xl">Ayrıcalıklar</h2>
                  <p>{data.privilege}</p>
                </div>
              ) : null}
            </div>
          ) : (
            <AuthCard description="Ayrıcalıkları görmek için giriş yapın veya üye olun" title="Ayrıcalıklar" />
          )}
          <ProjectTeam memberResponse={projectsMember} />
          {/* Conditionally render investors card or auth card */}
          {!isEditable && (
            <>
              {session ? (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold md:text-2xl">Yatırımcılar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {investorResponse?.items?.slice(0, 3).map((payment) => (
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

                      {allInvestorsLink && investorResponse?.totalCount && investorResponse.totalCount > 3 ? (
                        <InvestorsDialog
                          previewInvestors={previewInvestors}
                          totalCount={investorResponse.totalCount || 0}
                          allInvestorsLink={allInvestorsLink}
                        />
                      ) : null}
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
          {session ? (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold md:text-2xl">Dokümanlar</CardTitle>
              </CardHeader>

              <CardContent>
                <DocumentCard activeDefaultTab="patent" documentTabs={documentTabs} />
              </CardContent>
            </Card>
          ) : (
            <AuthCard description="Proje belgelerini görmek için giriş yapın veya üye olun" title="Belgeler" />
          )}
          {session ? (
            <StatsCard stats={statsResponse} />
          ) : (
            <AuthCard description="İstatistikleri görmek için giriş yapın veya üye olun" title="İstatistikler" />
          )}
        </div>
      </div>
    </main>
  );
}

export default ProjectTemplate;
