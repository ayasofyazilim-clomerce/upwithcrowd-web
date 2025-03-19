import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";
import {getBaseLink} from "@/utils/lib";

export const metadata = {
  title: "CrowdFund - Profiles",
  description: "Empowering ideas through crowdfunding",
};

export default function Layout({children, params}: {children: React.ReactNode; params: {lang: string}}) {
  const {lang} = params;
  const baseLink = getBaseLink("dashboard/", lang);
  return (
    <TabLayout
      classNames={{
        vertical: {
          tabs: "container mx-auto h-auto flex-col lg:flex-row",
          tabList: "min-w-60 bg-transparent gap-2 flex-row  max-w-full lg:max-w-60 lg:flex-col",
          tabTrigger:
            "rounded-full [&>a]:text-center lg:[&>a]:text-left items-center data-[state=active]:bg-muted shadow-none hover:text-black data-[state=active]:shadow-none",
        },
      }}
      orientation="vertical"
      tabList={[
        {
          href: baseLink,
          label: "Profil",
        },
        {
          href: `${baseLink}payments`,
          label: "Ödemelerim",
        },
        {
          href: `${baseLink}projects`,
          label: "Projelerim",
        },
        {
          href: `${baseLink}support`,
          label: "Taleplerim",
        },
      ]}>
      {children}
    </TabLayout>
  );
}
