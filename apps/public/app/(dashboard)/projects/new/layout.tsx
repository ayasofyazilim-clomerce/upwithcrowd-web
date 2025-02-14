import TabLayout from "./_components/tab-layout-new";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    // <TabLayout
    //   classNames={{
    //     vertical: {
    //       tabs: "h-screen rounded-none bg-white",
    //       tabList: "w-full shadow-lg rounded-none bg-gray-50/50 backdrop-blur-sm sticky top-0 overflow-hidden",
    //       tabContent: "m-0 pb-8",
    //       tabTrigger:
    //         "data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm min-w-24 text-center data-[state=active]:font-semibold transition-all duration-200 gap-2",
    //     },
    //   }}
    //   orientation="vertical"
    //   tabList={[
    //     {label: "Proje Başlat", href: "/projects/new"},
    //     {label: "Proje Detayları", href: "/projects/new/basics", disabled: true},
    //     {label: "Hakkımızda", href: "about", disabled: true},
    //     {label: "Fonlama Bilgilerim", href: "funding", disabled: true},
    //     {label: "Dökümanlar", href: "documents", disabled: true},
    //     {label: "Görseller", href: "images", disabled: true},
    //     {label: "S.S.S.", href: "faq", disabled: true},
    //     {label: "Şartlar ve Koşullar", href: "terms-conditions", disabled: true},
    //     {label: "Bitir", href: "finish-project", disabled: true},
    //   ]}>
     
    // </TabLayout>
    <div className="bg-muted mb-10 h-screen w-full overflow-auto pb-10">{children}</div>
  );
}
