import { createReceiptStepOne } from "@/helpers/createReceiptStepOne";
import { createReceiptStepThree } from "@/helpers/createReceiptStepThree";
import { createReceiptStepTwo } from "@/helpers/createReceiptStepTwo";
import { decodeToken } from "@/helpers/decodeToken";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const { sub: user, error } = await decodeToken(req);

    if (error) {
      return NextResponse.json({ error: "Not a valid token" }, { status: 401 });
    }

    const step1 = await createReceiptStepOne(formData);
    if (step1.error) {
      return NextResponse.json(
        {
          step: 1,
          error: step1.error,
        },
        { status: 400 }
      );
    }

    const step2 = await createReceiptStepTwo(formData, user);
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
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
