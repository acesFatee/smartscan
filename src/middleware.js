import { NextResponse } from "next/server";
import { decode } from "jsonwebtoken";

export default async function middleware(req) {
  const token = req.headers.get("x-kinde-token");

  if (!token) {
    return NextResponse.json({ error: "No Token provided" }, { status: 401 });
  }

  const { header } = decode(token, { complete: true });
  if (!header) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }

  // No redirects, just forward headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-kinde-header", JSON.stringify(header));
  requestHeaders.set("x-kinde-token", token);

  return NextResponse.next({ request: { headers: requestHeaders } });
}


export const config = {
  matcher: ["/api/receipts/:path*"],
};
