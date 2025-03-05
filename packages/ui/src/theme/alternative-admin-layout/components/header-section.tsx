"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@repo/ayasofyazilim-ui/atoms/breadcrumb";
import {SidebarTrigger} from "@repo/ayasofyazilim-ui/atoms/sidebar";

import {Fragment} from "react/jsx-runtime";

export function HeaderSection({activeRoutes}: {activeRoutes: string[] | null}) {
  return (
    <Breadcrumb className="my-4 flex flex-row flex-wrap gap-4">
      <SidebarTrigger className="-ml-1" />
      <BreadcrumbList>
        {activeRoutes?.map((route, index) => (
          <Fragment key={route}>
            <BreadcrumbItem>
              <BreadcrumbLink>{route}</BreadcrumbLink>
            </BreadcrumbItem>
            {activeRoutes.length - 1 !== index && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default HeaderSection;
