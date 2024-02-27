import { Hono } from "hono";
import seasonCreate from "./season/create";
import seasonDelete from "./season/delete";
import seasonGet from "./season/get";
import chlistGet from "./chlist/get";
import chlistCreate from "./chlist/create";

const app = new Hono();

app.route("/season", seasonGet);
app.route("/season", seasonCreate);
app.route("/season", seasonDelete);
app.route("/chlist", chlistGet);
app.route("/chlist", chlistCreate);
export default app;
