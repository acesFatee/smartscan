"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  DotsVerticalIcon,
  EyeOpenIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import Link from "next/link";
import { sendDeleteReceipt } from "@/api-calls/sendDeleteReceipt";
import { useRouter } from "next/navigation";

export function ReceiptTable({ receiptsData }) {
  const { receipts, setReceipts } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    setLoading(true);
    setReceipts(receiptsData);
    setLoading(false);
  }, [receiptsData, setReceipts]);

  const deleteReceipt = async (id, imagePath) => {
    await sendDeleteReceipt(id, imagePath)
    router.refresh();
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vendor</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : (
          receipts?.map((receipt) => (
            <TableRow key={receipt.objectID}>
              <TableCell className="font-medium">
                {receipt.vendorInfo.name}
              </TableCell>
              <TableCell>{receipt.category}</TableCell>
              <TableCell>{receipt.paymentInfo.method}</TableCell>
              <TableCell className="text-right">
                ${receipt.grandTotal}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2">
                      <DotsVerticalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                    >
                      <Link href={`/receipts/${receipt.objectID}`} className="flex w-full">
                        <EyeOpenIcon className="mr-2 h-5 w-4" />
                        View</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => deleteReceipt(receipt.objectID, receipt.imagePath)}
                      className="text-red-600"
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
