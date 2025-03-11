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
  navbarBadges,
  lang,
}: {
  navItem: NavItems;
  activeRoutes: string[] | null;
  navbarBadges: NavbarBadges;
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
          {navItem?.id && navItem.id in navbarBadges && (
            <div className="ml-auto">
              <Badge
                className="w-7 min-w-7 max-w-7  justify-center rounded-full border-0  bg-blue-600 p-0 text-xs text-white"
                variant="outline">
                {navbarBadges[navItem.id]}
              </Badge>
            </div>
          )}
        </Link>
      </SidebarMenuButton>
    );
  }
  const badgeCounts = navItem.items.reduce(
    (acc, item) => acc + (item?.id && item.id in navbarBadges ? navbarBadges[item.id] : 0),
    0,
  );
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&>button>div>svg]:data-[state=open]:rotate-90"
        defaultOpen={currentRoute === navItem.title}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className={currentRoute === navItem.title ? "font-normal text-blue-600" : ""}
            isActive={currentRoute === navItem.title}>
            {navItem.icon && <navItem.icon />}
            {navItem.title}
            <div className="ml-auto flex flex-row items-center">
              {badgeCounts > 0 && (
                <Badge
                  className="w-7 min-w-7 max-w-7 justify-center rounded-full border-0 bg-blue-600  p-0 text-xs text-white"
                  variant="outline">
                  {badgeCounts}
                </Badge>
              )}
              <ChevronRight className="w-4 transition-transform" />
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="mr-0 pr-0">
            {navItem.items.map((subItem, index) => (
              <Tree key={index} navItem={subItem} activeRoutes={routes} lang={lang} navbarBadges={navbarBadges} />
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
  navbarBadges,
}: {
  navbarItems: NavItems[];
  activeRoutes: string[] | null;
  lang: string;
  navbarBadges: NavbarBadges;
}) {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="text-muted-foreground">Upwithcrowd</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navbarItems.map((item, index) => (
              <Tree key={index} navItem={item} activeRoutes={activeRoutes} lang={lang} navbarBadges={navbarBadges} />
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
