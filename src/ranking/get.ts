import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const rankingGet = new Hono<{ Bindings: Bindings }>();

rankingGet.get("/", async (c) => {
  const ch_id = c.req.query("ch_id");
  const raddtime = c.req.query("raddtime");
  if (ch_id) {
    if (raddtime) {
      try {
        let { results } = await c.env.DB.prepare(
          `SELECT * FROM ranking WHERE ch_id = ${ch_id} AND raddtime < "${raddtime} ORDER BY daddtime DESC LIMIT 1"`
        ).all();
        return c.json({ result: results });
      } catch (e) {
        return c.json({ error: String(e) }, 500);
      }
    } else {
      try {
        let { results } = await c.env.DB.prepare(
          `SELECT * FROM ranking WHERE ch_id = ${ch_id}`
        ).all();
        return c.json({ result: results });
      } catch (e) {
        return c.json({ error: String(e) }, 500);
      }
    }
  }
  try {
    let { results } = await c.env.DB.prepare("SELECT * FROM ranking").all();
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

export default rankingGet;
