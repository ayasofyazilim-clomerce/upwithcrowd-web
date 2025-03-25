"use client";

import {
  UpwithCrowd_Projects_ProjectsDetailResponseDto,
  UpwithCrowd_Projects_ProjectStatisticsDto,
} from "@repo/actions/upwithcrowd/types";
import {Card, CardContent, CardHeader, CardTitle} from "@repo/ayasofyazilim-ui/atoms/card";
import ListView from "@repo/ayasofyazilim-ui/molecules/list-view";
import {formatCurrency} from "@repo/ui/utils";

function prepareListViewData(
  projectDetail: Pick<
    UpwithCrowd_Projects_ProjectsDetailResponseDto,
    | "fundNominalAmount"
    | "additionalFundRate"
    | "qualifiedFundRate"
    | "overFunding"
    | "cashValue"
    | "fundableAmount"
    | "fundCollectionType"
    | "projectStartDate"
    | "projectEndDate"
  >,
  statsResponse: UpwithCrowd_Projects_ProjectStatisticsDto | null,
) {
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return [
    {
      label: "Fonlama Türü",
      value: (() => {
        switch (projectDetail.fundCollectionType) {
          case "SHRE":
            return "Paya Dayalı";
          case "DBIT":
            return "Borca Dayalı";
          case "SHRE_DBIT":
            return "Paya ve Borca Dayalı";
          default:
            return projectDetail.fundCollectionType;
        }
      })(),
      info: "Projenin fonlama hedefini aşıp aşamayacağını gösterir",
    },
    {
      label: "Hedeflenen Fonlama",
      value: formatCurrency(projectDetail.fundableAmount),
      info: "Projenin hedeflediği fon miktarı",
    },
    {
      label: "Alınan Toplam Yatırım",
      value: formatCurrency(statsResponse?.totalInvestment),
      info: "Proje için şimdiye kadar alınan toplam yatırım miktarı",
    },
    {
      label: "Fonlama Başlangıç Tarihi",
      value: formatDate(projectDetail.projectStartDate),
      info: "Projenin fonlamaya başladığı tarih",
    },
    {
      label: "Fonlama Bitiş Tarihi",
      value: formatDate(projectDetail.projectEndDate),
      info: "Projeye yatırım yapılabilen son tarih",
    },
    {
      label: "Yatırımcı Sayısı",
      value: `${statsResponse?.investorCount}`,
      info: "Proje için şimdiye kadar yatırım yapan yatırımcı sayısı",
    },
    {
      label: "Nitelikli Yatırımcı",
      value: `${statsResponse?.qualifiedInvestorCount}`,
      info: "Proje için şimdiye kadar yatırım yapan nitelikli yatırımcı sayısı",
    },
    {
      label: "Nitelikli Yatırım Oranı",
      value: `${projectDetail.qualifiedFundRate}%`,
      info: "Projeye yatırım yapılabilen son tarih",
    },
  ];
}

export default function FundingTable({
  projectDetail,
  statsResponse,
}: {
  projectDetail: Pick<
    UpwithCrowd_Projects_ProjectsDetailResponseDto,
    | "fundNominalAmount"
    | "additionalFundRate"
    | "qualifiedFundRate"
    | "overFunding"
    | "cashValue"
    | "fundableAmount"
    | "fundCollectionType"
  >;
  statsResponse: UpwithCrowd_Projects_ProjectStatisticsDto | null;
}) {
  const listViewData = prepareListViewData(projectDetail, statsResponse);
  return (
    <Card className="py- col-span-1">
      <CardHeader className="flex flex-col gap-3 p-4 sm:gap-4 sm:p-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <CardTitle className="text-lg sm:text-xl">Yatırım Bilgileri</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0 sm:space-y-6 sm:p-6 sm:pt-0">
        <ListView list={listViewData} />
      </CardContent>
    </Card>
  );
}
