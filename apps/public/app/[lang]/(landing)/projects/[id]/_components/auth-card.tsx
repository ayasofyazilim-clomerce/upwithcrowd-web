"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {LockIcon, LogIn, UserPlusIcon} from "lucide-react";
import {useState} from "react";

interface EmptyCardProps {
  title: string;
  description?: string;
}

export default function EmptyCard({
  title,
  description = "Bu bilgilere erişmek için giriş yapın veya üye olun",
}: EmptyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card className="mt-6 w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold md:text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-200 px-4 py-10"
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}>
          <div
            className={`mb-4 rounded-full bg-gray-100 p-4 transition-all duration-300 ${isHovered ? "bg-primary/10" : ""}`}>
            <LockIcon className={`h-8 w-8 ${isHovered ? "text-primary" : "text-gray-400"}`} />
          </div>
          <p className="mb-4 text-center text-gray-600">{description}</p>
          <div className="flex gap-3">
            <Button className="gap-2" variant="outline">
              Giriş Yap
              <LogIn className="h-4 w-4" />
            </Button>
            <Button className="gap-2">
              Üye Ol
              <UserPlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
