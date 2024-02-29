import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const chlistGet = new Hono<{ Bindings: Bindings }>();

chlistGet.get("/", async (c) => {
  const ch_id = c.req.query("ch_id");
  if (ch_id) {
    try {
      let { results } = await c.env.DB.prepare(
        `SELECT * FROM videos WHERE ch_id = '${ch_id}'`
      ).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  }
  try {
    let { results } = await c.env.DB.prepare("SELECT * FROM videos").all();
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

export default chlistGet;
