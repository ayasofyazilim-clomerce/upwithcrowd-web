import {Presentation} from "lucide-react";
import type {Mission} from "@/_types/missions";

export const missions: Mission[] = [
  {
    id: "1",
    icon: Presentation,
    title: "Projelerinizi Yönetin",
    description: "Haftalık, aylık, yıllık olarak projenizin ilerleme durumunu ve destekçi sayısını takip edin.",
  },
  {
    id: "2",
    icon: Presentation,
    title: "Fon Toplama",
    description: "Proje sahipleri, destekçilerden fon toplamak için çeşitli seçenekler sunabilir.",
  },
  {
    id: "3",
    icon: Presentation,
    title: "Paranızı Çekin",
    description: "Toplanan fonlar, projeniz başarıya ulaştığında Türk bankalarına kolayca aktarılır.",
  },
];
