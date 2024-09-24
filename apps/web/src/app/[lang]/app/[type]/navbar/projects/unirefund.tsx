import type { NavbarItemsFromDB } from "@repo/ui/theme/types";
import { contracts, crm, dashboard, management } from "../groups";

export const unirefundNavbarDataFromDB: NavbarItemsFromDB[] = [
  {
    key: "/",
    displayName: "Home",
    description: "Go back to the home page.",
    href: "home",
    icon: "home",
    parentNavbarItemKey: null,
    displayOrder: 1,
  },
  {
    key: "home",
    displayName: "Home",
    description: "Go back to the home page.",
    href: "/home",
    icon: "home",
    parentNavbarItemKey: "/",
    displayOrder: 1,
  },
  ...dashboard,
  ...management,
  ...crm,
  ...contracts,
  {
    key: "traveller",
    displayName: "Traveller",
    description: "Manage traveller-related settings.",
    href: "traveller",
    icon: "plane",
    parentNavbarItemKey: "/",
    displayOrder: 1,
  },
  {
    key: "operations",
    displayName: "Operations",
    description: "Access and manage operational settings.",
    href: "operations/details",
    icon: "operation",
    parentNavbarItemKey: "/",
    displayOrder: 1,
  },
  {
    key: "operations/details",
    displayName: "Tax Free Tags",
    description: "Manage tax-free tags and settings.",
    href: "operations/details",
    icon: "dashboard",
    parentNavbarItemKey: "operations",
    displayOrder: 1,
  },
];
