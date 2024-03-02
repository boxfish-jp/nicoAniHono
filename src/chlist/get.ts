import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const chlistGet = new Hono<{ Bindings: Bindings }>();

chlistGet.get("/", async (c) => {
  const ch_id = c.req.query("ch_id");
  const syear = c.req.query("syear");
  const sseason = c.req.query("sseason");
  const ch_NaniTag = c.req.query("ch_NaniTag");
  if (ch_id) {
    try {
      let { results } = await c.env.DB.prepare(
        `SELECT * FROM chlist WHERE ch_id = ${ch_id}`
      ).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  }
  if (ch_NaniTag) {
    try {
      let { results } = await c.env.DB.prepare(
        `SELECT * FROM chlist WHERE ch_NaniTag = "${ch_NaniTag}"`
      ).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  }
  if (!ch_id && syear && sseason) {
    try {
      let { results } = await c.env.DB.prepare(
        `SELECT * FROM chlist WHERE syear = ${syear} AND sseason = "${sseason}"`
      ).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  }
  try {
    let { results } = await c.env.DB.prepare("SELECT * FROM chlist").all();
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

export default chlistGet;
