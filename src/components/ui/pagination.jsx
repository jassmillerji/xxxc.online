
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { useRouter } from 'next/navigation'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Pagination = ({
  className,
  currentPage,
  totalPages,
  onPageChange,
  ...props
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 7;
    const half = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > half + 1) {
        pages.push('...');
      }

      let start = Math.max(2, currentPage - (half - 2));
      let end = Math.min(totalPages - 1, currentPage + (half - 2));

      if (currentPage <= half) {
          end = maxPagesToShow - 2;
      }
      
      if (currentPage > totalPages - half) {
          start = totalPages - (maxPagesToShow - 3);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - half) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    >
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>
        )}
        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {typeof page === 'number' ? (
              <PaginationLink onClick={() => onPageChange(page)} isActive={currentPage === page}>
                {page}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </nav>
  )
}
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-wrap flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

const PaginationLink = ({
  className,
  isActive,
  size,
  ...props
}) => (
  <Button
      aria-current={isActive ? "page" : undefined}
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn("h-10 min-w-10 px-3 py-2 bg-stone-800 text-white hover:bg-stone-700", { "bg-stone-600": isActive }, className)}
      {...props}
    />
)
PaginationLink.displayName = "PaginationLink"


const PaginationPrevious = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
