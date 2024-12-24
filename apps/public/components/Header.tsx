"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data } = useSession();

  return (
    <header className="bg-background px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-primary text-2xl font-bold">
          CrowdFund
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-foreground hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-foreground hover:text-primary"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className="text-foreground hover:text-primary"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-foreground hover:text-primary"
              >
                About
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-foreground hover:text-primary">
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="text-foreground hover:text-primary"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-foreground hover:text-primary"
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="text-foreground hover:text-primary"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
        <Button className="hidden md:inline-flex">
          {data?.user ? "Start a Project" : "Sign up"}
        </Button>
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
            <li>
              <Link
                href="/"
                className="text-foreground hover:text-primary block py-2"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-foreground hover:text-primary block py-2"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className="text-foreground hover:text-primary block py-2"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-foreground hover:text-primary block py-2"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary block py-2"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-foreground hover:text-primary block py-2"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="text-foreground hover:text-primary block py-2"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-foreground hover:text-primary block py-2"
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="text-foreground hover:text-primary block py-2"
              >
                Sign Up
              </Link>
            </li>
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
