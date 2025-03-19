import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";
import {getBaseLink} from "@/utils/lib";

export default function Layout({children, params}: {children: React.ReactNode; params: {id: string; lang: string}}) {
  const {lang, id} = params;
  const baseLink = getBaseLink("projects/", lang);
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
            href: `${baseLink}${id}/basics/?type=Project`,
            label: "Temel Bilgiler",
            disabled: false,
          },

          {
            href: `${baseLink}${id}/about`,
            label: "Hakkımızda",
            disabled: false,
          },
          {
            href: `${baseLink}${id}/funding`,
            label: "Fonlama Bilgilerim",
            disabled: false,
          },
          {
            href: `${baseLink}${id}/documents`,
            label: "Belge, Ödül, Hukuki Durum",
            disabled: false,
          },
          {
            href: `${baseLink}${id}/information-form`,
            label: "Bilgi Formu",
            disabled: false,
          },
          {
            href: `${baseLink}${id}/images`,
            label: "Görseller",
            disabled: false,
          },
          {
            href: `${baseLink}${id}/finish-project`,
            label: "Bitir",
            disabled: false,
          },
        ]}>
        {children}
      </TabLayout>
    </div>
  );
}
