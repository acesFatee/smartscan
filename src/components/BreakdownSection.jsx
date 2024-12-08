import React from 'react'
import Modal from './Modal'

export default function BreakdownSection({id, subTotal, tax, grandTotal}) {
  return (
    <>
        <div className="flex space-x-2">
                <h3 className="text-lg font-semibold mb-2">Breakdown</h3>
                <Modal
                  id={id}
                  foredit={{ breakdown: { subTotal, tax, grandTotal } }}
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Subtotal:</span> ${subTotal}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Tax:</span> ${tax.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Grand Total:</span> $
                  {grandTotal.toFixed(2)}
                </p>
              </div>
    </>
  )
}
