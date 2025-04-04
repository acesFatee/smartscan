"use client";

import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { sendUpdateReceipt } from "@/api-calls/sendUpdateReceipt";
import { useRouter } from "next/navigation";

export default function EditDescriptionModal({ id, description }) {
  const router = useRouter();
  const closeRef = useRef();
  const [loading, setLoading] = React.useState(false);

  const handleSubmitEditDescription = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    await sendUpdateReceipt(id, data);
    setLoading(false);
    closeRef.current.click();
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger ref={closeRef} id={id}>
        <Pencil2Icon className="mb-2" />
      </DialogTrigger>
      <DialogContent id={id}>
        <DialogTitle className="font-bold">Update Description</DialogTitle>
        <DialogHeader>
          <form onSubmit={handleSubmitEditDescription} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description">Order Description</Label>
              <Textarea
                className="min-h-48"
                id="description"
                name="description"
                type="text"
                placeholder="Enter Order Description"
                defaultValue={description}
              />
            </div>
            {!loading && (
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            )}
            {loading && (
              <Button className="w-full">
                Saving Changes...
              </Button>
            )}
          </form>
        </DialogHeader>

        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
