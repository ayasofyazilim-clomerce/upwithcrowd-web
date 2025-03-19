"use client";

import type {VariantProps} from "class-variance-authority";
import {cva} from "class-variance-authority";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import type {ComponentType, ReactNode} from "react";
import {Suspense} from "react";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import {FileText, Users, Wallet, FileCheck, Image, HelpCircle, Shield, CheckSquare} from "lucide-react";

const defaultIcons: Record<string, ComponentType<{className?: string}>> = {
  basics: FileText,
  about: Users,
  funding: Wallet,
  documents: FileCheck,
  images: Image,
  faq: HelpCircle,
  "terms-conditions": Shield,
  "finish-project": CheckSquare,
};

// Yardımcı fonksiyon: URL'den son kısmı alıp icon'u döndürür
const getIconForPath = (path: string) => {
  const lastSegment = path.split("/").pop();
  return defaultIcons[lastSegment || ""];
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
const defaultClassNames = {
  vertical: {
    tabs: "flex h-full",
    tabList: "flex flex-col h-full justify-start max-w-sm overflow-hidden",
    tabTrigger: "justify-start max-w-lg overflow-hidden w-full",
    tabContent: "mx-2 my-0 w-full h-full overflow-auto flex-1",
  },
  horizontal: {
    tabs: "flex h-full overflow-hidden flex-col",
    tabList: "w-full mx:w-max overflow-x-auto overflow-y-hidden min-h-max",
    tabTrigger: "min-w-max",
    tabContent: "h-full my-2 overflow-auto",
  },
};

// Updated container styling with refined background and shadow
const tabsVariants = cva("bg-white/95 backdrop-blur-sm shadow-lg rounded-lg", {
  variants: {
    variant: {
      default: "",
      simple: "",
    },
    orientation: {
      horizontal: "flex h-full overflow-hidden flex-col",
      vertical: "flex h-full",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    variant: "simple",
  },
});

const tabListVariants = cva("border-r border-gray-200 ", {
  variants: {
    variant: {
      default: "inline-flex h-9 items-center justify-center bg-muted p-1 text-muted-foreground",
      simple: "flex flex-col gap-1 p-2",
    },
    orientation: {
      horizontal: "w-max mx:w-max overflow-x-auto overflow-y-hidden min-h-max border-b border-r-0",
      vertical: "flex flex-col h-full justify-start max-w-[200px] w-full overflow-hidden sticky top-0",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    variant: "simple",
  },
});

// Updated active/inactive tab item styling
const tabTriggerVariants = cva(
  "inline-flex items-center justify-center text-left whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "px-4 py-2 hover:bg-gray-50 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold",
        simple:
          "px-4 py-2.5 hover:bg-gray-50 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold",
      },
      orientation: {
        horizontal: "",
        vertical: "justify-start w-full text-gray-600",
      },
    },
    defaultVariants: {
      orientation: "vertical",
      variant: "simple",
    },
  },
);

const tabContentVariants = cva("", {
  variants: {
    variant: {
      default: "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
      simple: "",
    },
    orientation: {
      horizontal: "h-full my-2 overflow-auto",
      vertical: "mx-2 my-0 w-full h-full flex-1 ",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    variant: "simple",
  },
});

function findActiveTab(tabList: {href: string}[], path: string) {
  const indexOfActiveTab = path
    .split("/")
    .reverse()
    .findIndex((_, index) => {
      if (index === 0) {
        return tabList.find((i) => i.href === path);
      }
      const link = path.split("/").slice(0, -index).join("/");
      return tabList.find((i) => i.href === link);
    });
  if (indexOfActiveTab === -1) {
    return undefined;
  }
  if (indexOfActiveTab === 0) {
    return tabList.find((i) => i.href === path)?.href;
  }
  return tabList.find((i) => i.href === path.split("/").slice(0, -indexOfActiveTab).join("/"))?.href;
}

export default function TabLayout({
  tabList,
  children,
  orientation = "vertical",
  classNames,
  variant = "simple",
}: {
  tabList: {
    label: string;
    href: string;
    icon?: ComponentType<{className?: string}>;
    fallback?: ReactNode;
    disabled?: boolean;
  }[];
  children: ReactNode;
  orientation?: "horizontal" | "vertical";
  classNames?: DeepPartial<typeof defaultClassNames>;
  variant?: VariantProps<typeof tabsVariants>["variant"];
}) {
  const tabsClassNames = tabsVariants({orientation, variant});
  const tabListClassNames = tabListVariants({orientation, variant});
  const tabTriggerClassNames = tabTriggerVariants({orientation, variant});
  const tabContentClassNames = tabContentVariants({orientation, variant});
  const path = usePathname();

  const searchParams = `?${useSearchParams().toString()}`;
  const active = findActiveTab(tabList, path) || findActiveTab(tabList, path + searchParams) || tabList[0].href;

  return (
    <div className={cn(tabsClassNames, classNames?.[orientation]?.tabs)} role="tabpanel">
      <div
        className={cn(tabListClassNames, classNames?.[orientation]?.tabList)}
        role="tablist"
        style={{
          scrollbarWidth: "thin",
        }}>
        {tabList.map((tab) => (
          <span
            className={cn(
              tabTriggerClassNames,
              classNames?.[orientation]?.tabTrigger,
              tab.disabled && "text-muted-foreground cursor-not-allowed",
            )}
            data-state={tab.href === active ? "active" : "inactive"}
            key={tab.href}
            role="tab">
            {tab.disabled ? (
              <span className="flex w-full items-center gap-2 overflow-hidden text-start">
                {(() => {
                  const IconComponent = tab.icon || getIconForPath(tab.href);
                  return <IconComponent className="h-4 w-4 shrink-0" />;
                })()}
                {tab.label}
              </span>
            ) : (
              <Link className="flex w-full items-center gap-2 overflow-hidden text-start" href={tab.href}>
                {(() => {
                  const IconComponent = tab.icon || getIconForPath(tab.href);
                  return <IconComponent className="h-4 w-4 shrink-0" />;
                })()}
                {tab.label}
              </Link>
            )}
          </span>
        ))}
      </div>
      <div className={cn(tabContentClassNames, classNames?.[orientation]?.tabContent)}>
        <Suspense fallback={<Skeleton className="size-full flex-1" />}>{children}</Suspense>
      </div>
    </div>
  );
}
