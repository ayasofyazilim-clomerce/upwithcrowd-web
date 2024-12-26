"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home, Phone, Mail } from "lucide-react";
import CallToAction from "@/components/CallToAction";

const contactInfo = [
  {
    icon: Home,
    title: "Our Location",
    info: "123 Innovation Street, Tech City, TC 12345",
    action: null,
  },
  {
    icon: Phone,
    title: "Phone Number",
    info: "+1 (555) 123-4567",
    action: null,
  },
  {
    icon: Mail,
    title: "Email",
    info: "support@crowdfund.com",
    action: "Send Email",
  },
];

const topics = [
  "General Inquiry",
  "Project Support",
  "Technical Issues",
  "Partnerships",
  "Press and Media",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevState) => ({ ...prevState, topic: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
  };

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Contact Us
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg md:text-xl">
          Have questions or need support? We're here to help. Reach out to us
          using any of the methods below.
        </p>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {contactInfo.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <item.icon className="text-primary mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.info}</p>
                {item.action && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      (window.location.href = `mailto:${item.info}`)
                    }
                  >
                    {item.action}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto mb-16 max-w-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="text-foreground mb-1 block text-sm font-medium"
              >
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-foreground mb-1 block text-sm font-medium"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="text-foreground mb-1 block text-sm font-medium"
              >
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="topic"
                className="text-foreground mb-1 block text-sm font-medium"
              >
                Topic
              </label>
              <Select
                name="topic"
                value={formData.topic}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="text-foreground mb-1 block text-sm font-medium"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">
            Our Location
          </h2>
          <div className="aspect-w-16 aspect-h-9">
            <Image
              src="/placeholder.svg"
              alt="Map of UPwithCrowd office location"
              width={800}
              height={450}
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        <CallToAction />
      </main>
    </div>
  );
}
