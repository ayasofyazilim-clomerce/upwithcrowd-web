import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";

export const metadata = {
  title: "CrowdFund - Profiles",
  description: "Empowering ideas through crowdfunding",
};

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <TabLayout
      orientation="vertical"
      classNames={{
        vertical: {
          tabs: "container mx-auto h-auto",
          tabList: "min-w-60 bg-transparent gap-2",
          tabTrigger:
            "rounded-full items-center data-[state=active]:bg-muted shadow-none hover:text-black data-[state=active]:shadow-none",
        },
      }}
      tabList={[
        {
          href: "/profile",
          label: "Profil",
        },
        {
          href: "/profile/payments",
          label: "Ödemelerim",
        },
        {
          href: "/profile/projects",
          label: "Projelerim",
        },
      ]}>
      {children}
    </TabLayout>
  );
}
