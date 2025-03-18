"use client";
import {Badge} from "@/components/ui/badge";
import type {UpwithCrowd_Projects_ListProjectsResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import ListView from "@repo/ayasofyazilim-ui/molecules/list-view";
import {formatCurrency} from "@repo/ui/utils";

function prepareListViewData(projectDetail: UpwithCrowd_Projects_ListProjectsResponseDto) {
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
function ClientPage({projectDetail}: {projectDetail: UpwithCrowd_Projects_ListProjectsResponseDto}) {
  const listViewData = prepareListViewData(projectDetail);

  return (
    <div className="mt-2 grid lg:grid-cols-2">
      <ListView list={listViewData} title="Yatırım Bilgileri" />
    </div>
  );
}

export default ClientPage;
