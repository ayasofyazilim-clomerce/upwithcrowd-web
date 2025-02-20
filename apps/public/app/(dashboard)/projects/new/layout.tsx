import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";

export default function Layout({children}: {children: React.ReactNode}) {
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
            href: "/projects/new",
            label: "Proje Başlat",
            disabled: false,
          },
          {
            href: "/projects/new/basics/?type=project",
            label: "Temel Bilgiler",
            disabled: false,
          },
          {
            href: `/projects/new/about`,
            label: "Hakkımızda",
            disabled: true,
          },
          {
            href: `/projects/new/about`,
            label: "Fonlama Bilgilerim",
            disabled: true,
          },

          {
            href: `/projects/new/documents`,
            label: "Dökümanlar",
            disabled: true,
          },
          {
            href: `/projects/new/images`,
            label: "Görseller",
            disabled: true,
          },
          {
            href: `/projects/new/faq`,
            label: "S.S.S",
            disabled: true,
          },
          {
            href: `/projects/new/terms-conditions`,
            label: "Şartlar ve Koşullar",
            disabled: true,
          },
          {
            href: `/projects/new/finish-project`,
            label: "Bitir",
            disabled: true,
          },
        ]}>
        {children}
      </TabLayout>
    </div>
  );
}
