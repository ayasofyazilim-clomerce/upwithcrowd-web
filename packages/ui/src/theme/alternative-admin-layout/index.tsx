"use client";

import {SidebarInset, SidebarProvider} from "@repo/ayasofyazilim-ui/atoms/sidebar";
import {ThemeProvider} from "../../providers/theme";

import {
  Ban,
  BriefcaseBusiness,
  ChartPie,
  CircleX,
  Crown,
  GalleryVerticalEnd,
  HandCoins,
  LaptopMinimal,
  LucideIcon,
  PersonStanding,
  Radio,
  Settings,
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
  {
    title: "Projeler",
    icon: Crown,
    items: [
      {
        title: "Paya Dayalı",
        icon: ChartPie,
        items: [
          {title: "Aktif Projeler", icon: Radio, url: "/projects/SHRE/PA"},
          {title: "Başarılı Projeler", icon: LaptopMinimal, url: "/projects/SHRE/PS"},
          {title: "Başarısız Projeler", icon: CircleX, url: "/projects/SHRE/PF"},
          {title: "İptal Projeler", icon: Ban, url: "/projects/SHRE/PC"},
        ],
      },
      {
        title: "Borca Dayalı",
        icon: HandCoins,
        items: [
          {title: "Aktif Projeler", icon: Radio, url: "/projects/DBIT/PA"},
          {title: "Başarılı Projeler", icon: LaptopMinimal, url: "/projects/DBIT/PS"},
          {title: "Başarısız Projeler", icon: CircleX, url: "/projects/DBIT/PF"},
          {title: "İptal Projeler", icon: Ban, url: "/projects/DBIT/PC"},
        ],
      },
      {
        title: "Tüm Projeler",
        icon: GalleryVerticalEnd,
        items: [
          {title: "Aktif Projeler", icon: Radio, url: "/projects/ALL/PA"},
          {title: "Başarılı Projeler", icon: LaptopMinimal, url: "/projects/ALL/PS"},
          {title: "Başarısız Projeler", icon: CircleX, url: "/projects/ALL/PF"},
          {title: "İptal Projeler", icon: Ban, url: "/projects/ALL/PC"},
        ],
      },
    ],
  },
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
  const activeRoutes = findParentTitles(newNavbarItems, pathName);
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
        <AppSidebar image={props.image} activeRoutes={activeRoutes} navbarItems={newNavbarItems} />
        <SidebarInset className="my-3 flex h-full flex-col overflow-hidden px-5">
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
