import { db } from "@/config/firebase";
import { getReceipt } from "@/helpers/getReceipt";
import { NextResponse } from "next/server";
import algolia from '@/config/algolia'

export const PUT = async (req, props) => {
  try {
    const params = await props.params;
    const data = await req.json();
    const receiptId = params.id;
    const receiptRef = db.collection("receipts").doc(receiptId);
    await receiptRef.update(data);

    const updatedReceipt = await getReceipt(receiptId)

     const existing = await algolia.getObject({
      indexName: "my_index",
      objectID: receiptId,
    });

    const updatedRecord = {
      indexName: "my_index",
      body: {
        ...existing,
        objectID: receiptId,
        description: data.description ?? existing.description,
        dateTime: data.dateTime ?? existing.dateTime,
        category: data.category ?? existing.category,
        orderId: data.orderId ?? existing.orderId,
        subTotal: data.subTotal ?? existing.subTotal,
        grandTotal: data.grandTotal ?? existing.grandTotal,
        tax: data.tax ?? existing.tax,
        error: data.error ?? existing.error,
        imageUrl: data.imageUrl ?? existing.imageUrl,
        imagePath: data.imagePath ?? existing.imagePath,
        imageName: data.imageName ?? existing.imageName,
        user: data.user ?? existing.user,
        keywords: Array.isArray(data.keywords)
          ? data.keywords
          : existing.keywords,
        items: Array.isArray(data.items) ? data.items : existing.items,
        vendorInfo: {
          name: data["vendorInfo.name"] || existing.vendorInfo.name,
          address: data["vendorInfo.address"] || existing.vendorInfo.address,
          phoneNumber:
            data["vendorInfo.phoneNumber"] || existing.vendorInfo.phoneNumber,
          emailAddress:
            data["vendorInfo.emailAddress"] || existing.vendorInfo.emailAddress,
        },
        paymentInfo: {
          bank: data["paymentInfo.bank"] || existing.paymentInfo.bank,
          method: data['paymentInfo.method'] || existing.paymentInfo.method,
          status: data['paymentInfo.status'] || existing.paymentInfo.status,
          lastFourDigits:
            data['paymentInfo.lastFourDigits'] ||
            existing.paymentInfo.lastFourDigits,
        },
      },
    };

    await algolia.saveObject(updatedRecord);

    return NextResponse.json(
      {
        message: "Receipt updated successfully",
        receipt: updatedReceipt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        error: "Error updating receipt info", 
      },
      { status: 400 }
    );
  }
};
    