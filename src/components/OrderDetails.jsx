import React from "react";
import { ShoppingBag } from "lucide-react";
import EditDescriptionModal from "./modals/EditDescriptionModal";

export default function OrderDetails({id, description}) {
  return (
    <div>
      <div id="order-details" className="flex space-x-2">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <ShoppingBag className="w-5 h-5 mr-2 text-primary" />
          Order Details
        </h3>
        <EditDescriptionModal id={id} description={ description } />
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
