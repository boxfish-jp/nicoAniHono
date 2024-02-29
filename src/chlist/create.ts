import { Hono } from "hono";
import seasonCreate from "../season/create";

type Bindings = {
  DB: D1Database;
};

const chlistCreate = new Hono<{ Bindings: Bindings }>();

chlistCreate.get("/create", async (c) => {
  const ch_id = c.req.query("ch_id");
  const ch_title = c.req.query("ch_title");
  const ch_url = c.req.query("ch_url");
  const ch_detail = c.req.query("ch_detail");
  const ch_LtstFree = c.req.query("ch_LtstFree");
  const ch_PrmFree = c.req.query("ch_PrmFree");
  const syear = c.req.query("syear");
  const sseason = c.req.query("sseason");
  const ch_twt = c.req.query("ch_twt");
  const ch_site = c.req.query("ch_site");
  const ch_thumb = c.req.query("ch_thumb");
  if (
    !ch_id ||
    !ch_title ||
    !ch_url ||
    !ch_detail ||
    !ch_LtstFree ||
    !ch_PrmFree ||
    !syear ||
    !sseason ||
    !ch_twt ||
    !ch_site ||
    !ch_thumb
  ) {
    return c.json({ error: "Invalid parameter" }, 400);
  }
  try {
    const sql = `INSERT INTO chlist (ch_id, ch_title, ch_url, ch_detail, ch_LtstFree, ch_PrmFree, syear, sseason, ch_twt, ch_site, ch_thumb) VALUES ('${ch_id}', '${ch_title}', '${ch_url}', '${ch_detail}', '${ch_LtstFree}', '${ch_PrmFree}', '${syear}', '${sseason}', '${ch_twt}', '${ch_site}', '${ch_thumb}')`;
    console.log(sql);
    let { results } = await c.env.DB.prepare(sql).all();
    console.log(results);
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

export default chlistCreate;
