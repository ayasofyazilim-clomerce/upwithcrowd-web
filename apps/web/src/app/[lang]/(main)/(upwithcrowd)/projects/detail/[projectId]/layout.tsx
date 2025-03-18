import type {UpwithCrowd_Projects_ListProjectsResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getProjectApi, getProjectStatisticsByIdApi} from "@repo/actions/upwithcrowd/project/action";
import Infocard from "@repo/ayasofyazilim-ui/molecules/infocard";
import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {Wallet2, WalletCards, Coins, Landmark, CircleDollarSign} from "lucide-react";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getBaseLink} from "@/utils";
import {checkNonEmptyArray} from "@/types";
import {getResourceData} from "@/language-data/core/Default";

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
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6">
        <div className="">
          <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">{projectDetail.projectName}</h1>
          <p className="mt-1 text-sm text-gray-600 sm:mt-2">{projectDetail.projectDefinition}</p>
        </div>
      </div>
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
            label: "Genel Bilgiler",
          },
          {
            href: `${baseLink}images`,
            label: "Proje Görselleri",
          },
        ]}>
        {children}
      </TabLayout>
    </div>
  );
}
