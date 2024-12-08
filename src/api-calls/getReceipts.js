"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getReceipts = async (searchQuery, from, to) => {
  try {
    const { getAccessTokenRaw } = getKindeServerSession();
  
    console.log(new Date(from), new Date(to))

    const token = await getAccessTokenRaw();

    const response = await fetch(`http://localhost:3000/api/receipts?searchQuery=${searchQuery}&from=${from}&to=${to}`, {
      method: "GET",
      headers: {
        "x-kinde-token": token,
        "Content-Type": "application/json",
      },
    });


    if (!response.ok) {
      return {error: "Could not fetch receipts"};
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching receipts:", error);
    return {error: "Could not fetch receipts"}
  }
};
