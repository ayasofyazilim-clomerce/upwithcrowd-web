"use server";

import type {GetApiFileTypeMimeTypesData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getFileTypeMimeTypesApi} from "@repo/actions/upwithcrowd/file-type-mime-types/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {auth} from "@repo/utils/auth/next-auth";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getMimeTypesApi} from "@repo/actions/upwithcrowd/mime-type/actions";
import {getFileTypeApi} from "@repo/actions/upwithcrowd/file-type/actions";
import {getResourceData} from "@/language-data/core/Default";
import FileTypeMimeTypesTable from "./_components/table";

async function getApiRequests(filters: GetApiFileTypeMimeTypesData) {
  try {
    const session = await auth();
    const requiredRequests = await Promise.all([getFileTypeMimeTypesApi(filters, session)]);
    const optionalRequests = await Promise.allSettled([
      getMimeTypesApi({maxResultCount: 100}, session),
      getFileTypeApi({maxResultCount: 100}, session),
    ]);
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
  };
  searchParams?: GetApiFileTypeMimeTypesData;
}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests({
    ...searchParams,
  });

  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [fileTypeMimeTypesResponse] = apiRequests.requiredRequests;
  const [mimeTypeResponse, fileTypeResponse] = apiRequests.optionalRequests;

  const mimeTypeData = mimeTypeResponse.status === "fulfilled" ? mimeTypeResponse.value.data.items || [] : [];
  const fileTypeData = fileTypeResponse.status === "fulfilled" ? fileTypeResponse.value.data.items || [] : [];
  return (
    <FileTypeMimeTypesTable
      fileTypeData={fileTypeData}
      languageData={languageData}
      locale={lang}
      mimeTypeData={mimeTypeData}
      response={fileTypeMimeTypesResponse.data}
    />
  );
}
