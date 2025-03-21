import type {GetApiProjectByIdProjectInvestorData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getProjectByIdProjectInvestorApi} from "@repo/actions/upwithcrowd/project/action";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language/core/Default";
import {Modal} from "./modal";

async function getApiRequests(searchParams: GetApiProjectByIdProjectInvestorData) {
  try {
    const optionalRequests = await Promise.allSettled([getProjectByIdProjectInvestorApi(searchParams)]);
    const requiredRequests = await Promise.all([]);

    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function PhotoModal({
  params,
  searchParams,
}: {
  params: {id: string; lang: string};
  searchParams?: GetApiProjectByIdProjectInvestorData;
}) {
  const {lang, id} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests({
    ...searchParams,
    id,
    sorting: "amount desc",
    maxResultCount: 10,
  });
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [investorResponse] = apiRequests.optionalRequests;
  const investorResponseData = investorResponse.status === "fulfilled" ? investorResponse.value.data : null;

  return <Modal investorData={investorResponseData} />;
}
