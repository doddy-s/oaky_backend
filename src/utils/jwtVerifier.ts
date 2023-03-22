import * as jose from "https://deno.land/x/jose@v4.13.1/index.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
const { SECRET } = config();

export default async function verifyJwt(jwt: string) {
  const secret = new TextEncoder().encode(SECRET);

  const { payload } = await jose.jwtVerify(jwt, secret);

  return payload;
}