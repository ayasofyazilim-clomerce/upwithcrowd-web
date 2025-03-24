"use server";
import React from "react";
import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";
import {getProjectByIdUpdatePermissionApi} from "@repo/actions/upwithcrowd/public-project/action";
import {structuredError} from "@repo/utils/api";
import {isRedirectError, permanentRedirect} from "next/dist/client/components/redirect";
import ErrorComponent from "@repo/ui/components/error-component";
import {getProjectApi} from "@repo/actions/upwithcrowd/project/action";
import {getResourceData} from "@/language/core/Default";
import {getBaseLink} from "@/utils/lib";
import {ProjectProvider} from "./_components/project-provider";

async function getApiRequests(id: string) {
  try {
    const optionalRequests = await Promise.allSettled([]);

    const requiredRequests = await Promise.all([getProjectByIdUpdatePermissionApi({id}), getProjectApi({id})]);

    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {id: string; lang: string};
}) {
  const {lang, id} = params;
  const baseLink = getBaseLink("dashboard", lang);

  const {languageData} = await getResourceData(lang);
  const apiRequests = await getApiRequests(id);
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [updatePermissionResponse, test] = apiRequests.requiredRequests;
  const isProjectEditable = updatePermissionResponse.data;
  if (test.data.totalCount === 0) {
    return permanentRedirect(`/${lang}/dashboard`);
  }
  return (
    <div className="bg-muted h-full ">
      <TabLayout
        classNames={{
          vertical: {
            tabs: "container mx-auto h-auto flex-col lg:flex-row overflow-hidden",
            tabList:
              "max-w-full bg-transparent gap-2 pt-9 flex-row overflow-x-auto lg:overflow-x-visible flex-nowrap lg:max-w-60 lg:flex-col",
            tabTrigger:
              "rounded-md items-center min-w-max data-[state=active]:bg-white data-[state=active]:shadow-md hover:text-black shadow-none",
          },
        }}
        orientation="vertical"
        tabList={[
          {
            href: `${baseLink}/projects/${id}/basics`,
            label: "Temel Bilgiler",
            disabled: false,
          },

          {
            href: `${baseLink}/projects/${id}/about`,
            label: "Hakkımızda",
            disabled: false,
          },
          {
            href: `${baseLink}/projects/${id}/funding`,
            label: "Fonlama Bilgilerim",
            disabled: false,
          },
          {
            href: `${baseLink}/projects/${id}/documents`,
            label: "Belge, Ödül, Hukuki Durum",
            disabled: false,
          },
          {
            href: `${baseLink}/projects/${id}/information-form`,
            label: "Bilgi Formu",
            disabled: false,
          },
          {
            href: `${baseLink}/projects/${id}/images`,
            label: "Görseller",
            disabled: false,
          },

          {
            href: `${baseLink}/projects/${id}/finish-project`,
            label: "Önizle ve Bitir",
            disabled: false,
          },
          {
            href: `${baseLink}/projects/${id}/investments`,
            label: "Yatırımlar",
            disabled: isProjectEditable,
          },
        ]}>
        <ProjectProvider isProjectEditable={isProjectEditable}>{children}</ProjectProvider>
      </TabLayout>
    </div>
  );
}
