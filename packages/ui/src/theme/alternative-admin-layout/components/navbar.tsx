"use client";

import {ChevronRight} from "lucide-react";

import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@repo/ayasofyazilim-ui/atoms/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@repo/ayasofyazilim-ui/atoms/sidebar";
import {Badge} from "@repo/ayasofyazilim-ui/atoms/badge";
import {NavItems, type NavbarBadges} from "..";
import Link from "next/link";

function Tree({
  navItem,
  activeRoutes,
  menuBadges,
  lang,
}: {
  navItem: NavItems;
  activeRoutes: string[] | null;
  menuBadges: NavbarBadges;
  lang: string;
}) {
  const routes = activeRoutes ? [...activeRoutes] : null;
  const currentRoute = routes?.[0] === navItem.title ? routes?.shift() : null;

  if (!navItem.items?.length) {
    return (
      <SidebarMenuButton isActive={currentRoute === navItem.title} asChild>
        <Link
          href={`/${lang}${navItem.url}`}
          className={currentRoute === navItem.title ? "font-normal text-blue-600" : ""}>
          {navItem.icon && <navItem.icon />}
          {navItem.title}
          {navItem?.id && navItem.id in menuBadges && (
            <div className="ml-auto">
              <Badge className="rounded-full border-0 bg-blue-600  py-0 text-xs text-white" variant="outline">
                {menuBadges[navItem.id]}
              </Badge>
            </div>
          )}
        </Link>
      </SidebarMenuButton>
    );
  }
  const badgeCounts = navItem.items.reduce(
    (acc, item) => acc + (item?.id && item.id in menuBadges ? menuBadges[item.id] : 0),
    0,
  );
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:last-child]:rotate-90"
        defaultOpen={currentRoute === navItem.title}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className={currentRoute === navItem.title ? "font-normal text-blue-600" : ""}
            isActive={currentRoute === navItem.title}>
            {navItem.icon && <navItem.icon />}
            {navItem.title}
            <div className="ml-auto flex flex-row items-center">
              {badgeCounts > 0 && (
                <Badge className="rounded-full border-0 bg-blue-600 py-0 text-xs text-white" variant="outline">
                  {badgeCounts}
                </Badge>
              )}
              <ChevronRight className="transition-transform" />
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="mr-0 pr-0">
            {navItem.items.map((subItem, index) => (
              <Tree key={index} navItem={subItem} activeRoutes={routes} lang={lang} menuBadges={menuBadges} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
export function NavMain({
  activeRoutes,
  navbarItems,
  lang,
  menuBadges,
}: {
  navbarItems: NavItems[];
  activeRoutes: string[] | null;
  lang: string;
  menuBadges: NavbarBadges;
}) {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="text-muted-foreground">Upwithcrowd</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navbarItems.map((item, index) => (
              <Tree key={index} navItem={item} activeRoutes={activeRoutes} lang={lang} menuBadges={menuBadges} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      {/* <SidebarGroup>
        <SidebarGroupLabel className="text-muted-foreground">Quick Links</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {/* {data.changes.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton>
                  <Folder />
                  {item.file}
                </SidebarMenuButton>
                <SidebarMenuBadge>{item.state}</SidebarMenuBadge>
              </SidebarMenuItem>
            ))} 
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup> */}
    </>
  );
}
