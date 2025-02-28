"use server";

import type {GetApiProjectData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {getProjectApi} from "@upwithcrowd/project/action";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";
import ProjectTable from "../../_components/table";

async function getApiRequests(searchParams: GetApiProjectData) {
  try {
    const requiredRequests = await Promise.all([getProjectApi(searchParams)]);
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
  params: {lang: string; fundCollectionType: "SHRE" | "DBIT" | "ALL"; projectStateType: "PA" | "PS" | "PF" | "PC"};
  searchParams?: GetApiProjectData;
}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests({
    ...searchParams,
    fundCollectionType: params.fundCollectionType === "ALL" ? undefined : params.fundCollectionType,
    projectStateType: params.projectStateType,
  });
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [projectResponse] = apiRequests.requiredRequests;

  return <ProjectTable response={projectResponse.data} />;
}
