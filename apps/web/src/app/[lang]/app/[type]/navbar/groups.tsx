import type { NavbarItemsFromDB } from "@repo/ui/theme/types";

export const dashboard: NavbarItemsFromDB[] = [
  {
    key: "dashboard",
    displayName: "Dashboard",
    description: "View and manage your dashboard settings.",
    href: "dashboard/openiddict/applications",
    icon: "dashboard",
    parentNavbarItemKey: "/",
    displayOrder: 1,
  },
  {
    key: "dashboard/openiddict",
    displayName: "Open Id Dict",
    description: "Manage Open ID dict settings.",
    href: "dashboard/openiddict/applications",
    icon: "id",
    parentNavbarItemKey: "dashboard",
    displayOrder: 1,
  },
  {
    key: "dashboard/openiddict/applications",
    displayName: "Applications",
    description: "Manage applications within Open Id Dict.",
    href: "dashboard/openiddict/applications",
    icon: "app",
    parentNavbarItemKey: "dashboard/openiddict",
    displayOrder: 1,
  },
  {
    key: "dashboard/openiddict/scopes",
    displayName: "Scopes",
    description: "View and manage scopes for Open Id Dict.",
    href: "dashboard/openiddict/scopes",
    icon: "scope",
    parentNavbarItemKey: "dashboard/openiddict",
    displayOrder: 1,
  },
  {
    key: "dashboard/admin",
    displayName: "Admin Management",
    description: "Access administrative tools and settings.",
    href: "dashboard/admin/languages",
    icon: "management",
    parentNavbarItemKey: "dashboard",
    displayOrder: 1,
  },
  {
    key: "dashboard/admin/languages",
    displayName: "Languages",
    description: "Manage language settings and translations.",
    href: "dashboard/admin/languages",
    icon: "language",
    parentNavbarItemKey: "dashboard/admin",
    displayOrder: 1,
  },
  {
    key: "dashboard/admin/language-texts",
    displayName: "Language Texts",
    description: "Edit and review language texts.",
    href: "dashboard/admin/language-texts",
    icon: "book",
    parentNavbarItemKey: "dashboard/admin",
    displayOrder: 1,
  },
  {
    key: "dashboard/saas",
    displayName: "Saas Management",
    description: "Manage SaaS configurations and settings.",
    href: "dashboard/saas/edition",
    icon: "management",
    parentNavbarItemKey: "dashboard",
    displayOrder: 1,
  },
  {
    key: "dashboard/saas/edition",
    displayName: "Edition",
    description: "Manage SaaS editions and plans.",
    href: "dashboard/saas/edition",
    icon: "edition",
    parentNavbarItemKey: "dashboard/saas",
    displayOrder: 1,
  },
  {
    key: "dashboard/saas/tenant",
    displayName: "Tenant",
    description: "Manage SaaS tenant settings and configurations.",
    href: "dashboard/saas/tenant",
    icon: "globe",
    parentNavbarItemKey: "dashboard/saas",
    displayOrder: 1,
  },
  {
    key: "dashboard/identity",
    displayName: "Identity Management",
    description: "Manage user identities and roles.",
    href: "dashboard/identity/role",
    icon: "management",
    parentNavbarItemKey: "dashboard",
    displayOrder: 1,
  },
  {
    key: "dashboard/identity/role",
    displayName: "Role",
    description: "Manage user roles and permissions.",
    href: "dashboard/identity/role",
    icon: "role",
    parentNavbarItemKey: "dashboard/identity",
    displayOrder: 1,
  },
  {
    key: "dashboard/identity/user",
    displayName: "User",
    description: "Manage user accounts and profiles.",
    href: "dashboard/identity/user",
    icon: "identity",
    parentNavbarItemKey: "dashboard/identity",
    displayOrder: 1,
  },
  {
    key: "dashboard/identity/claim-type",
    displayName: "Claim Type",
    description: "Manage claim types for user identities.",
    href: "dashboard/identity/claim-type",
    icon: "scan",
    parentNavbarItemKey: "dashboard/identity",
    displayOrder: 1,
  },
  {
    key: "dashboard/identity/security-logs",
    displayName: "Security Logs",
    description: "View security logs and audit trails.",
    href: "dashboard/identity/security-logs",
    icon: "lock",
    parentNavbarItemKey: "dashboard/identity",
    displayOrder: 1,
  },
  {
    key: "dashboard/identity/organization",
    displayName: "Organization",
    description: "Manage organizational settings and structure.",
    href: "dashboard/identity/organization",
    icon: "building",
    parentNavbarItemKey: "dashboard/identity",
    displayOrder: 1,
  },
  {
    key: "dashboard/audit-logs/audit-logs",
    displayName: "Audit Logs",
    description: "View and analyze audit logs.",
    href: "dashboard/audit-logs/audit-logs",
    icon: "log",
    parentNavbarItemKey: "dashboard",
    displayOrder: 1,
  },
  {
    key: "dashboard/text-templates/text-templates",
    displayName: "Text Templates",
    description: "Manage and create text templates.",
    href: "dashboard/text-templates/text-templates",
    icon: "text",
    parentNavbarItemKey: "dashboard",
    displayOrder: 1,
  },
];
export const management: NavbarItemsFromDB[] = [
  {
    key: "management",
    displayName: "Management",
    description: "Access management settings and tools.",
    href: "management/setting/vats",
    icon: "management",
    parentNavbarItemKey: "/",
    displayOrder: 1,
  },
  {
    key: "management/setting",
    displayName: "VAT Settings",
    description: "Configure VAT settings and rules.",
    href: "management/setting/vats",
    icon: "settings",
    parentNavbarItemKey: "management",
    displayOrder: 1,
  },
  {
    key: "management/setting/vats",
    displayName: "VAT",
    description: "Manage VAT settings and rates.",
    href: "management/setting/vats",
    icon: "vat",
    parentNavbarItemKey: "management/setting",
    displayOrder: 1,
  },
  {
    key: "management/setting/product-groups",
    displayName: "Product Group",
    description: "Manage product groups and categories.",
    href: "management/setting/product-groups",
    icon: "product",
    parentNavbarItemKey: "management/setting",
    displayOrder: 1,
  },
  {
    key: "management/setting/product-groups-vats",
    displayName: "Product Group VAT",
    description: "Manage VAT settings for product groups.",
    href: "management/setting/product-groups-vats",
    icon: "productGroup",
    parentNavbarItemKey: "management/setting",
    displayOrder: 1,
  },
  {
    key: "management/tenant-settings",
    displayName: "Tenant Settings",
    description: "Manage settings for tenants.",
    href: "management/tenant-settings",
    icon: "settings",
    parentNavbarItemKey: "management",
    displayOrder: 1,
  },
];

export const crm: NavbarItemsFromDB[] = [
  {
    key: "crm",
    displayName: "CRM",
    description: "Manage customer relationship management settings.",
    href: "crm/merchants",
    icon: "layer",
    parentNavbarItemKey: "/",
    displayOrder: 1,
  },
  {
    key: "crm/merchants",
    displayName: "Merchants",
    description: "Manage merchant accounts and details.",
    href: "crm/merchants",
    icon: "shop",
    parentNavbarItemKey: "crm",
    displayOrder: 1,
  },
  {
    key: "crm/refund-points",
    displayName: "Refund Points",
    description: "Manage refund points and settings.",
    href: "crm/refund-points",
    icon: "refund",
    parentNavbarItemKey: "crm",
    displayOrder: 1,
  },
  {
    key: "crm/customs",
    displayName: "Customs",
    description: "Manage customs settings and configurations.",
    href: "crm/customs",
    icon: "container",
    parentNavbarItemKey: "crm",
    displayOrder: 1,
  },
  {
    key: "crm/tax-free",
    displayName: "Tax Free",
    description: "Manage tax-free settings and exemptions.",
    href: "crm/tax-free",
    icon: "tax",
    parentNavbarItemKey: "crm",
    displayOrder: 1,
  },
  {
    key: "crm/tax-offices",
    displayName: "Tax Offices",
    description: "Manage tax office details and settings.",
    href: "crm/tax-offices",
    icon: "taxOffice",
    parentNavbarItemKey: "crm",
    displayOrder: 1,
  },
];

export const contracts: NavbarItemsFromDB[] = [
  {
    key: "contracts/contracts",
    displayName: "Contracts",
    description: "View and manage contract details.",
    href: "contracts/contracts",
    icon: "dashboard",
    parentNavbarItemKey: "contracts",
    displayOrder: 1,
  },
  {
    key: "contracts/rebate",
    displayName: "Rebate",
    description: "Manage rebate settings and configurations.",
    href: "contracts/rebate/company-settings",
    icon: "percent",
    parentNavbarItemKey: "contracts",
    displayOrder: 1,
  },
  {
    key: "contracts/rebate/company-settings",
    displayName: "Company Settings",
    description: "Manage company-specific rebate settings.",
    href: "contracts/rebate/company-settings",
    icon: "settings",
    parentNavbarItemKey: "contracts/rebate",
    displayOrder: 1,
  },
  {
    key: "contracts/rebate/templates",
    displayName: "Templates",
    description: "Manage rebate templates and configurations.",
    href: "contracts/rebate/templates",
    icon: "template",
    parentNavbarItemKey: "contracts/rebate",
    displayOrder: 1,
  },
  {
    key: "contracts/refund",
    displayName: "Refund",
    description: "Manage refund settings and details.",
    href: "contracts/refund/refund-tables",
    icon: "refund",
    parentNavbarItemKey: "contracts",
    displayOrder: 1,
  },
  {
    key: "contracts/refund/refund-tables",
    displayName: "Refund Tables",
    description: "Manage refund tables and configurations.",
    href: "contracts/refund/refund-tables",
    icon: "table",
    parentNavbarItemKey: "contracts/refund",
    displayOrder: 1,
  },
  {
    key: "contracts/refund/refund-fees",
    displayName: "Refund Fees",
    description: "Manage refund fees and settings.",
    href: "contracts/refund/refund-fees",
    icon: "refund",
    parentNavbarItemKey: "contracts/refund",
    displayOrder: 1,
  },
];
