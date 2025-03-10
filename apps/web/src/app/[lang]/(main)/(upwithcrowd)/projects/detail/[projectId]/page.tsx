"use server";

import type {GetApiProjectData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {getProjectApi} from "@repo/actions/upwithcrowd/project/action";
import {isRedirectError, permanentRedirect} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";
import FileTable from "../_components/table";

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
  params: {
    lang: string;
    projectId: string;
  };
  searchParams?: GetApiProjectData;
}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests({
    ...searchParams,
    id: params.projectId,
  });
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [projectResponse] = apiRequests.requiredRequests;
  if (!projectResponse.data.items?.[0]) {
    return permanentRedirect(`/${lang}/home`);
  }
  return (
    <>
      <div className="text-lg font-semibold">{projectResponse.data.items[0].projectName}</div>
      <FileTable />
    </>
  );
}
