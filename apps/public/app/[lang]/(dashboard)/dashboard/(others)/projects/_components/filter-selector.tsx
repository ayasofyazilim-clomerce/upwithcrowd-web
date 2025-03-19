"use client";

import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useRouter, useSearchParams} from "next/navigation";
import {FilterIcon} from "lucide-react";

const fundingTypeOptions = [
  {label: "Tüm Tipler", value: "all"},
  {label: "Hisse Bazlı", value: "shre"},
  {label: "Borç Bazlı", value: "dbit"},
  {label: "Hisse & Borç Bazlı", value: "shre_dbit"},
];

const dateRangeOptions = [
  {label: "Tüm Zamanlar", value: "all"},
  {label: "Yakında Bitiyor (7 gün)", value: "7d"},
  {label: "Yakında Bitiyor (15 gün)", value: "15d"},
  {label: "Yakında Bitiyor (30 gün)", value: "30d"},
  {label: "Yakında Bitiyor (60 gün)", value: "60d"},
];

export default function FilterSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (type === "fundType") {
      if (value === "all") {
        params.delete("fundCollectionType");
      } else {
        params.set("fundCollectionType", value);
      }
    } else if (type === "dateRange") {
      if (value === "all") {
        params.delete("dateFilter");
      } else {
        params.set("dateFilter", value);
      }
    }

    // Preserve existing sort parameters
    if (searchParams.has("sortField")) {
      params.set("sortField", searchParams.get("sortField") || "");
    }
    if (searchParams.has("sortOrder")) {
      params.set("sortOrder", searchParams.get("sortOrder") || "");
    }

    router.push(`?${params.toString()}`);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (searchParams.get("fundCollectionType") && searchParams.get("fundCollectionType") !== "all") {
      count++;
    }
    if (searchParams.get("dateFilter") && searchParams.get("dateFilter") !== "all") {
      count++;
    }
    return count;
  };

  const filterCount = getActiveFilterCount();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full justify-between sm:w-[200px]" variant="outline">
          <span className="flex items-center gap-2">
            <FilterIcon className="h-4 w-4" />
            <span className="truncate">{filterCount > 0 ? `Filtreler (${filterCount})` : "Tüm Projeler"}</span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] space-y-4 p-3">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="funding-type">
            Fonlama Tipi
          </label>
          <Select
            defaultValue={searchParams.get("fundCollectionType") || "all"}
            name="funding-type"
            onValueChange={(value) => {
              handleFilterChange("fundType", value);
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Tip seçin" />
            </SelectTrigger>
            <SelectContent>
              {fundingTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="date-range">
            Tarih Aralığı
          </label>
          <Select
            defaultValue={searchParams.get("dateFilter") || "all"}
            name="date-range"
            onValueChange={(value) => {
              handleFilterChange("dateRange", value);
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Aralık seçin" />
            </SelectTrigger>
            <SelectContent>
              {dateRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
