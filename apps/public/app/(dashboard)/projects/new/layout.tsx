import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";
export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <TabLayout
      classNames={{
        horizontal: {
          tabs: "h-auto overflow-visible",
          tabList:
            "w-full z-50 bg-white shadow border-t p-0 sticky top-0 rounded-none h-16 justify-start md:justify-center",
          tabContent: "m-0",
          tabTrigger:
            "data-[state=active]:text-primary h-full rounded-none data-[state=active]:shadow-none min-w-24 text-center data-[state=active]:font-bold",
        },
      }}
      tabList={[
        {
          href: "/projects/new",
          label: "Tips",
        },
        {
          href: "/projects/new/basics",
          label: "Basics",
        },
        {
          href: "funding",
          label: "Funding",
          disabled: true,
        },
        {
          href: "story",
          label: "Story",
          disabled: true,
        },
        {
          href: "people",
          label: "People",
          disabled: true,
        },
        {
          href: "blocks",
          label: "Blocks",
          disabled: true,
        },
        {
          href: "payment",
          label: "Payment",
          disabled: true,
        },
      ]}>
      {children}
    </TabLayout>
  );
}
