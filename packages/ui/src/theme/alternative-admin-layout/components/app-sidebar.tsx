"use client";

import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail} from "@repo/ayasofyazilim-ui/atoms/sidebar";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import {NavItems} from "..";
import {NavMain} from "./navbar";

export function AppSidebar({
  image,
  navbarItems,
  activeRoutes,
}: {
  image: StaticImport;
  navbarItems: NavItems[];
  activeRoutes: string[] | null;
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
          style={{margin: "auto"}}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain activeRoutes={activeRoutes} navbarItems={navbarItems} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
