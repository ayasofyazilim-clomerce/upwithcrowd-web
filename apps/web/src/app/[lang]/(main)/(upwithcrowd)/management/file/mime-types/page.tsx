"use server";

import type {GetApiMimeTypeData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getMimeTypesApi} from "@repo/actions/upwithcrowd/mime-type/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {auth} from "@repo/utils/auth/next-auth";
import {getResourceData} from "@/language-data/core/Default";
import MimeTypesTable from "./_components/table";

async function getApiRequests(filters: GetApiMimeTypeData) {
  try {
    const session = await auth();
    const apiRequests = await Promise.all([getMimeTypesApi(filters, session)]);
    return {
      type: "success" as const,
      data: apiRequests,
    };
  } catch (error) {
    const err = error as {data?: string; message?: string};
    return {
      type: "error" as const,
      message: err.message,
    };
  }
}
export default async function Page({
  params,
  searchParams,
}: {
  params: {
    partyId: string;
    lang: string;
  };
  searchParams?: GetApiMimeTypeData;
}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests({
    ...searchParams,
  });

  if (apiRequests.type === "error") {
    return <ErrorComponent languageData={languageData} message={apiRequests.message || "Unknown error occurred"} />;
  }

  const [subStoresResponse] = apiRequests.data;

  return <MimeTypesTable languageData={languageData} locale={lang} response={subStoresResponse.data} />;
}
