import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const videosGet = new Hono<{ Bindings: Bindings }>();

videosGet.get("/", async (c) => {
  const ch_id = c.req.query("ch_id");
  const ch_seq = c.req.query("ch_seq");
  const ch_seq_id = c.req.query("ch_seq_id");
  if (ch_id) {
    if (ch_seq) {
      try {
        let { results } = await c.env.DB.prepare(
          `SELECT * FROM videos WHERE ch_id = '${ch_id}' AND ch_seq = '${ch_seq}'`
        ).all();
        return c.json({ result: results });
      } catch (e) {
        return c.json({ error: e }, 500);
      }
    }
    try {
      let { results } = await c.env.DB.prepare(
        `SELECT * FROM videos WHERE ch_id = '${ch_id}'`
      ).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  }
  if (ch_seq_id) {
    try {
      let { results } = await c.env.DB.prepare(
        `SELECT * FROM videos WHERE ch_seq_id = '${ch_seq_id}'`
      ).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: String(e) }, 500);
    }
  }
  try {
    let { results } = await c.env.DB.prepare("SELECT * FROM videos").all();
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

export default videosGet;
