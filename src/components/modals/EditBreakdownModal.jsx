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

export default function EditBreakdownModal({ id, subTotal, tax, grandTotal }) {
  const router = useRouter();
  const closeRef = useRef();
  const [loading, setLoading] = React.useState(false);

  const handleSubmitEditBreakdown = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = !isNaN(value) ? Number(value) : value;
    });

    await sendUpdateReceipt(id, {
      subTotal: data.subTotal,
      tax: data.tax,
      grandTotal: data.grandTotal,
    });
    setLoading(false);
    router.refresh();
    closeRef.current.click();
  };

  return (
    <Dialog>
      <DialogTrigger ref={closeRef} id={id}>
        <Pencil2Icon className="mb-2" />
      </DialogTrigger>
      <DialogContent id={id}>
        <DialogTitle className="font-bold">Update Breakdown</DialogTitle>
        <DialogHeader>
          {" "}
          <form onSubmit={handleSubmitEditBreakdown} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="subTotal">Subtotal</Label>
              <Input
                id="subTotal"
                name="subTotal"
                type="number"
                step="0.01"
                placeholder="Enter Subtotal"
                defaultValue={subTotal}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="tax">Tax</Label>
              <Input
                id="tax"
                name="tax"
                type="number"
                step="0.01"
                placeholder="Enter Tax Amount"
                defaultValue={tax}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="grandTotal">Grand Total</Label>
              <Input
                id="grandTotal"
                name="grandTotal"
                type="number"
                step="0.01"
                placeholder="Enter Grand Total"
                defaultValue={grandTotal}
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
