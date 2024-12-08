'use server'

import { verify } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export const decodeToken = async (req) => {
  try {
    const token = req.headers.get("x-kinde-token");
    const header = JSON.parse(req.headers.get("x-kinde-header"));
    const { kid } = header;
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const data = verify(token, signingKey);
    return data;
  } catch (error) {
    return { error: "Incorrect Token or expired" };
  }
};
