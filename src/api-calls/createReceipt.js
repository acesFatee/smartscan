"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const createReceipt = async (formData) => {
  try {
    const { getAccessTokenRaw } = getKindeServerSession();
    const token = await getAccessTokenRaw();
    const response = await fetch("http://localhost:3000/api/receipts/new", {
      method: "POST",
      headers: {
        "x-kinde-token": token,
      },
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const errorResult = await response.json();
      return { error: errorResult.error };
    }
  } catch (error) {
    console.error(error);
    return {
      error,
    };
  }
};
