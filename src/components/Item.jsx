import React from "react";

export default function Item({ index, item }) {
  return (
    <div
      key={index}
      className="group flex hover:cursor-pointer justify-between items-center dark:hover:bg-gray-900 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
    >
      <div>
        <p className="font-medium group-hover:underline">{item.itemName}</p>
        <p className="text-sm  text-muted-foreground">
          Quantity: {item.quantity}
        </p>
      </div>
      <p className="font-semibold">${item.price.toFixed(2)}</p>
    </div>
  );
}
