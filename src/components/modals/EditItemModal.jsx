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
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { sendUpdateReceipt } from "@/api-calls/sendUpdateReceipt";
import { useRouter } from "next/navigation";

export default function EditItemModal({ id, index, item, items }) {
  const closeRef = useRef();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSubmitEditItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = !isNaN(value) ? Number(value) : value;
    });

    items[index] = data;
    await sendUpdateReceipt(id, { items });
    setLoading(false);
    router.refresh();
    closeRef.current.click();
  };

  return (
    <Dialog>
      <DialogTrigger ref={closeRef} asChild>
        <div className="group flex hover:cursor-pointer justify-between items-center dark:hover:bg-gray-900 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <div>
            <p className="font-medium group-hover:underline">{item.itemName}</p>
            <p className="text-sm text-muted-foreground">
              Quantity: {item.quantity}
            </p>
          </div>
          <p className="font-semibold">${item.price.toFixed(2)}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold">
            Update Item - {item.itemName}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmitEditItem} className="space-y-4">
          <div className="space-y-4 pb-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor={`itemName`}>Item Name</Label>
              <Input
                id={`itemName-${index}`}
                name={`itemName`}
                type="text"
                placeholder="Enter Item Name"
                defaultValue={item.itemName}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor={`quantity`}>Quantity</Label>
              <Input
                id={`quantity-${index}`}
                name={`quantity`}
                type="number"
                placeholder="Enter Quantity"
                defaultValue={item.quantity}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor={`price`}>Price</Label>
              <Input
                id={`price-${index}`}
                name={`price`}
                type="number"
                step="0.01"
                placeholder="Enter Price"
                defaultValue={item.price}
              />
            </div>
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
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
