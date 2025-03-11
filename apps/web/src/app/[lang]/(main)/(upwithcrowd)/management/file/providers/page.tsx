"use server";

import type {GetApiProviderData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getProvidersApi} from "@repo/actions/upwithcrowd/providers/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {auth} from "@repo/utils/auth/next-auth";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";
import ProvidersTable from "./_components/table";

async function getApiRequests(filters: GetApiProviderData) {
  try {
    const session = await auth();
    const requiredRequests = await Promise.all([getProvidersApi(filters, session)]);
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
  };
  searchParams?: GetApiProviderData;
}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests({
    ...searchParams,
  });

  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [providerResponse] = apiRequests.requiredRequests;

  return <ProvidersTable languageData={languageData} locale={lang} response={providerResponse.data} />;
}
