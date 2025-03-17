"use server";
import {getNovuNotificationStatistics} from "@repo/actions/core/NovuService/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
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
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6">
        <div className="">
          <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">Bildirim Merkezi</h1>
          <p className="mt-1 text-sm text-gray-600 sm:mt-2">Bildirim oluşturun veya yönetin.</p>
        </div>
      </div>
      <ClientPage notificationStats={notificationStats.data} />
    </div>
  );
}
