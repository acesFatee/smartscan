import React from "react";
import Item from "./Item";

export default function ItemsSection({items}) {
  return (
    <>
      <div className="flex space-x-2">
        <h3 className="text-lg font-semibold mb-2">Items</h3>
  
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <Item index={index} item={item} />
        ))}
      </div>
    </>
  );
}