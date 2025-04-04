"use client";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { sendUpdateReceipt } from "@/api-calls/sendUpdateReceipt";

export default function EditPaymentModal({ id, paymentInfo }) {
  const [method, setMethod] = useState(paymentInfo.method || "");
  const [status, setStatus] = useState(paymentInfo.status || "");
  const [loading, setLoading] = useState(false);
  const closeRef = useRef();
  const router = useRouter();

  const handleSubmitEditPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    formData.append("paymentInfo.method", method);
    formData.append("paymentInfo.status", status);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    await sendUpdateReceipt(id, data)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));

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
        <DialogTitle className="font-bold">Edit Payment Info</DialogTitle>
        <DialogHeader>
          <form onSubmit={handleSubmitEditPayment} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="paymentInfo.bank">Bank</Label>
              <Input
                id="paymentInfo.bank"
                name="paymentInfo.bank"
                type="text"
                placeholder="Enter Bank Name"
                defaultValue={paymentInfo.bank}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="paymentInfo.method">Payment Method</Label>
              <Select
                defaultValue={method}
                onValueChange={(value) => setMethod(value)}
              >
                <SelectTrigger id="paymentInfo.method">
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VISA">VISA</SelectItem>
                  <SelectItem value="MASTERCARD">MasterCard</SelectItem>
                  <SelectItem value="AMEX">American Express</SelectItem>
                  <SelectItem value="PAYPAL">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="paymentInfo.status">Status</Label>
              <Select
                defaultValue={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger id="paymentInfo.status">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="DECLINED">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="paymentInfo.lastFourDigits">
                Last Four Digits
              </Label>
              <Input
                id="paymentInfo.lastFourDigits"
                name="paymentInfo.lastFourDigits"
                type="text"
                placeholder="XXXX"
                maxLength={4}
                defaultValue={paymentInfo.lastFourDigits}
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
