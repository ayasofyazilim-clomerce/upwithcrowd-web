import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-muted py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-primary">Our Story</Link></li>
            <li><Link href="/team" className="hover:text-primary">Team</Link></li>
            <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="#" className="text-foreground hover:text-primary">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-foreground hover:text-primary">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-foreground hover:text-primary">
              <Instagram className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-foreground hover:text-primary">
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="mb-4">Stay updated with our latest projects and news.</p>
          <form className="flex flex-col sm:flex-row">
            <Input type="email" placeholder="Enter your email" className="mb-2 sm:mb-0 sm:mr-2" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center">
        <p>&copy; 2023 CrowdFund. All rights reserved.</p>
      </div>
    </footer>
  )
}

