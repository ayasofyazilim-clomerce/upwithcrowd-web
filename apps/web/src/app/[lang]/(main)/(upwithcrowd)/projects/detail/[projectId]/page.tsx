"use server";

import type {UpwithCrowd_Projects_ListProjectsResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getProjectApi} from "@repo/actions/upwithcrowd/project/action";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";
import {checkNonEmptyArray} from "../../../../../../../types";
import ClientPage from "./client";

async function getApiRequests(projectId: string) {
  try {
    const requiredRequests = await Promise.all([getProjectApi({id: projectId})]);
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
}: {
  params: {
    lang: string;
    projectId: string;
  };
}) {
  const {lang, projectId} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests(projectId);
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [projectDetailResponse] = apiRequests.requiredRequests;
  const projectDetail = projectDetailResponse.data.items || [];
  if (!checkNonEmptyArray<UpwithCrowd_Projects_ListProjectsResponseDto>(projectDetail)) {
    return null;
  }

  return <ClientPage projectDetail={projectDetail[0]} />;
}
