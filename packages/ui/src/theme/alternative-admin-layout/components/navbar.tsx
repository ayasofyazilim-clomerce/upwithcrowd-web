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
import {NavItems} from "..";

function Tree({navItem, activeRoutes}: {navItem: NavItems; activeRoutes: string[] | null}) {
  const routes = activeRoutes ? [...activeRoutes] : null;
  const currentRoute = routes?.[0] === navItem.title ? routes?.shift() : null;
  if (!navItem.items?.length) {
    return (
      <SidebarMenuButton isActive={currentRoute === navItem.title} asChild>
        <a href={navItem.url} className={currentRoute === navItem.title ? "font-normal text-blue-600" : ""}>
          {navItem.icon && <navItem.icon />}
          {navItem.title}
        </a>
      </SidebarMenuButton>
    );
  }
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
            <ChevronRight className="ml-auto transition-transform" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="mr-0 pr-0">
            {navItem.items.map((subItem, index) => (
              <Tree key={index} navItem={subItem} activeRoutes={routes} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
export function NavMain({activeRoutes, navbarItems}: {navbarItems: NavItems[]; activeRoutes: string[] | null}) {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="text-muted-foreground">Upwithcrowd</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navbarItems.map((item, index) => (
              <Tree key={index} navItem={item} activeRoutes={activeRoutes} />
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
