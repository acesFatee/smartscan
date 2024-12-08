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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { sendUpdateReceipt } from "@/api-calls/sendUpdateReceipt";

export default function Modal({ id, foredit, fordelete }) {
  const sectionToEdit = Object.keys(foredit)[0];
  const dataToEdit = foredit[sectionToEdit];

  const [method, setMethod] = useState(dataToEdit.method || "");
  const [status, setStatus] = useState(dataToEdit.status || "");

  const handleSubmitEditPayment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    formData.append("paymentInfo.method", method);
    formData.append("paymentInfo.status", status);

    await sendUpdateReceipt(id, formData)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const handleSubmitEditDescription = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  const handleSubmitEditItems = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Prepare the items array
    const items = dataToEdit.map((item, index) => ({
      itemName: formData.get(`itemName-${index}`),
      quantity: formData.get(`quantity-${index}`),
      price: formData.get(`price-${index}`),
    }));

    // Serialize items array to JSON and append it to FormData
    formData.append("items", JSON.stringify(items));

    // Log form data including serialized items
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  const handleSubmitEditVendorInfo = async (e) => {
    e.preventDefault();

    // Create a FormData object from the form
    const formData = new FormData(e.target);

    // Prepare the vendorInfo object
    const vendorInfo = {
      name: formData.get("vendorName"),
      address: formData.get("vendorAddress"),
      email: formData.get("vendorEmail"),
      phone: formData.get("vendorPhone"),
    };

    formData.append("vendorInfo", JSON.stringify(vendorInfo));

    // Log the FormData entries
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  const handleSubmitEditBreakdown = async (e) => {
    e.preventDefault();

    // Create a FormData object from the form
    const formData = new FormData(e.target);

    // Log form data entries for debugging
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  const handleSubmitEditAdditionalInfo = async (e) => {
    e.preventDefault();

    // Create a FormData object from the form
    const formData = new FormData(e.target);

    // Log form data entries for debugging
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  const triggerForEdit = () => {
    if (!foredit) return;

    switch (sectionToEdit) {
      case "paymentInfo":
        return (
          <form onSubmit={handleSubmitEditPayment} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="paymentInfo.bank">Bank</Label>
              <Input
                id="paymentInfo.bank"
                name="paymentInfo.bank"
                type="text"
                placeholder="Enter Bank Name"
                defaultValue={dataToEdit.bank}
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
                defaultValue={dataToEdit.lastFourDigits}
              />
            </div>

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        );

      case "description":
        return (
          <form onSubmit={handleSubmitEditDescription} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description">Order Description</Label>
              <Textarea
                className="min-h-40"
                id="description"
                name="description"
                type="text"
                placeholder="Enter Order Description"
                defaultValue={dataToEdit}
              />
            </div>

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        );
      case "items":
        return (
          <form onSubmit={handleSubmitEditItems} className="space-y-4">
            {dataToEdit.map((item, index) => (
              <div key={index} className="space-y-4 pb-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor={`itemName-${index}`}>Item Name</Label>
                  <Input
                    id={`itemName-${index}`}
                    name={`itemName-${index}`}
                    type="text"
                    placeholder="Enter Item Name"
                    defaultValue={item.itemName}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                  <Input
                    id={`quantity-${index}`}
                    name={`quantity-${index}`}
                    type="number"
                    placeholder="Enter Quantity"
                    defaultValue={item.quantity}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor={`price-${index}`}>Price</Label>
                  <Input
                    id={`price-${index}`}
                    name={`price-${index}`}
                    type="number"
                    step="0.01"
                    placeholder="Enter Price"
                    defaultValue={item.price}
                  />
                </div>
                {dataToEdit?.items?.length > 0 && <Separator />}
              </div>
            ))}
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        );

      case "vendorInfo":
        // Vendor Info form
        return (
          <form onSubmit={handleSubmitEditVendorInfo} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="vendorName">Vendor Name</Label>
              <Input
                id="vendorName"
                name="vendorName"
                type="text"
                placeholder="Enter Vendor Name"
                defaultValue={dataToEdit.name}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="vendorAddress">Vendor Address</Label>
              <Input
                id="vendorAddress"
                name="vendorAddress"
                type="text"
                placeholder="Enter Vendor Address"
                defaultValue={dataToEdit.address}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="vendorEmail">Vendor Email</Label>
              <Input
                id="vendorEmail"
                name="vendorEmail"
                type="email"
                placeholder="Enter Vendor Email"
                defaultValue={dataToEdit.email}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="vendorPhone">Vendor Phone</Label>
              <Input
                id="vendorPhone"
                name="vendorPhone"
                type="tel"
                placeholder="Enter Vendor Phone"
                defaultValue={dataToEdit.phone}
              />
            </div>

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        );
      case "breakdown":
        return (
          <form onSubmit={handleSubmitEditBreakdown} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="subTotal">Subtotal</Label>
              <Input
                id="subTotal"
                name="subTotal"
                type="number"
                step="0.01"
                placeholder="Enter Subtotal"
                defaultValue={dataToEdit.subTotal}
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
                defaultValue={dataToEdit.tax}
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
                defaultValue={dataToEdit.grandTotal}
              />
            </div>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        );
      case "additionalInfo":
        return (
          <form onSubmit={handleSubmitEditAdditionalInfo} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                type="text"
                placeholder="Enter Category"
                defaultValue={dataToEdit.category}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                name="keywords"
                type="text"
                placeholder="Enter Keywords (comma-separated)"
                defaultValue={dataToEdit.keywords.join(", ")}
              />
            </div>

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        );
    }
  };

  return (
    <Dialog>
      <DialogTrigger id={id}>
        <Pencil2Icon className="mb-2" />
      </DialogTrigger>
      <DialogContent id={id} onOpenAutoFocus={triggerForEdit}>
        <DialogTitle className="font-bold">Update Info</DialogTitle>
        <DialogHeader>{triggerForEdit()}</DialogHeader>

        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
