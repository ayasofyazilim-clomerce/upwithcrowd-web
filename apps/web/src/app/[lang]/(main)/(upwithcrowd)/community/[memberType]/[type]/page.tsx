"use server";

import type {GetApiMemberData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {getMemberApi} from "@upwithcrowd/member/actions";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";
import ProjectTable from "../../_components/table";

async function getApiRequests(searchParams: GetApiMemberData) {
  try {
    const requiredRequests = await Promise.all([getMemberApi(searchParams)]);
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
  params: {lang: string; memberType: "investor" | "entrepreneur" | "all"; type: "individual" | "organization" | "all"};
}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);

  let isEntrepreneur: boolean | undefined;
  if (params.memberType === "entrepreneur") {
    isEntrepreneur = true;
  } else if (params.memberType === "investor") {
    isEntrepreneur = false;
  }

  let isInvestor: boolean | undefined;
  if (params.memberType === "investor") {
    isInvestor = true;
  } else if (params.memberType === "all") {
    isInvestor = undefined;
  } else {
    isInvestor = false;
  }

  let type: "Individual" | "Organization" | undefined;
  if (params.type === "individual") {
    type = "Individual";
  } else if (params.type === "organization") {
    type = "Organization";
  }

  const apiRequests = await getApiRequests({
    isEntrepreneur,
    isInvestor,
    type,
  });
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [projectResponse] = apiRequests.requiredRequests;

  return <ProjectTable response={projectResponse.data} />;
}
