"use client";

import {Badge} from "@repo/ayasofyazilim-ui/atoms/badge";
import {Card, CardHeader, CardTitle, CardContent} from "@repo/ayasofyazilim-ui/atoms/card";
import ListView from "@repo/ayasofyazilim-ui/molecules/list-view";
import {formatCurrency} from "@repo/ui/utils";
import {UpwithCrowd_Projects_ProjectsDetailResponseDto} from "@repo/actions/upwithcrowd/types";

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
  >,
) {
  return [
    {
      label: "Nominal Fon Miktarı",
      value: formatCurrency(projectDetail.fundNominalAmount),
      info: "The name of the project.",
    },
    {
      label: "Ek Fon Oranı",
      value: `${projectDetail.additionalFundRate}%`,
      info: "Nominal miktara uygulanan ek fonlama oranı",
    },
    {
      label: "Nitelikli Fon Oranı",
      value: `${projectDetail.qualifiedFundRate}%`,
      info: "Nitelikli fonlama senaryoları için uygulanan oran",
    },
    {
      label: "Aşırı Fonlama",
      value: (
        <Badge variant={projectDetail.overFunding ? "default" : "secondary"}>
          {projectDetail.overFunding ? "Evet" : "Hayır"}
        </Badge>
      ),
      info: "Projenin fonlama hedefini aşıp aşamayacağını gösterir",
    },
    {
      label: "Nakit Değeri",
      value: formatCurrency(projectDetail.cashValue),
      info: "Fonlamanın mevcut nakit değeri",
    },
    {
      label: "Fonlanabilir Miktar",
      value: formatCurrency(projectDetail.fundableAmount),
      info: "Fonlanabilecek maksimum miktar",
    },
    {label: "Fon Toplama Tipi", value: projectDetail.fundCollectionType, info: "Fon toplama yöntemi"},
  ];
}

export default function FundingTable({
  projectDetail,
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
}) {
  const listViewData = prepareListViewData(projectDetail);
  return (
    <div className="mt-8 rounded-md">
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
    </div>
  );
}
