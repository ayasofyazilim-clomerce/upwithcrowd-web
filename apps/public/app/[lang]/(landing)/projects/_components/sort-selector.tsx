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
];

export default function SortSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sorting", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      defaultValue={`${searchParams.get("sortField") || "projectEndDate"} ${searchParams.get("sortOrder") || "ASC"}`}
      onValueChange={handleSort}>
      <SelectTrigger className="w-full md:w-[200px]">
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
