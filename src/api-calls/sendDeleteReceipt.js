"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const sendDeleteReceipt = async (id, imagePath) => {
  try {
    const { getAccessTokenRaw } = getKindeServerSession();
    const token = await getAccessTokenRaw();
    const response = await fetch(`http://localhost:3000/api/receipts/delete/${id}`, {
      method: "DELETE",
      headers: {
        "x-kinde-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imagePath }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete receipt");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching receipts:", error);
    throw error;
  }
};
