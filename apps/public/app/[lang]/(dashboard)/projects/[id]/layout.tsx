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
            tabs: "container mx-auto h-auto ",
            tabList: "min-w-60 bg-transparent gap-2 pt-9",
            tabTrigger:
              "rounded-md items-center data-[state=active]:bg-white data-[state=active]:shadow-md hover:text-black shadow-none",
          },
        }}
        orientation="vertical"
        tabList={[
          {
            href: `${baseLink}${id}/basics/?type=project`,
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
            label: "Dökümanlar",
            disabled: false,
          },
          {
            href: `${baseLink}${id}/images`,
            label: "Görseller",
            disabled: false,
          },
          {
            href: `${baseLink}${id}/faq`,
            label: "S.S.S",
            disabled: false,
          },
          {
            href: `${baseLink}${id}/terms-conditions`,
            label: "Şartlar ve Koşullar",
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
