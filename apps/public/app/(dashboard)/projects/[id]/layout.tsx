import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";

export default function Layout({children, params}: {children: React.ReactNode; params: {id: string}}) {
  const {id} = params;
  return (
    <TabLayout
      classNames={{
        horizontal: {
          tabs: "h-auto overflow-visible",
          tabList: "w-full bg-white shadow border-t p-0 sticky top-0 rounded-none h-16 justify-start md:justify-center",
          tabContent: "m-0",
          tabTrigger:
            "data-[state=active]:text-primary h-full rounded-none data-[state=active]:shadow-none min-w-24 text-center data-[state=active]:font-bold",
        },
      }}
      tabList={[
        {
          href: `/projects/${id}/basics`,
          label: "Basics",
        },
        {
          href: `/projects/${id}/funding`,
          label: "Funding",
        },
        {
          href: `/projects/${id}/story`,
          label: "Story",
        },
        {
          href: `/projects/${id}/people`,
          label: "People",
        },
        {
          href: `/projects/${id}/blocks`,
          label: "Blocks",
        },
        {
          href: `/projects/${id}/payment`,
          label: "Payment",
        },
      ]}>
      {children}
    </TabLayout>
  );
}
