import { verifyRequest } from "@shopify/koa-shopify-auth";
import Router from "koa-router";
import { createScriptTag } from "../controllers/script_tag_controller";
const router = new Router({ prefix: "/script_tag" });
router.get("/", async (ctx) => {
  ctx.body = "Get script tag";
});
router.get("/all", async (ctx) => {
  ctx.body = "Get all script tag";
});

router.post("/", verifyRequest(), async (ctx) => {
  console.log("ctx ->", ctx);
  console.log("req ->", ctx.req);
  console.log("query ->", ctx.query);
  console.log("state ->", ctx.state);
  console.log("session ->", ctx.session);
  const { shop, accessToken } = ctx.state.shopify;
  await createScriptTag(shop, accessToken);
  ctx.body = "Create a script tag";
});

router.delete("/", async (ctx) => {
  ctx.body = "Delete script tag";
});

export default router;
