"use client";

import {Input} from "@/components/ui/input";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("projectName", term);
    } else {
      params.delete("projectName");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Input
      className="w-full md:max-w-sm"
      defaultValue={searchParams.get("projectName")?.toString()}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      placeholder="Proje ara..."
    />
  );
}
