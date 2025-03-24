"use client";

import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import type {UpwithCrowd_Categorys_CategoryListDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {FilterIcon} from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";

const fundingTypeOptions = [
  {label: "Tüm Tipler", value: "NONE"},
  {label: "Hisse Bazlı", value: "SHRE"},
  {label: "Borç Bazlı", value: "DBIT"},
  {label: "Hisse & Borç Bazlı", value: "SHRE_DBIT"},
];

export default function FilterSelector({categories}: {categories: UpwithCrowd_Categorys_CategoryListDto[]}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleFilterChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (type === "fundType") {
      if (value === "NONE") {
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
    } else if (type === "categoryIds") {
      if (value === "all") {
        params.delete("categoryIds");
      } else {
        params.set("categoryIds", value);
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
    if (searchParams.get("categoryIds") && searchParams.get("categoryIds") !== "all") {
      count++;
    }
    return count;
  };

  const filterCount = getActiveFilterCount();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full justify-between md:w-[200px]" variant="outline">
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
            defaultValue={searchParams.get("fundCollectionType") || "NONE"}
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
          <label className="text-sm font-medium" htmlFor="categoryIds">
            Kategori
          </label>
          <Select
            defaultValue={searchParams.get("categoryIds") || "all"}
            name="category"
            onValueChange={(value) => {
              handleFilterChange("categoryIds", value);
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id || ""}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
