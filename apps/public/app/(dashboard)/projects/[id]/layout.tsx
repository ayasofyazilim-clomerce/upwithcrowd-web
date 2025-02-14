import {TabLayout} from "../new/_components/tab-layout-new";

export default function Layout({children, params}: {children: React.ReactNode; params: {id: string}}) {
  const {id} = params;
  return (
    <TabLayout
      classNames={{
        vertical: {
          tabs: "h-screen rounded-none bg-white/50 backdrop-blur-sm",
          tabList: "w-full shadow-lg rounded-none bg-gray-50/30 backdrop-blur-sm sticky top-0 overflow-hidden",
          tabContent: "m-0 pb-8",
          tabTrigger:
            "data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm min-w-24 text-center data-[state=active]:font-semibold transition-all duration-200 gap-2",
        },
      }}
      orientation="vertical"
      tabList={[
        {
          href: `/projects/${id}/basics`,
          label: "Proje Detayları",
        },
        {
          href: `/projects/${id}/about`,
          label: "Hakkımızda",
        },
        {
          href: `/projects/${id}/funding`,
          label: "Fonlama Bilgilerim",
        },
        {
          href: `/projects/${id}/documents`,
          label: "Dökümanlar",
        },
        {
          href: `/projects/${id}/images`,
          label: "Görseller",
        },
        {
          href: `/projects/${id}/faq`,
          label: "S.S.S.",
        },
        {
          href: `/projects/${id}/terms-conditions`,
          label: "Şartlar ve Koşullar",
        },
        {
          href: `/projects/${id}/finish-project`,
          label: "Bitir",
        },
      ]}>
      <div className="bg-muted mb-10 h-full w-full overflow-auto pb-10">{children}</div>
    </TabLayout>
  );
}
