"use client";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useRouter, useSearchParams} from "next/navigation";

const sortOptions = [
  {label: "Proje Adı (A-Z)", value: "projectName ASC"},
  {label: "Proje Adı (Z-A)", value: "projectName DESC"},
  {label: "Bitiş Tarihi (En Yeni)", value: "projectEndDate DESC"},
  {label: "Bitiş Tarihi (En Eski)", value: "projectEndDate ASC"},
  {label: "Fon Miktarı (Yüksek-Düşük)", value: "fundableAmount DESC"},
  {label: "Fon Miktarı (Düşük-Yüksek)", value: "fundableAmount ASC"},
  {label: "Oluşturma Tarihi (En Yeni)", value: "creationTime DESC"},
  {label: "Oluşturma Tarihi (En Eski)", value: "creationTime ASC"},
];

export default function SortSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (value: string) => {
    const [field, order] = value.split(" ");
    const params = new URLSearchParams(searchParams);
    params.set("sortField", field);
    params.set("sortOrder", order);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      defaultValue={`${searchParams.get("sortField") || "creationTime"} ${searchParams.get("sortOrder") || "DESC"}`}
      onValueChange={handleSort}>
      <SelectTrigger className="w-full sm:w-[200px]">
        <SelectValue placeholder="Sıralama..." />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
