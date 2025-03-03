"use client";
import type {FC} from "react";
import {Home, Phone, Mail} from "lucide-react";

const ContactInfo: FC = () => {
  const data = [
    {
      title: "Adresimiz",
      description: "4517 Washington Ave. Manchester Kentucky 39495",
      icon: Home,
    },
    {
      title: "İletişim",
      description: "+(548) 1234-456-7890",
      icon: Phone,
    },
    {
      title: "E-posta",
      description: "info.furndz@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-3">
        {data.map((item, index) => (
          <div
            className="flex flex-col items-center justify-center rounded-3xl bg-emerald-700 py-12 text-center text-white shadow-lg"
            key={index}>
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#E6F1EF]">
              <item.icon aria-label={`${item.title} icon`} className="text-primary h-12 w-12 " />
            </div>
            <h3 className="mb-2 text-2xl font-semibold">{item.title}</h3>
            <p className="text-md">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactInfo;
