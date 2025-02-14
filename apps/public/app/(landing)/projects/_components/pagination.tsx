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
import {usePathname, useSearchParams} from "next/navigation";

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
}

export default function PaginationControls({totalPages, currentPage}: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageLinks = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

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
          <PaginationLink href={createPageURL(pageNumber)} isActive={pageNumber === currentPage}>
            {pageNumber}
          </PaginationLink>
        )}
      </PaginationItem>
    ));
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious aria-disabled={currentPage === 1} href={createPageURL(Math.max(1, currentPage - 1))} />
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage === totalPages}
            href={createPageURL(Math.min(totalPages, currentPage + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
