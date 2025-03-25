import {getApiPaymentTransactionApi} from "@repo/actions/upwithcrowd/payment-transaction/action";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language/core/Default";
import EmptyPaymentsState from "../_components/empty-payments-state";
import PaymentsPage from "./client";

async function getApiRequests() {
  try {
    const requiredRequests = await Promise.all([]);
    const optionalRequests = await Promise.allSettled([getApiPaymentTransactionApi()]);
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

  const [paymentsResponse] = apiRequests.optionalRequests;

  const payments = paymentsResponse.status === "fulfilled" ? paymentsResponse.value.data : null;

  // Ödeme yoksa boş durumu göster
  if (!payments || payments.totalCount === 0) {
    return <EmptyPaymentsState />;
  }

  // İlk proje ID'sini al veya varsayılan değer kullan
  const firstProjectID = payments.items?.[0]?.id || "";
  const defaultAmount = 0;

  return <PaymentsPage amount={defaultAmount} payments={payments} projectID={firstProjectID} />;
}
