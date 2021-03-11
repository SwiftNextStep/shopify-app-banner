import combineRouters from "koa-combine-routers";
import scriptTagRouter from "./script_tag";

const router = combineRouters(scriptTagRouter);

export default router;
