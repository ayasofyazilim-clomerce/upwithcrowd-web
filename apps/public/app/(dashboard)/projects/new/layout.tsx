import { TabLayout } from "@repo/ayasofyazilim-ui/templates/tab-layout";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TabLayout
      classNames={{
        horizontal: {
          // tabs: "overflow-auto h-[calc(100dvh-6rem)]",
          tabList: "bg-red-200 sticky top-0",
        },
      }}
      tabList={[
        {
          href: "basics",
          label: "Basics",
        },
        {
          href: "funding",
          label: "Funding",
        },
        {
          href: "people",
          label: "People",
        },
        {
          href: "blocks",
          label: "Blocks",
        },
        {
          href: "payment",
          label: "Payment",
        },
      ]}
    >
      {children}
    </TabLayout>
  );
}
