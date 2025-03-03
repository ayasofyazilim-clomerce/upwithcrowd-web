"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@repo/ayasofyazilim-ui/atoms/sidebar";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { NavItems } from "..";
import { NavMain } from "./navbar";
import { useTheme } from "../../../providers/theme";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ayasofyazilim-ui/atoms/avatar";
import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ayasofyazilim-ui/atoms/dropdown-menu";
import { Notification } from "../../../components/notification";

export function AppSidebar({
  image,
  navbarItems,
  activeRoutes,
  lang,
}: {
  image: StaticImport;
  navbarItems: NavItems[];
  activeRoutes: string[] | null;
  lang: string;
}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Image
          alt="Crowdfunding illustration"
          className="object-cover"
          height={75}
          src={image}
          width={75}
          style={{ margin: "auto" }}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain activeRoutes={activeRoutes} navbarItems={navbarItems} lang={lang} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}





export function NavUser() {
  const { profileMenu, notification } = useTheme();
  const { isMobile } = useSidebar()
  if (!profileMenu) return null
  return (
    <SidebarMenu>
      <SidebarTrigger className="[&>svg]:w-4 absolute -right-4 w-8 h-8 rounded-full bg-white border top-1/2 z-10" />
      <SidebarMenuItem className="flex items-center gap-2 group-data-[collapsible=icon]:flex-col-reverse">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
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
            sideOffset={4}
          >
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
              <DropdownMenuItem>
                <BadgeCheck className="w-4 mr-2" />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 hover:!text-red-600 hover:!cursor-pointer" onClick={() => {
              if (profileMenu.menu.secondary && profileMenu.menu.secondary.length > 0 && profileMenu.menu.secondary[0].onClick) {
                profileMenu.menu.secondary[0].onClick()
              }
            }}>
              <LogOut className="w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {notification && <Notification appId={notification.appId} appUrl={notification.appUrl} subscriberId={notification.subscriberId} langugageData={notification.langugageData} />}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
