"use client";

import { getReceipts } from "@/api-calls/getReceipts";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";

export function Search() {
  const {
    setReceipts,
    from,
    to,
    searchQuery,
    setTotalPages,
    createUrl,
  } = useContext(Context);
  const router = useRouter();

  const [inputQuery, setInputQuery] = useState(searchQuery);

  const searchReceipts = async (e) => {
    if (e.target.value === "") {
      router.push(createUrl({
        searchQuery: null,
        page: 1,
      }));
    } else {
      router.push(createUrl({ searchQuery: e.target.value, page: 1 }));
    }
    const searchResult = await getReceipts({
      searchQuery: inputQuery,
      from: new Date(from).getTime(),
      to: new Date(to).getTime(),
      currentPage: 1,
    });
    setReceipts(searchResult.data);
    setTotalPages(searchResult.pagination.totalPages);
  };

  const debouncedSearch = useDebouncedCallback(searchReceipts, 1000);

  return (
    <Input
      onChange={(e) => {
        setInputQuery(e.target.value);
        debouncedSearch(e);
      }}
      value={inputQuery}
      className="w-full sm:w-1/2"
      type="text"
      placeholder="Search for receipts..."
    />
  );
}
