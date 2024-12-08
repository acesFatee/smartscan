"use client";

import React, { useState } from "react";
import { Context } from "./Context";
import { previousMonday, nextSunday } from "date-fns";

const Provider = ({ children }) => {
  const [receipts, setReceipts] = useState([]);
  const [date, setDate] = React.useState({
    from: previousMonday(new Date()).getTime(),
    to: nextSunday(new Date()).getTime(),
  });

  const [searchQuery, setSearchQuery] = useState("")
  const [sectionToEdit, setSectionToEdit] = useState(null)

  return (
    <Context.Provider value={{ receipts, setReceipts, date, setDate, searchQuery, setSearchQuery, sectionToEdit, setSectionToEdit }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
