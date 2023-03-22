import { Application, Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import signJwt from "./utils/jwtSigner.ts";
import verifyJwt from "./utils/jwtVerifier.ts";

const { PORT } = config();

const app = new Application();
const router = new Router();

router
  .post("/sign", async (ctx) => {
    const body = await ctx.request.body({ type: "json" }).value;

    if (!ctx.request.hasBody) {
      ctx.response.status = 400;
      ctx.response.body = { message: "Body doesn't exists", value: body };
      return;
    }

    const token = await signJwt(body.uuid);

    ctx.response.status = 200;
    ctx.response.body = { token: token };
  })

  .get("/verify", async (ctx) => {
    try {
      const jwt = (await ctx.request.headers.get("token")) as string;
      verifyJwt(jwt);
    } catch {
      ctx.response.status = 400;
      ctx.response.body = { message: "token doesn't exists" };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "You're verified" };
    return;
  });

app.use(router.routes());

console.log("Listening on port " + PORT);
await app.listen({ port: parseInt(PORT) });
