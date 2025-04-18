import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";
import {getBaseLink} from "@/utils/lib";

export default function Layout({children, params}: {children: React.ReactNode; params: {lang: string}}) {
  const {lang} = params;
  const baseLink = getBaseLink("dashboard", lang);
  return (
    <div className="bg-muted h-full ">
      <TabLayout
        classNames={{
          vertical: {
            tabs: "container mx-auto h-auto flex-col lg:flex-row overflow-hidden",
            tabList:
              "max-w-full bg-transparent gap-2 pt-9 flex-row overflow-x-auto lg:overflow-x-visible flex-nowrap lg:max-w-60 lg:flex-col",
            tabTrigger:
              "rounded-md items-center min-w-max data-[state=active]:bg-white data-[state=active]:shadow-md hover:text-black shadow-none",
          },
        }}
        orientation="vertical"
        tabList={[
          {
            href: `${baseLink}/projects/new`,
            label: "Proje Başlat",
            disabled: false,
          },
          {
            href: `${baseLink}/projects/new/basics?type=Project`,
            label: "Temel Bilgiler",
            disabled: false,
          },
          {
            href: `${baseLink}/projects/new/about`,
            label: "Hakkımızda",
            disabled: true,
          },
          {
            href: `${baseLink}/projects/new/funding`,
            label: "Fonlama Bilgilerim",
            disabled: true,
          },

          {
            href: `${baseLink}/projects/new/documents`,
            label: "Dökümanlar",
            disabled: true,
          },
          {
            href: `${baseLink}/projects/new/images`,
            label: "Görseller",
            disabled: true,
          },

          {
            href: `${baseLink}/projects/new/finish-project`,
            label: "Bitir",
            disabled: true,
          },
        ]}>
        {children}
      </TabLayout>
    </div>
  );
}
