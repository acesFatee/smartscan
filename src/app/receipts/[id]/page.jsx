import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";
import { getReceipt } from "@/api-calls/getReceipt";
import VendorInfoSection from "@/components/VendorInfoSection";
import PaymentSection from "@/components/PaymentSection";
import OrderDetails from "@/components/OrderDetails";
import ItemsSection from "@/components/ItemsSection";
import BreakdownSection from "@/components/BreakdownSection";
import AdditionalInfoSection from "@/components/AdditionalInfoSection";
import EditDateModal from "@/components/EditDate";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";

export default async function page(props) {
  const { id } = await props.params;
  const receipt = await getReceipt(id);

  if (receipt.error) {
    return (
      <div className="text-center text-red-600 pt-20">Receipt not found.</div>
    );
  }

  const {
    vendorInfo,
    paymentInfo,
    description,
    items,
    grandTotal,
    dateTime,
    category,
    keywords,
    imageUrl,
    subTotal,
    imagePath,
    tax,
  } = receipt.data;

  return (
    <div className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden shadow-xl">
          {/* Card Header */}
          <CardHeader className="p-6">
            <div className="flex justify-between items-center">
              {/* Left: Title */}
              <CardTitle className="text-2xl font-bold">
                Receipt Details
              </CardTitle>

              {/* Right: Date + Edit */}
              <div className="flex items-center space-x-2">
                <EditDateModal id={id} dateTime={dateTime} />
                <ConfirmDeleteModal
                  id={id}
                  imagePath={imagePath}
                  vendorName={vendorInfo.name}
                />
              </div>
            </div>
          </CardHeader>

          {/* Card Content */}
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Vendor Section */}
              <VendorInfoSection
                id={id}
                imageUrl={imageUrl}
                vendorInfo={vendorInfo}
              />

              <div className="space-y-6">
                {/* Payment Section */}
                <PaymentSection id={id} paymentInfo={paymentInfo} />

                {/* Order Details */}
                <OrderDetails id={id} description={description} />
              </div>
            </div>

            <Separator className="my-6" />

            {/* Items Section */}
            <ItemsSection id={id} items={items} />

            <Separator className="my-6" />

            {/* Breakdown Section */}
            <BreakdownSection
              id={id}
              subTotal={subTotal}
              tax={tax}
              grandTotal={grandTotal}
            />

            <Separator className="my-6" />

            {/* Additional Info Section */}
            <AdditionalInfoSection
              id={id}
              keywords={keywords}
              category={category}
            />
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="p-6">
            <Button className="w-full" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
