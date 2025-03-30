import { getAiMetadata } from "@/helpers/getAiMetadata";

export const createReceiptStepOne = async (formData) => {
  try {
    const image = formData.get("image");

    if (!image) {
      console.log(image);
      return {
        error: "No image provided",
      };
    }

    // Check if the image size exceeds 1MB
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes
    if (image.size > maxSize) {
      console.log("Image size exceeds 1MB");87
      return {
        error: "Image size exceeds 1MB",
        statusCode: 400, // Add a status code for reference
      };
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const base64Image = `data:${image.type};base64,${buffer.toString(
      "base64"
    )}`;

    const data = await getAiMetadata(base64Image);

    if (Boolean(data.error)) {
      console.log(data.error);
      return {
        error: data.error,
      };
    }

    return { data };
  } catch (error) {
    console.error("Error in step 1: Getting metadata from receipt: ", error);
    return {
      error: "Error in step 1: Getting metadata from receipt: " + error,
    };
  }
};
