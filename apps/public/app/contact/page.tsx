'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, Phone, Mail } from 'lucide-react'
import CallToAction from '@/components/CallToAction'

const contactInfo = [
  {
    icon: Home,
    title: "Our Location",
    info: "123 Innovation Street, Tech City, TC 12345",
    action: null
  },
  {
    icon: Phone,
    title: "Phone Number",
    info: "+1 (555) 123-4567",
    action: null
  },
  {
    icon: Mail,
    title: "Email",
    info: "support@crowdfund.com",
    action: "Send Email"
  }
]

const topics = [
  "General Inquiry",
  "Project Support",
  "Technical Issues",
  "Partnerships",
  "Press and Media",
  "Other"
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, topic: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the form data to your backend
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-lg md:text-xl mb-12 text-center max-w-2xl mx-auto">
          Have questions or need support? We're here to help. Reach out to us using any of the methods below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.info}</p>
                {item.action && (
                  <Button variant="outline" onClick={() => window.location.href = `mailto:${item.info}`}>
                    {item.action}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Name</label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email</label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Phone</label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-foreground mb-1">Topic</label>
              <Select name="topic" value={formData.topic} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Location</h2>
          <div className="aspect-w-16 aspect-h-9">
            <Image
              src="/placeholder.svg"
              alt="Map of CrowdFund office location"
              width={800}
              height={450}
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        <CallToAction />
      </main>
    </div>
  )
}

