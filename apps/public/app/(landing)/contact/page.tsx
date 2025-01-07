"use client";

import { useState } from "react";

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
import CallToAction from "@/components/CallToAction";
import ContactCard from "@/components/ContactCard";
import Map from "@/components/Map";

const topics = [
  "General Inquiry",
  "Project Support",
  "Technical Issues",
  "Partnerships",
  "Press and Media",
  "Other",
];

export default function Page() {
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

        <ContactCard />

        {/* Contact Us Section Begin */}

        <div className="flex min-h-full items-center justify-center gap-8 rounded-3xl bg-[#F2F8F7]">
          <div className="w-4/5 rounded-3xl py-24">
            <h2 className="mb-4 text-center text-3xl font-semibold">
              CONTACT US
            </h2>
            <h3 className="mb-8 text-center text-5xl font-bold text-[#0E3025]">
              Get in Touch With Us
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Fields */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="rounded-lg bg-white px-4 py-6 text-black shadow-sm"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="-gray-300  rounded-lg bg-white px-4 py-6 text-black shadow-sm "
                />
              </div>

              {/* Phone and Topic Fields */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="-gray-300  rounded-lg bg-white px-4 py-6 text-black shadow-sm "
                />
                <Select
                  value={formData.topic}
                  onValueChange={handleSelectChange}
                  required
                >
                  <SelectTrigger className="-gray-300  rounded-lg bg-white px-4 py-6 text-black shadow-sm ">
                    <SelectValue placeholder="Choose Subject" />
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

              {/* Message Field */}
              <Textarea
                name="message"
                placeholder="Write Your Message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="-gray-300 h-32  rounded-lg bg-white px-4 py-2 text-black shadow-sm "
              />

              {/* Submit Button */}
              <div className="text-left">
                <Button type="submit" className="px-8 py-6">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Us Section End */}

        {/* Our Location Section Begin */}
        <div className="my-16 w-full">
          <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">
            Our Location
          </h2>
          <div>
            <Map latitude={40.7926624} longitude={29.5103489} zoom={20} />
          </div>
        </div>
        {/* Our Location Section End */}

        <CallToAction />
      </main>
    </div>
  );
}
