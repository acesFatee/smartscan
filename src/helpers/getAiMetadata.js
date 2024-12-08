import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { ReceiptSchema } from "../models/ReceiptSchema";

const openai = new OpenAI({
  apiKey:
    process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export const getAiMetadata = async (url) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Analyze the provided image. If this is not a receipt, return a JSON with an error saying "Not a receipt". Otherwise, return the receipt data following the ReceiptSchema. The schema should include:
          - "phoneNumber": The vendor's phone number, or an empty string if not found.
          - "emailAddress": The vendor's email address, or an empty string if not found.
          - "paymentInfo: method": It should include method eg VISA, MASTERCARD, AMERICAN EXPRESS etc (all in caps).
          - "bank": Only the bank's name, or an empty string if not found.
          - "tax": This should include any tax related information in the receipt.
          - "description": A summary of the receipt in about 100 words.
          - "keywords": An array of at least 10 unique keywords for ease in searching.
          - "dateTime": The date and time in JavaScript date format.
          - "category": Assign a general category to the item, such as "food", "clothing" or other relevant classifications. Use lowercase for consistency.
          - "error": If there are no errors then don't include the error property`,
          },
          {
            type: "image_url",
            image_url: {
              url,
            },
          },
        ],
      },
    ],
    response_format: zodResponseFormat(ReceiptSchema, "reciept-schema"),
  });

  try {
    const content = JSON.parse(response.choices[0].message.content);
    return content;
  } catch (error) {
    console.error("Validation failed:", error);
  }
};
