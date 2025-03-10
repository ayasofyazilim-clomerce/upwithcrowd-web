"use server";

import {isUnauthorized} from "@repo/utils/policies";
import type {GetApiFileTypeData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getFileTypeGroupApi} from "@repo/actions/upwithcrowd/file-type-group/actions";
import {getProvidersApi} from "@repo/actions/upwithcrowd/providers/actions";
import {getFileTypeApi} from "@repo/actions/upwithcrowd/file-type/actions";
import {structuredError} from "@repo/utils/api";
import {auth} from "@repo/utils/auth/next-auth";
import {isRedirectError, permanentRedirect} from "next/dist/client/components/redirect";
import ErrorComponent from "@repo/ui/components/error-component";
import {getResourceData} from "src/language-data/core/IdentityService";
import Form from "./_components/form";

async function getApiRequests(filters: GetApiFileTypeData) {
  try {
    const session = await auth();
    const requiredRequests = await Promise.all([
      getFileTypeApi(filters, session),
      getFileTypeGroupApi({}, session),
      getProvidersApi({}, session),
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

export default async function Page({params}: {params: {lang: string; fileTypeId: string}}) {
  const {lang, fileTypeId} = params;
  await isUnauthorized({
    requiredPolicies: ["UpwithCrowd.FileType.Save"],
    lang,
  });
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests({
    id: fileTypeId,
  });

  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [fileTypeResponse, fileTypeGroupResponse, providerResponse] = apiRequests.requiredRequests;
  const fileTypeData = fileTypeResponse.data.items?.[0];
  const fileTypeGroupData = fileTypeGroupResponse.data.items || [];
  const providerData = providerResponse.data.items || [];

  if (!fileTypeData) {
    return permanentRedirect(`/${lang}/management/file/file-types`);
  }

  return (
    <>
      <Form
        fileTypeData={fileTypeData}
        fileTypeGroupData={fileTypeGroupData}
        languageData={languageData}
        providerData={providerData}
      />
      <div className="hidden" id="page-description">
        {languageData["Role.Create.Description"]}
      </div>
    </>
  );
}
