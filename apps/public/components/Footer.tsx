"use client";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Facebook, Twitter, Instagram, Linkedin} from "lucide-react";
import {IconWrapper} from "./IconWrapper";

export default function Footer() {
  return (
    <footer
      className="flex h-[60dvh] flex-col justify-center bg-slate-900 px-6 pt-12 text-white"
      style={{
        backgroundImage: "url('/footer-drop.png')",
      }}>
      <div className="container m-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-semibold">About Us</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-primary">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-primary">
                Team
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-primary">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" className="hover:text-primary">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-primary">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="#">
              <IconWrapper
                icon={Facebook}
                className="size-10 bg-slate-800 hover:border hover:border-white"
                iconClassName="size-4 text-white"
              />
            </Link>
            <Link href="#">
              <IconWrapper
                icon={Twitter}
                className="size-10 bg-slate-800 hover:border hover:border-white"
                iconClassName="size-4 text-white"
              />
            </Link>
            <Link href="#">
              <IconWrapper
                icon={Instagram}
                className="size-10 bg-slate-800 hover:border hover:border-white"
                iconClassName="size-4 text-white"
              />
            </Link>
            <Link href="#">
              <IconWrapper
                icon={Linkedin}
                className="size-10 bg-slate-800 hover:border hover:border-white"
                iconClassName="size-4 text-white"
              />
            </Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
          <p className="mb-4">Stay updated with our latest projects and news.</p>
          <form className="flex flex-col sm:flex-row">
            <Input type="email" placeholder="Enter your email" className="mb-2 sm:mb-0 sm:mr-2" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="border-muted-foreground/20 mt-auto border-t py-4 text-center">
        <p>&copy; 2023 UPwithCrowd. All rights reserved.</p>
      </div>
    </footer>
  );
}
