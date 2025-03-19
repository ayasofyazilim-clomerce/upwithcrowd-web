import {Badge} from "@/components/ui/badge";
import type {UpwithCrowd_Projects_ListProjectsResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getProjectApi, getProjectStatisticsByIdApi} from "@repo/actions/upwithcrowd/project/action";
import Infocard from "@repo/ayasofyazilim-ui/molecules/infocard";
import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";
import ErrorComponent from "@repo/ui/components/error-component";
import PageHeader from "@repo/ui/upwithcrowd/header";
import {structuredError} from "@repo/utils/api";
import {CircleDollarSign, Coins, Landmark, Wallet2, WalletCards} from "lucide-react";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getBaseLink} from "@/utils";
import {checkNonEmptyArray} from "@/types";
import {getResourceData} from "@/language-data/core/Default";
import ProjectActions from "./_components/project-actions";

async function getApiRequests(projectId: string) {
  try {
    const requiredRequests = await Promise.all([
      getProjectApi({id: projectId}),
      getProjectStatisticsByIdApi({id: projectId}),
    ]);
    const optionalRequests = await Promise.allSettled([]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

function statusBgColor(status?: string) {
  switch (status) {
    case "Approved":
      return "bg-green-700";
    case "Pending":
      return "bg-yellow-700";
    case "Rejected":
      return "bg-red-700";
    default:
      return "bg-gray-700";
  }
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {lang: string; projectId: string};
}) {
  const {lang, projectId} = params;
  const {languageData} = await getResourceData(lang);
  const apiRequests = await getApiRequests(projectId);
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [projectDetailResponse, projectStatisticsResponse] = apiRequests.requiredRequests;
  const projectDetailList = projectDetailResponse.data.items || [];
  if (!checkNonEmptyArray<UpwithCrowd_Projects_ListProjectsResponseDto>(projectDetailList)) {
    return null;
  }
  const projectDetail = projectDetailList[0];
  const projectStatistics = projectStatisticsResponse.data;

  const baseLink = getBaseLink(`projects/detail/${projectId}/`);

  return (
    <div className="space-y-6">
      <PageHeader description={projectDetail.projectDefinition} title={projectDetail.projectName}>
        {projectDetail.status === "Pending" && <ProjectActions projectId={projectId} />}
        <div className="absolute right-10 top-10">
          <Badge className={statusBgColor(projectDetail.status)} variant="default">
            {projectDetail.status}
          </Badge>
        </div>
      </PageHeader>
      <div className="grid grid-cols-5 gap-2">
        <Infocard
          className="min-w-full"
          content={projectStatistics.investorCount?.toString() || "0"}
          icon={<Wallet2 className="h-5 w-5" />}
          title="Yatırımcı sayısı"
        />
        <Infocard
          className="min-w-full"
          content={projectStatistics.qualifiedInvestorCount?.toString() || "0"}
          icon={<WalletCards className="h-5 w-5" />}
          title="Nitelikli yatırımcı sayısı"
        />
        <Infocard
          className="min-w-full"
          content={projectStatistics.investmentRate?.toString() || "0"}
          icon={<Coins className="h-5 w-5" />}
          title="Yatırım oranı"
        />
        <Infocard
          className="min-w-full"
          content={projectStatistics.qualifiedInvestmentRate?.toString() || "0"}
          icon={<Landmark className="h-5 w-5" />}
          title="Nitelikli yatırım oranı"
        />
        <Infocard
          className="min-w-full"
          content={projectStatistics.totalInvestment?.toString() || "0"}
          icon={<CircleDollarSign className="h-5 w-5" />}
          title="Toplam yatırım"
        />
      </div>

      <TabLayout
        tabList={[
          {
            href: baseLink,
            label: "Genel",
          },
          {
            href: `${baseLink}images`,
            label: "Proje Görselleri",
          },
          {
            href: `${baseLink}files`,
            label: "Projeyle İlgili Dosyalar",
          },
        ]}>
        {children}
      </TabLayout>
    </div>
  );
}
