"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {cn} from "@repo/ui/utils";
import {usePathname, useSearchParams} from "next/navigation";

interface PaginationControlsProps {
  totalCount: number;
  maxResultCount?: number;
}

export default function PaginationControls({totalCount, maxResultCount = 10}: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skipCount = parseInt(searchParams.get("skipCount") || "0") || 0;
  const totalPages = Math.ceil(totalCount / maxResultCount);
  const createPageURL = (_skipCount: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("skipCount", _skipCount.toString());
    return `${pathname}?${params.toString()}`;
  };
  const currentPage = Math.floor(skipCount / maxResultCount + 1);
  const renderPageLinks = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }
    return pageNumbers.map((pageNumber) => (
      <PaginationItem key={pageNumber}>
        {pageNumber === "..." ? (
          <PaginationEllipsis />
        ) : (
          <PaginationLink
            href={createPageURL(Number(pageNumber) * maxResultCount - maxResultCount)}
            isActive={pageNumber === currentPage}>
            {pageNumber}
          </PaginationLink>
        )}
      </PaginationItem>
    ));
  };
  const prevPage = skipCount - maxResultCount < 0 ? 0 : skipCount - maxResultCount;
  const nextPage = skipCount + maxResultCount > totalPages / currentPage ? 0 : skipCount + maxResultCount;
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(currentPage === 1 ? "pointer-events-none opacity-50" : "")}
            href={createPageURL(prevPage)}
            isActive={currentPage === 1}
          />
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem>
          <PaginationNext
            className={cn(nextPage === 0 ? "pointer-events-none opacity-50" : "")}
            href={createPageURL(nextPage)}
            isActive={nextPage === 0}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
