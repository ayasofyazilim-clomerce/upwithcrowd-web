"use server";
import {myProfileApi} from "@repo/actions/core/AccountService/actions";
import {getMemberApi} from "@repo/actions/upwithcrowd/member/actions";
import {getProjectApi} from "@repo/actions/upwithcrowd/project/action";
import ErrorComponent from "@repo/ui/components/error-component";
import AlternativeAdminLayout from "@repo/ui/theme/alternative-admin-layout";
import {getGrantedPoliciesApi, structuredError} from "@repo/utils/api";
import {signOutServer} from "@repo/utils/auth";
import {auth} from "@repo/utils/auth/next-auth";
import type {Policy} from "@repo/utils/policies";
import {LogOut} from "lucide-react";
import {isRedirectError} from "next/dist/client/components/redirect";
import unirefund from "public/unirefund.png";
import image from "public/upwc.png";
import {getResourceData} from "src/language-data/core/AbpUiNavigation";
import Providers from "src/providers/providers";
import {getBaseLink} from "src/utils";
import {getNavbarFromDB} from "../../../utils/navbar/navbar-data";
import {getProfileMenuFromDB} from "../../../utils/navbar/navbar-profile-data";

interface LayoutProps {
  params: {lang: string};
  children: JSX.Element;
}
const appName = process.env.APPLICATION_NAME || "UNIREFUND";

async function getApiRequests() {
  try {
    const requiredRequests = await Promise.all([getGrantedPoliciesApi(), myProfileApi()]);

    const optionalRequests = await Promise.allSettled([
      getProjectApi({status: "Pending"}),
      getMemberApi({isValidated: false, type: "Organization"}),
      getMemberApi({isValidated: false, type: "Individual"}),
    ]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function Layout({children, params}: LayoutProps) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);
  const session = await auth();
  const apiRequests = await getApiRequests();

  if ("message" in apiRequests) {
    return (
      <ErrorComponent
        languageData={languageData}
        message={apiRequests.message}
        showHomeButton={false}
        signOutServer={signOutServer}
      />
    );
  }

  const baseURL = getBaseLink("", lang);
  const [grantedPolicies] = apiRequests.requiredRequests;
  const [pendingProjectsResponse, pendingOrganizationsResponse, pendingIndividualsResponse] =
    apiRequests.optionalRequests;

  const navbarBadges = {
    pendingProjects: pendingProjectsResponse.status === "fulfilled" ? pendingProjectsResponse.value.data.totalCount : 0,
    pendingOrganizations:
      pendingOrganizationsResponse.status === "fulfilled" ? pendingOrganizationsResponse.value.data.totalCount : 0,
    pendingIndividuals:
      pendingIndividualsResponse.status === "fulfilled" ? pendingIndividualsResponse.value.data.totalCount : 0,
  };

  const navbarFromDB = await getNavbarFromDB(lang, languageData, grantedPolicies as Record<Policy, boolean>);
  const profileMenuProps = getProfileMenuFromDB(languageData);
  profileMenuProps.info.name = session?.user?.name ?? profileMenuProps.info.name;
  profileMenuProps.info.email = session?.user?.email ?? profileMenuProps.info.email;
  profileMenuProps.info.image = "https://flowbite.com/docs/images/people/profile-picture-5.jpg";

  profileMenuProps.menu.secondary = [
    {
      href: undefined,
      onClick: signOutServer,
      name: languageData.LogOut,
      icon: <LogOut className="mr-2 h-4 w-4" />,
    },
  ];
  const logo = appName === "UNIREFUND" ? unirefund : undefined;
  return (
    <Providers>
      <div className="flex h-full flex-col bg-white">
        <AlternativeAdminLayout
          appName={appName}
          baseURL={baseURL}
          image={image}
          lang={lang}
          logo={logo}
          navbarBadges={navbarBadges}
          navbarItems={navbarFromDB}
          notification={{
            langugageData: languageData,
            appUrl: process.env.NOVU_APP_URL || "",
            appId: process.env.NOVU_APP_IDENTIFIER || "",
            subscriberId: session?.user?.sub || "67b8674f58411ad400a054e9",
          }}
          prefix=""
          profileMenu={profileMenuProps}
          tenantData={undefined}>
          {children}
        </AlternativeAdminLayout>
      </div>
    </Providers>
  );
}
