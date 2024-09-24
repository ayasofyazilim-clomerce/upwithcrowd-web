export type NavbarItemsFromDB = {
  key: string;
  parentNavbarItemKey: string | null;
  displayName: string;
  description: string;
  href: string | null;
  icon: string;
  displayOrder: number;
};
export type BreadcrumbItemType = NavbarItemsFromDB & {
  subNavbarItems: NavbarItemsFromDB[];
};

export type NavbarItemType = NavbarItemsFromDB & {
  subNavbarItems: NavbarItemType[] | null;
};
type ProfileMenuLink = { name: string; icon: JSX.Element } & (
  | { onClick: () => void; href: undefined }
  | { href: string; onClick: undefined }
);

export type ProfileMenuProps = {
  info: {
    name: string;
    email: string;
    image: string;
  };
  menu: {
    account: ProfileMenuLink[];
    primary: ProfileMenuLink[];
    secondary: ProfileMenuLink[];
  };
  menuTitle: string;
};
