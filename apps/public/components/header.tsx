"use client";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useSession} from "@repo/utils/auth";
import {Menu, PlusCircle, X} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useParams} from "next/navigation";
import {useState, useEffect} from "react";
import type {NotificationProps} from "@repo/ui/components/notification";
import {Notification} from "@repo/ui/components/notification";
import {getBaseLink} from "@/utils/lib";
import MemberSwitcher from "./member-switcher";

export default function Header({
  appName,
  notification,
}: {
  appName: string;
  notification?: NotificationProps | undefined;
}) {
  const pathName = usePathname();
  const {lang} = useParams<{lang: string}>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {session} = useSession();

  const PublicLinks = [
    {href: getBaseLink("", lang), label: "Home"},
    {href: getBaseLink("projects", lang), label: "Projects"},
    {href: getBaseLink("blogs", lang), label: "Blog"},
    {href: getBaseLink("about", lang), label: "About"},
    {href: getBaseLink("faq", lang), label: "FAQ"},
    {href: getBaseLink("contact", lang), label: "Contact"},
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-background relative flex h-24 p-0 md:px-6">
      <div className="container mx-auto flex items-center justify-between px-12 md:px-0">
        <Link className="flex shrink-0 items-center" href={getBaseLink("", lang)}>
          <Image alt="" height={60} src="/upwc.png" width={60} />
          <span className="text-primary hidden text-2xl font-bold md:flex">{appName}</span>
        </Link>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <nav className="mx-8">
            <ul className="flex space-x-8 text-lg">
              {PublicLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className={cn("text-foreground hover:text-primary", pathName === link.href && "text-primary")}
                    href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden shrink-0 md:flex">
          {session !== null ? (
            <div className="flex items-center space-x-6">
              <Link className="flex items-center justify-center gap-2" href={getBaseLink("projects/new", lang)}>
                <PlusCircle className="text-primary size-5" />
                Start a Project
              </Link>
              <MemberSwitcher />
              {notification ? (
                <Notification
                  appId={notification.appId}
                  appUrl={notification.appUrl}
                  langugageData={{}}
                  popoverContentProps={{className: "rounded-lg", style: {height: "h-auto"}}}
                  subscriberId={notification.subscriberId}
                />
              ) : null}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline">
                <Link href={getBaseLink("login", lang)}>Sign In</Link>
              </Button>
              <Button asChild>
                <Link href={getBaseLink("register", lang)}>Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="z-50 md:hidden"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}>
          {isMenuOpen ? <X className="text-white" size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen ? (
        <div className="bg-primary fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden">
          <nav className="w-full max-w-md px-6">
            <ul className="flex flex-col space-y-6 text-center">
              {PublicLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className={cn(
                      "hover:text-secondary text-2xl font-semibold text-white transition-colors duration-200",
                      pathName === link.href && "text-secondary",
                    )}
                    href={link.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-12">
            {session !== null ? (
              <div className="flex flex-col items-center space-y-4">
                <Link
                  className="hover:text-secondary flex items-center justify-center gap-2 text-white transition-colors duration-200"
                  href={getBaseLink("projects/new", lang)}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}>
                  <PlusCircle className="size-6" />
                  Start a Project
                </Link>
                <div className="mt-4">
                  <MemberSwitcher />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <Button asChild className="w-full max-w-[200px]" variant="outline">
                  <Link
                    href={getBaseLink("login", lang)}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="w-full max-w-[200px]">
                  <Link
                    href={getBaseLink("register", lang)}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
