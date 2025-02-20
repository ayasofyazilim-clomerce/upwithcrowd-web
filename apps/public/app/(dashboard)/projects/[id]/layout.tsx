import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";

export default function Layout({children, params}: {children: React.ReactNode; params: {id: string}}) {
  const {id} = params;
  return (
    <div className="bg-muted h-full ">
      <TabLayout
        classNames={{
          vertical: {
            tabs: "container mx-auto h-auto ",
            tabList: "min-w-60 bg-transparent gap-2 pt-9",
            tabTrigger:
              "rounded-md items-center data-[state=active]:bg-white data-[state=active]:shadow-md hover:text-black shadow-none",
          },
        }}
        orientation="vertical"
        tabList={[
          {
            href: `/projects/${id}/basics/?type=project`,
            label: "Temel Bilgiler",
            disabled: false,
          },

          {
            href: `/projects/${id}/about`,
            label: "Hakkımızda",
            disabled: false,
          },
          {
            href: `/projects/${id}/funding`,
            label: "Fonlama Bilgilerim",
            disabled: false,
          },
          {
            href: `/projects/${id}/documents`,
            label: "Dökümanlar",
            disabled: false,
          },
          {
            href: `/projects/${id}/images`,
            label: "Görseller",
            disabled: false,
          },
          {
            href: `/projects/${id}/faq`,
            label: "S.S.S",
            disabled: false,
          },
          {
            href: `/projects/${id}/terms-conditions`,
            label: "Şartlar ve Koşullar",
            disabled: false,
          },
          {
            href: `/projects/${id}/finish-project`,
            label: "Bitir",
            disabled: false,
          },
        ]}>
        {children}
      </TabLayout>
    </div>
  );
}
