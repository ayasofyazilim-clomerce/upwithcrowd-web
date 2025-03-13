"use client";

import {SidebarInset, SidebarProvider} from "@repo/ayasofyazilim-ui/atoms/sidebar";
import {ThemeProvider} from "../../providers/theme";

import {
  Ban,
  BriefcaseBusiness,
  Building2,
  ChartPie,
  CircleX,
  Cloudy,
  Crown,
  File,
  FileBox,
  FileKey,
  FileStack,
  FileType,
  FileType2,
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

export type NavbarBadges = Record<string, number>;
export type NavItems = {
  id?: string;
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
      {title: "Tüm Projeler", icon: GalleryVerticalEnd, url: "/projects"},
      {title: "Bekleyen Projeler", icon: Megaphone, url: "/projects/pending", id: "pendingProjects"},
      {
        title: "Aktif Projeler",
        icon: Radio,
        items: [
          {title: "Tümü", icon: GalleryVerticalEnd, url: "/projects/approved"},
          {title: "Paya Dayalı", icon: ChartPie, url: "/projects/approved/shre"},
          {title: "Borca Dayalı", icon: HandCoins, url: "/projects/approved/dbit"},
        ],
      },
      {
        title: "Reddedilen Projeler",
        icon: CircleX,
        items: [
          {title: "Tümü", icon: GalleryVerticalEnd, url: "/projects/rejected"},
          {title: "Paya Dayalı", icon: ChartPie, url: "/projects/rejected/shre"},
          {title: "Borca Dayalı", icon: HandCoins, url: "/projects/rejected/dbit"},
        ],
      },
      {
        title: "İptal Edilen Projeler",
        icon: Ban,
        items: [
          {title: "Tümü", icon: GalleryVerticalEnd, url: "/projects/cancelled"},
          {title: "Paya Dayalı", icon: ChartPie, url: "/projects/cancelled/shre"},
          {title: "Borca Dayalı", icon: HandCoins, url: "/projects/cancelled/dbit"},
        ],
      },
    ],
  },
  {
    title: "Topluluk",
    icon: Users,
    items: [
      {title: "Tüm Üyeler", icon: GalleryVerticalEnd, url: "/community"},
      {
        title: "Bireysel Üyeler",
        icon: User,
        items: [
          {title: "Tümü", icon: GalleryVerticalEnd, url: "/community/individual"},
          {title: "Onay Bekleyenler", icon: Megaphone, url: "/community/individual/pending", id: "pendingIndividuals"},
        ],
      },
      {
        title: "Organizasyon",
        icon: Building2,
        items: [
          {title: "Tümü", icon: GalleryVerticalEnd, url: "/community/organization"},
          {
            title: "Onay Bekleyenler",
            icon: Megaphone,
            url: "/community/organization/pending",
            id: "pendingOrganizations",
          },
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
      },
      {
        title: "Sorular",
        icon: Rabbit,
        url: "/support-center/issue/all",
      },
    ],
  },
  {
    title: "Management",
    icon: Settings,
    items: [
      {
        title: "File",
        icon: File,
        items: [
          {icon: Cloudy, title: "Providers", url: "/management/file/providers"},
          {icon: FileType2, title: "Mime Types", url: "/management/file/mime-types"},
          {icon: FileType, title: "File Types", url: "/management/file/file-types"},
          {icon: FileBox, title: "File Type Mime Types", url: "/management/file/file-type-mime-types"},
          {icon: FileStack, title: "File Type Groups", url: "/management/file/file-type-groups"},
          {icon: FileKey, title: "File Relation Entities", url: "/management/file/file-relation-entities"},
        ],
      },
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
        <AppSidebar
          image={props.image}
          activeRoutes={activeRoutes}
          navbarItems={newNavbarItems}
          lang={props.lang}
          navbarBadges={props.navbarBadges}
        />
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
