import { Hono } from "hono";
import seasonCreate from "./season/create";
import seasonDelete from "./season/delete";
import seasonGet from "./season/get";
import chlistGet from "./chlist/get";
import chlistCreate from "./chlist/create";
import chlistDelete from "./chlist/delete";
import videosCreate from "./videos/create";
import videosGet from "./videos/get";

const app = new Hono();

app.route("/season", seasonGet);
app.route("/season", seasonCreate);
app.route("/season", seasonDelete);
app.route("/chlist", chlistGet);
app.route("/chlist", chlistCreate);
app.route("/chlist", chlistDelete);
app.route("/videos", videosCreate);
app.route("/videos", videosGet);

export default app;
