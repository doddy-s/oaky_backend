import * as jose from "https://deno.land/x/jose@v4.13.1/index.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
const { alg, SECRET } = config();

export default async function signJwt(uuid: string) {
  const secret = new TextEncoder().encode(SECRET);

  const jwt = await new jose.SignJWT({ uuid })
    .setProtectedHeader({ alg })
    .setExpirationTime("2h")
    .sign(secret);

  return jwt;
}