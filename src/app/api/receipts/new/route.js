import { createReceiptStepOne } from "@/helpers/createReceiptStepOne";
import { createReceiptStepThree } from "@/helpers/createReceiptStepThree";
import { createReceiptStepTwo } from "@/helpers/createReceiptStepTwo";
import { decodeToken } from "@/helpers/decodeToken";
import { NextResponse } from "next/server";


export async function POST(req) {
  const { sub: user, error } = await decodeToken(req);

    if (error) {
      return NextResponse.json({ error: "Not a valid token" }, { status: 401 });
    }
    
  try {
    const jsonData = await req.json();
    const { image } = jsonData;

    if (!image || !image.base64) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    // Create a FormData-like object for compatibility with existing functions
    const imageData = {
      get: (key) => {
        if (key === 'image') {
          return {
            name: image.name,
            type: image.type,
            size: image.size,
            arrayBuffer: async () => {
              // Convert base64 back to array buffer if needed
              const base64Data = image.base64.split(',')[1];
              const binaryString = atob(base64Data);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              return bytes.buffer;
            }
          };
        }
        return null;
      }
    };

    const step1 = await createReceiptStepOne(imageData);
    if (step1.error) {
      return NextResponse.json(
        {
          step: 1,
          error: step1.error,
        },
        { status: 400 }
      );
    }

    const step2 = await createReceiptStepTwo(imageData, user);
    if (step2.error) {
      return NextResponse.json(
        {
          step: 2,
          error: step2.error,
        },
        { status: 400 }
      );
    }

    const step3 = await createReceiptStepThree({
      receiptData: step1.data,
      imageUrl: step2.imageUrl,
      imageName: step2.imageName,
      imagePath: step2.imagePath,
      user,
    });
    if (step3.error) {
      return NextResponse.json(
        {
          step: 3,
          error: step3.error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Receipt created successfully",
        receipt: step3.receipt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal Server Error: ", error);
    return NextResponse.json(
      { error: "Internal Server Error: " + error.message },
      { status: 500 }
    );
  }
}
