"use client";

import SingOut from "@/app/login/signout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
const PublicLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const PrivateLinks = [{ href: "/profile", label: "Profile" }];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data } = useSession();
  const [isLogged, setIsLogged] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    if (data?.user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [data]);
  return (
    <header className="bg-background flex h-24 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-primary flex items-center text-2xl font-bold"
        >
          <Image src="/upwc.png" alt="" width={60} height={60} />
          UPwithCrowd
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-8 text-lg">
            {PublicLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-foreground hover:text-primary ye",
                    pathName === link.href && "text-primary",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-x-4">
          {isLogged ? (
            <>
              {PrivateLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-foreground hover:text-primary",
                    pathName === link.href && "text-primary",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <SingOut />
            </>
          ) : (
            <>
              <Button asChild variant="outline">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="mt-4 md:hidden">
          <ul className="flex flex-col space-y-2">
            {PublicLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-foreground hover:text-primary block py-2",
                    pathName === link.href && "text-primary",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Button className="w-full">
                {data?.user ? "Start a Project" : "Sign up"}
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
