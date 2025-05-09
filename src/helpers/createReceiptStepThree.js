import { db } from "@/config/firebase";
import algolia from "@/config/algolia"; // adjust the path accordingly

export const createReceiptStepThree = async (data) => {
  try {
    const { receiptData, imageUrl, user, imageName, imagePath } = data;

    if (!receiptData || !imageUrl) {
      return { error: "No receipt data or image url present" };
    }

    const receiptDoc = {
      ...receiptData,
      dateTime: new Date(receiptData.dateTime).getTime(),
      imageUrl,
      user,
      imagePath,
      imageName
    };

    const docRef = await db.collection("receipts").add(receiptDoc);

    const savedReceipt = {
      id: docRef.id,
      ...receiptDoc,
      createdAt: new Date(),
    };

    await algolia.saveObject(
      {
        indexName: "my_index",
        body: {
          objectID: docRef.id, // Required by Algolia
          ...receiptDoc,
        }
      }
    );

    return {
      receipt: savedReceipt,
    };
  } catch (error) {
    console.error("Error in step 3: Saving data to Firestore", error);
    return {
      error: "Error in step 3: Saving data to Firestore " + error,
    };
  }
};
