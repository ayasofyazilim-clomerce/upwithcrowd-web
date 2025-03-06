"use client";

import {SidebarInset, SidebarProvider} from "@repo/ayasofyazilim-ui/atoms/sidebar";
import {ThemeProvider} from "../../providers/theme";

import {
  Ban,
  BriefcaseBusiness,
  Building2,
  ChartPie,
  CircleDot,
  CircleX,
  Crown,
  File,
  GalleryVerticalEnd,
  Gauge,
  HandCoins,
  Landmark,
  LaptopMinimal,
  LucideIcon,
  Megaphone,
  MessageCircleQuestionIcon,
  PersonStanding,
  Rabbit,
  Radio,
  Settings,
  User,
  Users,
} from "lucide-react";
import {usePathname} from "next/navigation";
import {AppSidebar} from "./components/app-sidebar";
import HeaderSection from "./components/header-section";

export type NavItems = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  items?: NavItems[];
};

const newNavbarItems: NavItems[] = [
  {title: "Kontrol Paneli", icon: Gauge, url: "/home"},
  {
    title: "Projeler",
    icon: Crown,
    items: [
      {title: "Bekleyen Projeler", icon: Megaphone, url: "/projects/pending"},
      {
        title: "Paya Dayalı",
        icon: ChartPie,
        items: [
          {title: "Aktif Projeler", icon: Radio, url: "/projects/shre/pa"},
          {title: "Başarılı Projeler", icon: LaptopMinimal, url: "/projects/shre/ps"},
          {title: "Başarısız Projeler", icon: CircleX, url: "/projects/shre/pf"},
          // {title: "Taslak Projeler", icon: CircleDot, url: "/projects/shre/pd"},
          {title: "İptal Projeler", icon: Ban, url: "/projects/shre/pc"},
        ],
      },
      {
        title: "Borca Dayalı",
        icon: HandCoins,
        items: [
          {title: "Aktif Projeler", icon: Radio, url: "/projects/dbit/pa"},
          {title: "Başarılı Projeler", icon: LaptopMinimal, url: "/projects/dbit/ps"},
          {title: "Başarısız Projeler", icon: CircleX, url: "/projects/dbit/pf"},
          // {title: "Taslak Projeler", icon: CircleDot, url: "/projects/dbit/pd"},
          {title: "İptal Projeler", icon: Ban, url: "/projects/dbit/pc"},
        ],
      },
      {
        title: "Tüm Projeler",
        icon: GalleryVerticalEnd,
        items: [
          {title: "Aktif Projeler", icon: Radio, url: "/projects/all/pa"},
          {title: "Başarılı Projeler", icon: LaptopMinimal, url: "/projects/all/ps"},
          {title: "Başarısız Projeler", icon: CircleX, url: "/projects/all/pf"},
          // {title: "Taslak Projeler", icon: CircleDot, url: "/projects/all/pd"},
          {title: "İptal Projeler", icon: Ban, url: "/projects/all/pc"},
        ],
      },
    ],
  },
  {
    title: "Topluluk",
    icon: Users,
    items: [
      {title: "Onay Bekleyenler", icon: Megaphone, url: "/community/organizations"},
      {
        title: "Yatırımcı",
        icon: Landmark,
        items: [
          {title: "Bireysel", icon: User, url: "/community/investor/individual"},
          {title: "Organizasyon", icon: Building2, url: "/community/investor/organization"},
        ],
      },
      {
        title: "Girişimci",
        icon: Rabbit,
        items: [
          {title: "Bireysel", icon: User, url: "/community/entrepreuner/individual"},
          {title: "Organizasyon", icon: Building2, url: "/community/entrepreuner/organization"},
        ],
      },
      {
        title: "Tümü",
        icon: GalleryVerticalEnd,
        items: [
          {title: "Bireysel", icon: User, url: "/community/all/individual"},
          {title: "Organizasyon", icon: Building2, url: "/community/all/organization"},
          {title: "Tümü", icon: Users, url: "/community/all/all"},
        ],
      },
    ],
  },
  {
    title: "Destek Merkezi",
    icon: MessageCircleQuestionIcon,
    items: [
      {
        title: "Destek Talepleri",
        icon: Landmark,
        url: "/support-center/support/all",
        // items: [
        //   // {title: "Girişimci", icon: Rabbit, url: "/support-center/support/investor"},
        //   // {title: "Yatırımcı", icon: Landmark, url: "/support-center/support/entrepreuner"},
        //   {title: "Tümü", icon: Users, url: "/support-center/support/all"},
        // ],
      },
      {
        title: "Sorular",
        icon: Rabbit,
        url: "/support-center/issue/all",
        // items: [
        //   // {title: "Girişimci", icon: Rabbit, url: "/support-center/issue/investor"},
        //   // {title: "Yatırımcı", icon: Landmark, url: "/support-center/issue/entrepreuner"},
        //   {title: "Tümü", icon: Users, url: "/support-center/issue/all"},
        // ],
      },
    ],
  },
  {title: "Dosyalar", icon: File, url: "/files"},
  {
    title: "Management",
    icon: Settings,
    items: [
      {
        title: "Identity",
        icon: PersonStanding,
        items: [
          {title: "Roles", url: "/management/identity/roles"},
          {title: "Users", url: "/management/identity/users"},
          {title: "Claim Types", url: "/management/identity/claim-types"},
          {title: "Security Logs", url: "/management/identity/security-logs"},
          {title: "Organization", url: "/management/identity/organization"},
        ],
      },
      {
        title: "Saas",
        icon: BriefcaseBusiness,
        items: [
          {title: "Editions", url: "/management/saas/editions"},
          {title: "Tenants", url: "/management/saas/tenants"},
        ],
      },
    ],
  },
];
function findParentTitles(navItems: NavItems[], targetUrl: string): string[] | null {
  for (const item of navItems) {
    if (item.url === targetUrl) {
      return [item.title];
    }

    if (item.items) {
      const result = findParentTitles(item.items, targetUrl);
      if (result) {
        return [item.title, ...result];
      }
    }
  }

  return null;
}
function AlternativeAdminLayout(props: any) {
  const pathName = usePathname().replace(`/${props.lang}`, "");
  const activeRoutes =
    findParentTitles(newNavbarItems, pathName) ||
    findParentTitles(newNavbarItems, pathName.substring(0, pathName.lastIndexOf("/")));
  return (
    <ThemeProvider
      appName={props.appName}
      logo={props.logo}
      baseURL={props.baseURL}
      navbarItems={props.navbarItems}
      profileMenu={props.profileMenu}
      prefix={props.prefix}
      lang={props.lang}
      notification={props.notification}
      tenantData={props.tenantData}>
      <SidebarProvider>
        <AppSidebar image={props.image} activeRoutes={activeRoutes} navbarItems={newNavbarItems} lang={props.lang} />
        <SidebarInset className="flex h-full flex-col  overflow-auto px-5">
          <div className="h-full pb-16">
            <HeaderSection activeRoutes={activeRoutes} />
            {props.children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default AlternativeAdminLayout;
