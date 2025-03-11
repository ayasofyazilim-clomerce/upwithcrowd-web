"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@repo/ayasofyazilim-ui/atoms/sidebar";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import {NavItems, type NavbarBadges} from "..";
import {NavMain} from "./navbar";
import {useTheme} from "../../../providers/theme";
import {Avatar, AvatarFallback, AvatarImage} from "@repo/ayasofyazilim-ui/atoms/avatar";
import {BadgeCheck, ChevronsUpDown, LogOut} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ayasofyazilim-ui/atoms/dropdown-menu";
import {Notification} from "../../../components/notification";
import Link from "next/link";

export function AppSidebar({
  image,
  navbarItems,
  activeRoutes,
  lang,
  navbarBadges,
}: {
  image: StaticImport;
  navbarItems: NavItems[];
  activeRoutes: string[] | null;
  lang: string;
  navbarBadges: NavbarBadges;
}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href={`/${lang}/home`}>
          <Image
            alt="Crowdfunding illustration"
            className="object-cover"
            height={75}
            src={image}
            width={75}
            style={{margin: "auto"}}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain activeRoutes={activeRoutes} navbarItems={navbarItems} lang={lang} navbarBadges={navbarBadges} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

export function NavUser() {
  const {profileMenu, notification} = useTheme();
  const {isMobile} = useSidebar();
  if (!profileMenu) return null;
  return (
    <SidebarMenu>
      <SidebarTrigger className="absolute -right-4 top-1/2 z-10 h-8 w-8 rounded-full border bg-white [&>svg]:w-4" />
      <SidebarMenuItem className="flex items-center gap-2 group-data-[collapsible=icon]:flex-col-reverse">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={profileMenu.info.image} alt={profileMenu.info.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{profileMenu.info.name}</span>
                <span className="truncate text-xs">{profileMenu.info.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={profileMenu.info.image} alt={profileMenu.info.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{profileMenu.info.name}</span>
                  <span className="truncate text-xs">{profileMenu.info.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {profileMenu.menu.account.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link href={item.href || ""}>
                    {item.icon}
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 hover:!cursor-pointer hover:!text-red-600"
              onClick={() => {
                if (
                  profileMenu.menu.secondary &&
                  profileMenu.menu.secondary.length > 0 &&
                  profileMenu.menu.secondary[0].onClick
                ) {
                  profileMenu.menu.secondary[0].onClick();
                }
              }}>
              <LogOut className="mr-2 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {notification && (
          <Notification
            appId={notification.appId}
            appUrl={notification.appUrl}
            subscriberId={notification.subscriberId}
            langugageData={notification.langugageData}
          />
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
