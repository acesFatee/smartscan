"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getReceipt = async (id) => {
  try {
    const { getAccessTokenRaw } = getKindeServerSession();
    const token = await getAccessTokenRaw();

    const response = await fetch(`${process.env.KINDE_SITE_URL}/api/receipts/${id}`, {
      method: "GET",
      headers: {
        "x-kinde-token": token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {error: "Could not fetch receipt"};
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching receipts:", error);
    return {error: "Could not fetch receipts"}
  }
};
