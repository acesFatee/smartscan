import { db } from "@/config/firebase";
import { NextResponse } from "next/server";

export const GET = async (req, props) => {
  const params = await props.params;
  try {
    const receiptRef = db.collection("receipts").doc(params.id);
    const receiptDoc = await receiptRef.get();

    if (!receiptDoc.exists) {
      return NextResponse.json(
        { error: "Receipt not found." },
        { status: 404 }
      );
    }

    const receiptData = receiptDoc.data();

    return NextResponse.json({
      data: { id: receiptDoc.id, ...receiptData },
      message: "Receipt fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching receipt:", error);
    return NextResponse.json(
      { error: "Failed to fetch the receipt." },
      { status: 500 }
    );
  }
};
