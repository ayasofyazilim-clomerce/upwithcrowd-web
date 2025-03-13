"use server";

import type {GetApiMemberData, GetApiProjectData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getMemberApi} from "@repo/actions/upwithcrowd/member/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";
import ProjectTable from "../_components/table";

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

function validateMemberType(memberType?: string) {
  switch (memberType?.toLowerCase()) {
    case "individual":
      return "Individual";
    case "organization":
      return "Organization";
    default:
      return undefined;
  }
}

//community
//community/organization
//community/organization/pending
//community/individual
//community/individual/pending
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

  const [memberType, isPending] = slug || [];

  const apiRequests = await getApiRequests({
    ...searchParams,
    type: validateMemberType(memberType),
    isValidated: isPending ? false : undefined,
  });
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [projectResponse] = apiRequests.requiredRequests;

  return <ProjectTable response={projectResponse.data} />;
}
