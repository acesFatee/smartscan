import React from "react";
import Modal from "./Modal";
import { MapPin } from "lucide-react";
import EditVendorInfoModal from "./modals/EditVendorInfoModal";

export default function VendorInfoSection({ id, imageUrl, vendorInfo }) {
  return (
    <div className="space-y-6">
      <img
        src={imageUrl}
        alt="Receipt Image"
        className="w-full h-64 object-cover rounded-lg shadow-md hover:cursor-pointer"
      />
      <div>
        <div id="vendor" className="flex space-x-2">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            Vendor
          </h3>
          <EditVendorInfoModal id={id} vendorInfo={vendorInfo} />
        </div>
        <p className="text-sm text-muted-foreground">{vendorInfo.name}</p>
        <p className="text-sm text-muted-foreground">{vendorInfo.address}</p>
      </div>
    </div>
  );
}
