import { storage } from "@/config/firebase";

export const deleteFile = async (imagePath) => {
  try {
    await storage.file(imagePath).delete();
  } catch (error) {
    throw new Error("Error deleting file from firebase storage")
  }
};
