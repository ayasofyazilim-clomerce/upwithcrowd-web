"use server";

import type {GetApiFileRelationEntityData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getFileRelationEntityApi} from "@repo/actions/upwithcrowd/file-relation-entity/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {auth} from "@repo/utils/auth/next-auth";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";
import FileRelationEntitiesTable from "./_components/table";

async function getApiRequests(filters: GetApiFileRelationEntityData) {
  try {
    const session = await auth();
    const requiredRequests = await Promise.all([getFileRelationEntityApi(filters, session)]);
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
  searchParams?: GetApiFileRelationEntityData;
}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests({
    ...searchParams,
  });

  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [fileTypeResponse] = apiRequests.requiredRequests;
  return <FileRelationEntitiesTable languageData={languageData} locale={lang} response={fileTypeResponse.data} />;
}
