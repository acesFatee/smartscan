import { deleteFile } from "@/helpers/deleteFile";
import { deleteReceipt } from "@/helpers/deleteReceipt";
import { NextResponse } from "next/server";
import algolia from "@/config/algolia";

export const DELETE = async (req, props) => {
  const params = await props.params;
  try {
    const data = await req.json();
    const { id } = params;
    const { imagePath } = data;
    const documentPath = `receipts/${id}`;

    await deleteFile(imagePath);
    await deleteReceipt(documentPath);
    await algolia.deleteObject({indexName: "my_index", objectID: id})

    return NextResponse.json(
      { message: "Receipt deleted successfully", receiptId: id },
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
