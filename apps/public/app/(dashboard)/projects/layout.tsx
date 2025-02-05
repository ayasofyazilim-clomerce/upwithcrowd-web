import { TabLayout } from "@repo/ayasofyazilim-ui/templates/tab-layout";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TabLayout
      classNames={{
        horizontal: {
          tabs: "h-auto overflow-visible",
          tabList:
            "w-full bg-white shadow border-t p-0 sticky top-0 rounded-none h-16 justify-start md:justify-center z-50",
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
          href: "/projects/new/funding",
          label: "Funding",
        },
        {
          href: "/projects/new/story",
          label: "Story",
        },
        {
          href: "/projects/new/people",
          label: "People",
        },
        {
          href: "/projects/new/blocks",
          label: "Blocks",
        },
        {
          href: "/projects/new/payment",
          label: "Payment",
        },
      ]}
    >
      {children}
    </TabLayout>
  );
}
