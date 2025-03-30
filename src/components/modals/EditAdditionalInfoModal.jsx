"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import React, { useRef } from "react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { sendUpdateReceipt } from "@/api-calls/sendUpdateReceipt";
import { useRouter } from "next/navigation";

export default function EditAdditionalInfoModal({id, category, keywords}) {

  const closeRef = useRef();
  const router = useRouter()

  const handleSubmitEditAdditionalInfo = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = key === 'keywords' ? value.split(', ') : value;
    });

    await sendUpdateReceipt(id, data)
    closeRef.current.click();
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger ref={closeRef} id={id}>
        <Pencil2Icon className="mb-2" />
      </DialogTrigger>
      <DialogContent id={id}>
        <DialogTitle className="font-bold">Update Addtional Info</DialogTitle>
        <DialogHeader>
          <form onSubmit={handleSubmitEditAdditionalInfo} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                type="text"
                placeholder="Enter Category"
                defaultValue={category}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                name="keywords"
                type="text"
                placeholder="Enter Keywords (comma-separated)"
                defaultValue={keywords.join(", ")}
              />
            </div>

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </DialogHeader>

        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
