"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const exportCSV = async ({ from, to, searchQuery }) => {
  try {
    const { getAccessTokenRaw } = getKindeServerSession();
    const token = await getAccessTokenRaw();

    const response = await fetch(
      `${process.env.KINDE_SITE_URL}/api/receipts/export/csv?from=${from}&to=${to}&searchQuery=${searchQuery}`,
      {
        method: "GET",
        headers: {
          "x-kinde-token": token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return { error: "Could not export CSV" };
    }

    const csvText = await response.text();
    const disposition = response.headers.get("Content-Disposition") || "";
    const match = disposition.match(/filename="?([^"]+)"?/);
    const filename = match ? match[1] : "receipts.csv";

    return { csvText, filename };
  } catch (error) {
    console.error(error);
    return { error: "Could not export CSV" };
  }
};
