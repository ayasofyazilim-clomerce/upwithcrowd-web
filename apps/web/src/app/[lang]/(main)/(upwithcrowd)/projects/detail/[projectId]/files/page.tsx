"use server";

import type {GetApiFileData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getFileApi} from "@repo/actions/upwithcrowd/file/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";
import FileTable from "./_components/table";

async function getApiRequests(params: GetApiFileData) {
  try {
    const requiredRequests = await Promise.all([getFileApi(params)]);
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
    projectId: string;
  };
  searchParams?: GetApiFileData;
}) {
  const {lang, projectId} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests({
    ...searchParams,
    relatedEntity: "Project",
    relatedId: projectId,
    fileTypeGroup: "ProjectRelatedFiles",
  });
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [fileResponse] = apiRequests.requiredRequests;

  return <FileTable fileResponse={fileResponse.data} />;
}
