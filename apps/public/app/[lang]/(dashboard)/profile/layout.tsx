import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";
import {getBaseLink} from "@/utils/lib";

export const metadata = {
  title: "CrowdFund - Profiles",
  description: "Empowering ideas through crowdfunding",
};

export default function Layout({children, params}: {children: React.ReactNode; params: {lang: string}}) {
  const {lang} = params;
  const baseLink = getBaseLink("profile/", lang);
  return (
    <TabLayout
      classNames={{
        vertical: {
          tabs: "container mx-auto h-auto",
          tabList: "min-w-60 bg-transparent gap-2",
          tabTrigger:
            "rounded-full items-center data-[state=active]:bg-muted shadow-none hover:text-black data-[state=active]:shadow-none",
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
      ]}>
      {children}
    </TabLayout>
  );
}
