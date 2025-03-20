"use client";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import type {UpwithCrowd_Projects_ListProjectsResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import ListView from "@repo/ayasofyazilim-ui/molecules/list-view";
import SendNotificationForm from "@repo/ui/upwithcrowd/novu/send-notification-form";
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

  const topics = [
    {
      value: `${projectDetail.id}_followers`,
      label: "Proje takipçileri",
    },
    {
      value: `${projectDetail.id}_investors`,
      label: "Proje yatırımcıları",
    },
    {
      value: `${projectDetail.id}_entrepreneurs`,
      label: "Proje ekibi",
    },
  ];
  return (
    <div className="mt-2 grid grid-cols-2 gap-3">
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
      <SendNotificationForm notificationType="topics" topics={topics} />
    </div>
  );
}

export default ClientPage;
