"use server";

import type {GetApiPaymentTransactionData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getApiPaymentTransactionApi} from "@repo/actions/upwithcrowd/payment-transaction/action";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";
import InvestmentTable from "./_components/table";

async function getApiRequests(params: GetApiPaymentTransactionData) {
  try {
    const requiredRequests = await Promise.all([getApiPaymentTransactionApi(params)]);
    const optionalRequests = await Promise.allSettled([]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    lang: string;
    memberId: string;
  };
  searchParams?: GetApiPaymentTransactionData;
}) {
  const {lang, memberId} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests({
    ...searchParams,
    memberId,
  });
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [investmentResponse] = apiRequests.requiredRequests;

  return <InvestmentTable investmentResponse={investmentResponse.data} />;
}
