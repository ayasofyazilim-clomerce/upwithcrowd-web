"use server";

import type {
  GetApiProjectData,
  UpwithCrowd_Projects_FundCollectionType,
  UpwithCrowd_Projects_ProjectStateType,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {getProjectApi} from "@repo/actions/upwithcrowd/project/action";
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

function validateFundCollectionType(fundCollectionType: UpwithCrowd_Projects_FundCollectionType | "ALL") {
  switch (fundCollectionType.toLowerCase()) {
    case "shre":
      return "SHRE";
    case "dbit":
      return "DBIT";
    default:
      return undefined;
  }
}

function validateProjectStateType(projectStateType: UpwithCrowd_Projects_ProjectStateType) {
  switch (projectStateType.toLowerCase()) {
    case "pa":
      return "PA";
    case "ps":
      return "PS";
    case "pf":
      return "PF";
    case "pc":
      return "PC";
    case "pw":
      return "PW";
    case "pd":
      return "PD";
    default:
      return undefined;
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    lang: string;
    fundCollectionType: UpwithCrowd_Projects_FundCollectionType | "ALL";
    projectStateType: UpwithCrowd_Projects_ProjectStateType;
  };
  searchParams?: GetApiProjectData;
}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests({
    ...searchParams,
    fundCollectionType: validateFundCollectionType(params.fundCollectionType),
    projectStateType: validateProjectStateType(params.projectStateType),
  });
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [projectResponse] = apiRequests.requiredRequests;

  return <ProjectTable response={projectResponse.data} />;
}
