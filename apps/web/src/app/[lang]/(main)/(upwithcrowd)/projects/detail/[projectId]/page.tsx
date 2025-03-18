"use server";

import {getFileApi} from "@repo/actions/upwithcrowd/file/actions";
import {getProjectApi, getProjectStatisticsByIdApi} from "@repo/actions/upwithcrowd/project/action";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";

async function getApiRequests(projectId: string) {
  try {
    const requiredRequests = await Promise.all([
      getProjectApi({id: projectId}),
      getProjectStatisticsByIdApi({id: projectId}),
      getFileApi({
        relatedEntity: "Project",
        relatedId: projectId,
      }),
    ]);
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

  return <>test</>;
}
