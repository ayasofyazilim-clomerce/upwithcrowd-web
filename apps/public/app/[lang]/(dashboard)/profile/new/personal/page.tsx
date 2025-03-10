"use server";

import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError, permanentRedirect} from "next/dist/client/components/redirect";
import {getMemberApi} from "@repo/actions/upwithcrowd/member/actions";
import {getResourceData} from "@/language/core/Default";
import NewPersonalAccount from "./client";

async function getApiRequests() {
  try {
    const requiredRequests = await Promise.all([]);

    const optionalRequests = await Promise.allSettled([getMemberApi()]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function Page({params}: {params: {lang: string}}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);
  const apiRequests = await getApiRequests();
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [memberResponse] = apiRequests.optionalRequests;

  if (memberResponse.status === "fulfilled" && memberResponse.value.data.items?.length !== 0) {
    return permanentRedirect(`/${lang}/profile`);
  }

  return <NewPersonalAccount />;
}
