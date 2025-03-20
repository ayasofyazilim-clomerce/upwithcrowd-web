import {getMemberApi} from "@repo/actions/upwithcrowd/member/actions";
import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getBaseLink} from "@/utils";
import {getResourceData} from "@/language-data/core/Default";

async function getApiRequests(memberId: string) {
  try {
    const requiredRequests = await Promise.all([getMemberApi({id: memberId})]);
    const optionalRequests = await Promise.allSettled([]);
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
  params: {lang: string; memberId: string};
}) {
  const {lang, memberId} = params;
  const {languageData} = await getResourceData(lang);
  const apiRequests = await getApiRequests(memberId);
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [memberResponse] = apiRequests.requiredRequests;
  const member = memberResponse.data.items?.[0] || null;
  if (!member) return null;
  const baseLink = getBaseLink(`community/detail/${memberId}/`, lang);
  const tabList = [
    {
      href: baseLink,
      label: "Genel",
    },
    {
      href: `${baseLink}investments`,
      label: "Üye Yatırımları",
    },
  ];
  if (member.type === "Organization") {
    tabList.push({
      href: `${baseLink}files`,
      label: "Üye Dosyaları",
    });
  }

  return <TabLayout tabList={tabList}>{children}</TabLayout>;
}
