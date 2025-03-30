"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { sendDeleteReceipt } from "@/api-calls/sendDeleteReceipt";
import { useRouter } from "next/navigation";

export default function ConfirmDeleteModal({ id, imagePath, vendorName }) {
  const router = useRouter();
  const [open, setOpen] = useState(false); // 🔄 control dialog visibility

  const handleDelete = async (id, imagePath) => {
    await sendDeleteReceipt(id, imagePath);
    setOpen(false); // ✅ close dialog after deletion
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Receipt</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this receipt from{" "}
            <span className="font-medium">{vendorName}</span>? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete(id, imagePath)}
            type="button"
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
