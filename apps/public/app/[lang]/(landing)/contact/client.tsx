"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const topics = ["Genel Sorular", "Proje Desteği", "Teknik Sorunlar", "İş Ortaklığı", "Basın ve Medya", "Diğer"];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({...prevState, [name]: value}));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevState) => ({...prevState, topic: value}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
  };

  return (
    <div className="flex min-h-full items-center justify-center gap-8 rounded-3xl bg-[#F2F8F7]">
      <div className="w-4/5 rounded-3xl py-24">
        <h2 className="mb-4 text-center text-3xl font-semibold">BİZE ULAŞIN</h2>
        <h3 className="mb-8 text-center text-5xl font-bold text-[#0E3025]">Bizimle İletişime Geçin</h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name and Email Fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              className="rounded-lg bg-white px-4 py-6 text-black shadow-sm"
              name="name"
              onChange={handleInputChange}
              placeholder="Adınız"
              required
              value={formData.name}
            />
            <Input
              className="-gray-300  rounded-lg bg-white px-4 py-6 text-black shadow-sm "
              name="email"
              onChange={handleInputChange}
              placeholder="E-posta Adresiniz"
              required
              type="email"
              value={formData.email}
            />
          </div>

          {/* Phone and Topic Fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              className="-gray-300  rounded-lg bg-white px-4 py-6 text-black shadow-sm "
              name="phone"
              onChange={handleInputChange}
              placeholder="Telefon Numaranız"
              type="tel"
              value={formData.phone}
            />
            <Select onValueChange={handleSelectChange} required value={formData.topic}>
              <SelectTrigger className="-gray-300  rounded-lg bg-white px-4 py-6 text-black shadow-sm ">
                <SelectValue placeholder="Konu Seçiniz" />
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

          <Textarea
            className="-gray-300 h-32  rounded-lg bg-white px-4 py-2 text-black shadow-sm "
            name="message"
            onChange={handleInputChange}
            placeholder="Mesajınızı Yazın"
            required
            value={formData.message}
          />

          {/* Submit Button */}
          <div className="text-left">
            <Button className="px-8 py-6" type="submit">
              Mesaj Gönder
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
