import { NextResponse } from "next/server";
import { decodeToken } from "@/helpers/decodeToken";
import { getReceipts } from "@/api-calls/getReceipts";
import {buffered} from 'json-csv'

const options = {
  fields: [
    {
      name: "vendorInfo.name",
      label: "Vendor Name"
    },
    {
      name: "vendorInfo.address",
      label: "Vendor Address"
    },
    {
      name: "vendorInfo.phoneNumber",
      label: "Vendor Phone"
    },
    {
      name: "vendorInfo.emailAddress",
      label: "Vendor Email"
    },
    {
      name: "paymentInfo.bank",
      label: "Bank",
      transform: (value) => !Boolean(value) ? "N/A" : value
    },
    {
      name: "paymentInfo.lastFourDigits",
      label: "Last 4 Digits",
      transform: (value) => !Boolean(value) ? "N/A" : value
    },
    {
      name: "paymentInfo.method",
      label: "Payment Method",
      transform: (value) => !Boolean(value) ? "N/A" : value
    },
    {
      name: "paymentInfo.status",
      label: "Payment Status",
      transform: (value) => !Boolean(value) ? "N/A" : value
    },
    {
      name: "subTotal",
      label: "Subtotal",
      transform: (value) => !Boolean(value) ? "N/A" : value
    },
    {
      name: "tax",
      label: "Tax",
      transform: (value) => !Boolean(value) ? "N/A" : value
    },
    {
      name: "keywords",
      label: "Keywords",
      transform: (value) => value.join(", ")
    },
    {
      name: "description",
      label: "Description",
      transform: (value) => !Boolean(value) ? "N/A" : value
    },
    {
      name: "dateTime",
      label: "Date",
      transform: (value) => new Date(value).toLocaleDateString()
    },
    {
      name: "grandTotal",
      label: "Grand Total",
      transform: (value) => !Boolean(value) ? "N/A" : value
    },
    {
      name: "imageName",
      label: "Voucher ID",
      transform: (value) => !Boolean(value) ? "N/A" : value
    },
    {
      name: "imageUrl",
      label: "Image Link",
      transform: (value) => {
        if (!value) return "N/A";
        return value
      },
    },
    {
      name: "items",
      label: "Items",
      transform: (value) =>  {
        if (!Array.isArray(value) || value.length === 0) return "N/A";
        return value
          .map(item =>
            `${item.itemName} x${item.quantity} @ $${item.price.toFixed(2)}`
          )
          .join("; ");
      }
    }
  ]
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("searchQuery") || "";
    const from = searchParams.get("from") || undefined;
    const to = searchParams.get("to") || undefined;

    const { sub: user, error } = await decodeToken(req);

    if (error) {
      return NextResponse.json({ error: "Not a valid token" }, { status: 401 });
    }

    const apiToken = req.headers.get("x-kinde-token");
    const pageSize = 1000;

    const receiptsResponse = await getReceipts({from, to, searchQuery, pageSize, apiToken});

    const receiptsData = receiptsResponse.data;

    const csv = await buffered(receiptsData, options);
    
    const headers = new Headers();
    headers.set("Content-Disposition", `attachment; filename="${user}-receipts.csv"`);
    headers.set("Content-Type", "text/csv");

    return new NextResponse(csv, { status: 200, headers });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Could not export CSV" },
      { status: 500 }
    );
  }
}
