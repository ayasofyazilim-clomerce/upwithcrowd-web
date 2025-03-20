"use server";

import type {GetApiFileData, GetApiProjectByIdProjectInvestorData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getProjectByIdProjectInvestorApi} from "@repo/actions/upwithcrowd/project/action";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";
import InvestorsTable from "@/app/[lang]/(main)/(upwithcrowd)/projects/detail/[projectId]/investors/_components/table";

async function getApiRequests(params: GetApiProjectByIdProjectInvestorData) {
  try {
    const requiredRequests = await Promise.all([
      getProjectByIdProjectInvestorApi({...params, sorting: "memberQualidied desc"}),
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
    id: projectId,
  });
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [investorsResponse] = apiRequests.requiredRequests;

  return <InvestorsTable investorsResponse={investorsResponse.data} />;
}
