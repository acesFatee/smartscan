import { storage } from "@/config/firebase";

export const createReceiptStepTwo = async (formData, user) => {
  try {
    const image = formData.get("image");

    if (!image) { 
      console.log(image);
      return { error: "No image uploaded" };
    }

    const fileUniqueIdentifier = Date.now();
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const imageName = image.name;
    const imagePath = `receipts/${image.name}-user:${user}-${fileUniqueIdentifier}`

    const file = storage.file(imagePath);
    await file.save(buffer, {
      metadata: {
        contentType: image.type,
      },
      public: true,
    });

    const [publicUrl] = await file.getSignedUrl({
      action: "read",
      expires: "03-01-2500",
    });

    return { imageUrl: publicUrl, imageName, imagePath };
  } catch (error) {
    console.error(
      "Error in step 2: Uploading receipt file to firestore bucket: ",
      error
    );
    return {
      error: "Error in step 2: Uploading receipt file to firestore bucket: "+error,
    };
  }
};
