import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getApiPaymentTransactionApi} from "@repo/actions/upwithcrowd/payment-transaction/action";
import {getPublicProjectsApi} from "@repo/actions/upwithcrowd/public-project/action";
import {getResourceData} from "@/language/core/Default";
import EmptyPaymentsState from "../_components/empty-payments-state";
import PaymentsPage from "./client";

async function getApiRequests() {
  try {
    const requiredRequests = await Promise.all([
      getApiPaymentTransactionApi({
        maxResultCount: 100,
      }),
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

export default async function Page({params}: {params: {lang: string}}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests();
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [paymentsResponse] = apiRequests.requiredRequests;

  const projectsResponse = await getPublicProjectsApi();
  if (projectsResponse.type !== "success") {
    return <>{projectsResponse.message}</>;
  }

  const projects = projectsResponse.data.items || [];

  const payments =
    paymentsResponse.data.items?.map((payment) => {
      const project = projects.find((projectItem) => projectItem.id === payment.projectID);

      return {
        ...payment,
        projectName: project?.projectName || "Bilinmeyen Proje",
      };
    }) ?? [];

  // Ödeme yoksa boş durumu göster
  if (payments.length === 0) {
    return <EmptyPaymentsState />;
  }

  // İlk proje ID'sini al veya varsayılan değer kullan
  const firstProjectID = projects[0]?.id || "";
  // Varsayılan miktar (gereksinimlerinize göre hesaplanabilir)
  const defaultAmount = 0;

  return <PaymentsPage amount={defaultAmount} payments={payments} projectID={firstProjectID} />;
}
