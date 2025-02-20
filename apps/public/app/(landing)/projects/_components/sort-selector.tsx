"use client";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useRouter, useSearchParams} from "next/navigation";

const sortOptions = [
  {label: "Project Name (A-Z)", value: "projectName ASC"},
  {label: "Project Name (Z-A)", value: "projectName DESC"},
  {label: "End Date (Newest)", value: "projectEndDate DESC"},
  {label: "End Date (Oldest)", value: "projectEndDate ASC"},
  {label: "Fund Amount (High-Low)", value: "fundableAmount DESC"},
  {label: "Fund Amount (Low-High)", value: "fundableAmount ASC"},
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
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by..." />
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
