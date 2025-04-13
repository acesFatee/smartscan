"use client";

import React, { useState } from "react";
import { Context } from "./Context";
import { useSearchParams } from "next/navigation";

const Provider = ({ children }) => {
  const [receipts, setReceipts] = useState([]);
  const [date, setDate] = useState({
    from: undefined,
    to: undefined
  });

  const [totalPages, setTotalPages] = useState(1);
  const [totalReceipts, setTotalReceipts] = useState(0);

  const [sectionToEdit, setSectionToEdit] = useState(null);

  const searchParams = useSearchParams();

  const createUrl = (params) => {
    const urlParams = new URLSearchParams(searchParams);
    
    // Update or remove each parameter
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlParams.set(key, value);
      } else {
        urlParams.delete(key);
      }
    });

    return `?${urlParams.toString()}`;
  };

  const removeParams = (paramsArray) => {
    const urlParams = new URLSearchParams(searchParams);
    paramsArray.forEach(param => {
      urlParams.delete(param);
    }); 

    return `?${urlParams.toString()}`;
  };

  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('searchQuery') || "";
  const from = parseInt(searchParams.get('from')) || "";
  const to = parseInt(searchParams.get('to')) || "";

  return (
    <Context.Provider
      value={{
        receipts,
        setReceipts,
        date,
        setDate,
        searchQuery,
        sectionToEdit,
        setSectionToEdit,
        totalPages,
        setTotalPages,
        totalReceipts,
        setTotalReceipts,
        createUrl,
        removeParams,
        currentPage,
        from,
        to
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
