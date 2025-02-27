import {Presentation} from "lucide-react";
import type {Mission} from "@/_types/missions";

export const missions: Mission[] = [
  {
    icon: Presentation,
    title: "Kampanyalarınızı Yönetin",
    description: "Haftalık, aylık, yıllık olarak kaç kişinin dilekçeyi imzaladığını takip edin.",
  },
  {
    icon: Presentation,
    title: "Bağış Toplama",
    description: "Kampanya sahipleri, destekçilerden bağış almak için ayarlamalar yapabilir.",
  },
  {
    icon: Presentation,
    title: "Paranızı Çekin",
    description: "Paranızı banka hesabınıza veya Paypal'a kolayca çekin.",
  },
];
