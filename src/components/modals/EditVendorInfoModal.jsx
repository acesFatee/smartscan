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

export default function EditVendorInfoModal({ id, vendorInfo }) {
  const closeRef = useRef();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSubmitEditVendorInfo = async (e) => {
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
        <DialogTitle className="font-bold">Update Vendor Info</DialogTitle>
        <DialogHeader>
          <form onSubmit={handleSubmitEditVendorInfo} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="vendorInfo.name">Vendor Name</Label>
              <Input
                id="vendorInfo.name"
                name="vendorInfo.name"
                type="text"
                placeholder="Enter Vendor Name"
                defaultValue={vendorInfo.name}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="vendorInfo.address">Vendor Address</Label>
              <Input
                id="vendorInfo.address"
                name="vendorInfo.address"
                type="text"
                placeholder="Enter Vendor Address"
                defaultValue={vendorInfo.address}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="vendorInfo.emailAddress">Vendor Email</Label>
              <Input
                id="vendorInfo.emailAddress"
                name="vendorInfo.emailAddress"
                type="email"
                placeholder="Enter Vendor Email"
                defaultValue={vendorInfo.emailAddress}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="vendorInfo.phoneNumber">Vendor Phone</Label>
              <Input
                id="vendorInfo.phoneNumber"
                name="vendorInfo.phoneNumber"
                type="tel"
                placeholder="Enter Vendor Phone"
                defaultValue={vendorInfo.phoneNumber}
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
