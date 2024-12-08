import React from "react";
import Modal from "./Modal";
import { Badge } from "./ui/badge";

export default function AdditionalInfoSection({id, category, keywords}) {
  return (
    <>
      <div id="additional-info" className="flex space-x-2">
        <h3 className="text-lg font-semibold mb-2">Additional Info</h3>
        <Modal
          id={id}
          foredit={{ additionalInfo: { category, keywords } }}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium">Category:</span> {category}
      </p>
      <div className="flex flex-wrap gap-2 mt-3">
        {keywords.map((keyword, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {keyword}
          </Badge>
        ))}
      </div>
    </>
  );
}
