import React from "react";
import EditItemModal from "./modals/EditItemModal";

export default function ItemsSection({id, items }) {
  return (
    <>
      <div className="flex space-x-2">
        <h3 className="text-lg font-semibold mb-2">Items</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <EditItemModal id={id} key={index} index={index} item={item} items={items}/>
        ))}
      </div>
    </>
  );
}
