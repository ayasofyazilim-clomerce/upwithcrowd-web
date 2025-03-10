"use server";

import {getFileTypeGroupApi} from "@repo/actions/upwithcrowd/file-type-group/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {auth} from "@repo/utils/auth/next-auth";
import {isUnauthorized} from "@repo/utils/policies";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getProvidersApi} from "@repo/actions/upwithcrowd/providers/actions";
import {getResourceData} from "src/language-data/core/IdentityService";
import Form from "./_components/form";

async function getApiRequests() {
  try {
    const session = await auth();
    const requiredRequests = await Promise.all([getFileTypeGroupApi({}, session), getProvidersApi({}, session)]);
    const optionalRequests = await Promise.allSettled([]);
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
  await isUnauthorized({
    requiredPolicies: ["UpwithCrowd.FileType.Save"],
    lang,
  });
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests();

  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [fileTypeGroupResponse, providerResponse] = apiRequests.requiredRequests;
  const fileTypeGroupData = fileTypeGroupResponse.data.items || [];
  const providerData = providerResponse.data.items || [];
  return (
    <>
      <Form fileTypeGroupData={fileTypeGroupData} languageData={languageData} providerData={providerData} />
      <div className="hidden" id="page-description">
        {languageData["Role.Create.Description"]}
      </div>
    </>
  );
}
