"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const createReceipt = async (formData) => {
  try {
    const { getAccessTokenRaw } = getKindeServerSession();
    const token = await getAccessTokenRaw();

    // Get the file from FormData
    const file = formData.get('image');
    
    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString('base64');

    // Create JSON object with file data
    const jsonData = {
      image: {
        name: file.name,
        type: file.type,
        size: file.size,
        base64: `data:${file.type};base64,${base64String}`
      }
    };

    const response = await fetch(`${process.env.KINDE_SITE_URL}/api/receipts/new`, {
      method: "POST",
      headers: {
        "x-kinde-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const errorResult = await response.json();
      return { error: errorResult.error };
    }
  } catch (error) {
    console.error('Error in createReceipt:', error);
    return {
      error: error.message || 'Failed to process receipt',
    };
  }
};
