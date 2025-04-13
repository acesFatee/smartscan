'use client'

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Context } from "../../Context/Context";
import { getReceipts } from "@/api-calls/getReceipts";

export default function PaginationComponent() {
  const { totalPages, from, to, searchQuery, setReceipts, createUrl, setTotalPages, currentPage } = useContext(Context);
  const router = useRouter();

  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  const handlePageChange = async (page) => {
    router.push(createUrl({page}));
    const {data, pagination} = await getReceipts({
      searchQuery: searchQuery,
      from: new Date(from).getTime(),
      to: new Date(to).getTime(),
      currentPage: page
    });
    setReceipts(data);
    setTotalPages(pagination.totalPages);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <PaginationItem key="1">
          <PaginationLink 
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pages.push(
          <PaginationItem key="ellipsis1">...</PaginationItem>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <PaginationItem key="ellipsis2">...</PaginationItem>
        );
      }
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
        
        {renderPageNumbers()}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
