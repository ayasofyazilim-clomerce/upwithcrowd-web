"use server";

import type {GetApiFileTypeGroupData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getFileTypeGroupApi} from "@repo/actions/upwithcrowd/file-type-group/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {auth} from "@repo/utils/auth/next-auth";
import {getResourceData} from "@/language-data/core/Default";
import FileTypeGroupTable from "./_components/table";

async function getApiRequests(filters: GetApiFileTypeGroupData) {
  try {
    const session = await auth();
    const apiRequests = await Promise.all([getFileTypeGroupApi(filters, session)]);
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
  searchParams?: GetApiFileTypeGroupData;
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

  return <FileTypeGroupTable languageData={languageData} locale={lang} response={subStoresResponse.data} />;
}
