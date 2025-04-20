"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getReceipts = async ({searchQuery, from, to, currentPage, apiToken, pageSize}) => {
  try {
    const { getAccessTokenRaw } = getKindeServerSession();

    const token = await getAccessTokenRaw();

    const response = await fetch(`${process.env.KINDE_SITE_URL}/api/receipts?searchQuery=${searchQuery}&from=${from}&to=${to}&page=${currentPage || 1}&pageSize=${pageSize || 15}`, {
      method: "GET",
      headers: {
        "x-kinde-token": apiToken || token,
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
