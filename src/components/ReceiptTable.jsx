"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import Link from "next/link";
import { getReceipts } from "@/api-calls/getReceipts";
import { useRouter } from "next/navigation";

export function ReceiptTable() {
  const { receipts, setReceipts, date, searchQuery } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchReceipts = async () => {
    const receiptsResponse = await getReceipts(
      searchQuery,
      new Date(date?.from).getTime(),
      new Date(date?.to).getTime()
    );

    const receiptsData = receiptsResponse.data;
    setReceipts(receiptsData);
    setLoading(false);
  };

  const handleRowClick = (id) => {
    router.push(`/receipts/${id}`);
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  return (
    <div className="py-6">
      {loading ? (
        <div className="text-center text-muted-foreground">Loading...</div>
      ) : (
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {receipts?.map((receipt) => (
              <TableRow onClick={() => handleRowClick(receipt.objectID)} key={receipt.objectID} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  {new Date(receipt.dateTime).toISOString().split("T")[0]}
                </TableCell>
                <TableCell>{receipt.vendorInfo.name}</TableCell>
                <TableCell>{receipt.category}</TableCell>
                <TableCell>{receipt.paymentInfo.method}</TableCell>
                <TableCell className="font-bold">
                  {receipt.grandTotal.toLocaleString("en-CA", {
                    style: "currency",
                    currency: "CAD",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
