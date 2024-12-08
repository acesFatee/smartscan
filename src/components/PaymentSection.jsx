import React from "react";
import { CreditCard } from "lucide-react";
import EditPaymentModal from "./modals/EditPaymentModal";

export default function PaymentSection({id, paymentInfo}) {
  return (
    <div>
      <div id="payment-heading" className="flex space-x-2">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-primary" />
          Payment
        </h3>
        <EditPaymentModal id={id} paymentInfo={ paymentInfo } />
      </div>
      <p className="text-sm text-muted-foreground">
        Method: {paymentInfo.method}
      </p>
      <p className="text-sm text-muted-foreground">Bank: {paymentInfo.bank}</p>
      <p className="text-sm text-muted-foreground">
        Status: {paymentInfo.status}
      </p>
      <p className="text-sm text-muted-foreground">
        Last 4 digits: {paymentInfo.lastFourDigits}
      </p>
    </div>
  );
}
