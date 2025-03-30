"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const sendUpdateReceipt = async (id, data) => {
  try {
    const { getAccessTokenRaw } = getKindeServerSession();

    const token = await getAccessTokenRaw();

    const response = await fetch(`http://localhost:3000/api/receipts/update/${id}`, {
      method: "PUT",
      headers: {
        "x-kinde-token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const errorResult = await response.json();
      return { error: errorResult.error };
    }
  } catch (error) {
    return {
      error,
    };
  }
};
