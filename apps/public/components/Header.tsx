'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="py-4 px-6 bg-background">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          CrowdFund
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-foreground hover:text-primary">Home</Link></li>
            <li><Link href="/projects" className="text-foreground hover:text-primary">Projects</Link></li>
            <li><Link href="/blogs" className="text-foreground hover:text-primary">Blog</Link></li>
            <li><Link href="/about" className="text-foreground hover:text-primary">About</Link></li>
            <li><Link href="/faq" className="text-foreground hover:text-primary">FAQ</Link></li>
            <li><Link href="/contact" className="text-foreground hover:text-primary">Contact</Link></li>
            <li><Link href="/profile" className="text-foreground hover:text-primary">Profile</Link></li>
            <li><Link href="/login" className="text-foreground hover:text-primary">Log In</Link></li>
            <li><Link href="/signup" className="text-foreground hover:text-primary">Sign Up</Link></li>
          </ul>
        </nav>
        <Button className="hidden md:inline-flex">Start a Project</Button>
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            <li><Link href="/" className="block py-2 text-foreground hover:text-primary">Home</Link></li>
            <li><Link href="/projects" className="block py-2 text-foreground hover:text-primary">Projects</Link></li>
            <li><Link href="/blogs" className="block py-2 text-foreground hover:text-primary">Blog</Link></li>
            <li><Link href="/about" className="block py-2 text-foreground hover:text-primary">About</Link></li>
            <li><Link href="/contact" className="block py-2 text-foreground hover:text-primary">Contact</Link></li>
            <li><Link href="/faq" className="block py-2 text-foreground hover:text-primary">FAQ</Link></li>
            <li><Link href="/profile" className="block py-2 text-foreground hover:text-primary">Profile</Link></li>
            <li><Link href="/login" className="block py-2 text-foreground hover:text-primary">Log In</Link></li>
            <li><Link href="/signup" className="block py-2 text-foreground hover:text-primary">Sign Up</Link></li>
            <li><Button className="w-full">Start a Project</Button></li>
          </ul>
        </nav>
      )}
    </header>
  )
}

