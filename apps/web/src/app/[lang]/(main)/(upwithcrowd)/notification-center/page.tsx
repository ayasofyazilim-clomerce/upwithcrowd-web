"use server";
import {getNovuNotificationStatistics} from "@repo/actions/core/NovuService/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import PageHeader from "@repo/ui/upwithcrowd/header";
import {getResourceData} from "@/language-data/core/Default";
import ClientPage from "./client";

async function getApiRequests() {
  try {
    const requiredRequests = await Promise.all([getNovuNotificationStatistics()]);
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
  };
}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests();
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [notificationStats] = apiRequests.requiredRequests;

  return (
    <div className="space-y-6">
      <PageHeader description="Bildirim oluşturun veya yönetin." title="Bildirim Merkezi" />

      <ClientPage notificationStats={notificationStats.data} />
    </div>
  );
}
