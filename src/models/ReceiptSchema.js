import { z } from "zod";

export const ReceiptSchema = z.object({
  vendorInfo: z
    .object({
      name: z.string().optional(),
      address: z.string().optional(),
      phoneNumber: z.string().optional(),
      emailAddress: z.string().optional(),
    })
    .optional(),
  orderId: z.string().optional(),
  description: z.string(),
  items: z
    .array(
      z.object({
        itemName: z.string(),
        quantity: z.number(),
        price: z.number(),
      })
    )
    .optional(),
  subTotal: z.number().optional(),
  grandTotal: z.number().optional(),
  tax: z.number().optional(),
  dateTime: z.string().transform((str) => new Date(str).getTime()),
  paymentInfo: z
    .object({
      bank: z.string(),
      method: z.string(),
      status: z.string(),
      lastFourDigits: z.string().optional(),
    })
    .optional(),
    category: z.string().optional(),
  keywords: z.array(z.string()),
  error: z.string().optional(),
});
