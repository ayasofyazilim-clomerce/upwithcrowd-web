"use client";

import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useRouter, useSearchParams} from "next/navigation";
import {FilterIcon} from "lucide-react";

const fundingTypeOptions = [
  {label: "All Types", value: "all"},
  {label: "Share Based", value: "shre"},
  {label: "Debt Based", value: "dbit"},
  {label: "Share & Debt Based", value: "shre_dbit"},
];

const dateRangeOptions = [
  {label: "All Time", value: "all"},
  {label: "Ending Soon (7 days)", value: "7d"},
  {label: "Ending Soon (15 days)", value: "15d"},
  {label: "Ending Soon (30 days)", value: "30d"},
  {label: "Ending Soon (60 days)", value: "60d"},
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
        <Button className="w-[200px] justify-between" variant="outline">
          <span className="flex items-center gap-2">
            <FilterIcon className="h-4 w-4" />
            <span className="truncate">{filterCount > 0 ? `Filters (${filterCount})` : "All Projects"}</span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] space-y-4 p-3">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="funding-type">
            Funding Type
          </label>
          <Select
            defaultValue={searchParams.get("fundCollectionType") || "all"}
            name="funding-type"
            onValueChange={(value) => {
              handleFilterChange("fundType", value);
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
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
            Date Range
          </label>
          <Select
            defaultValue={searchParams.get("dateFilter") || "all"}
            name="date-range"
            onValueChange={(value) => {
              handleFilterChange("dateRange", value);
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Select range" />
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
