"use server";

import type {GetApiProjectData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getProjectApi} from "@repo/actions/upwithcrowd/project/action";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";
import ProjectTable from "../_components/table";

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

function validateFundCollectionType(fundCollectionType?: string) {
  switch (fundCollectionType?.toLowerCase()) {
    case "shre":
      return "SHRE";
    case "dbit":
      return "DBIT";
    default:
      return undefined;
  }
}

function validateProjectStatus(projectStatus?: string) {
  switch (projectStatus?.toLowerCase()) {
    case "pending":
      return "Pending";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    case "cancelled":
      return "Cancelled";
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
    slug?: string[];
  };
  searchParams?: GetApiProjectData;
}) {
  const {lang, slug} = params;
  const {languageData} = await getResourceData(lang);

  const [projectStatus, fundCollectionType] = slug || [];

  const apiRequests = await getApiRequests({
    ...searchParams,
    status: validateProjectStatus(projectStatus),
    fundCollectionType: validateFundCollectionType(fundCollectionType),
  });
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [projectResponse] = apiRequests.requiredRequests;

  return <ProjectTable response={projectResponse.data} />;
}
