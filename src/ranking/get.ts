import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const rankingGet = new Hono<{ Bindings: Bindings }>();

rankingGet.get("/", async (c) => {
  const ch_id = c.req.query("ch_id");
  const r_current_seq = c.req.query("r_current_seq");
  const raddtime = c.req.query("raddtime");
  if (ch_id && r_current_seq) {
    if (raddtime) {
      try {
        let { results } = await c.env.DB.prepare(
          `SELECT * FROM ranking WHERE ch_id = ${ch_id} AND r_current_seq = ${r_current_seq} AND raddtime > "${raddtime}"`
        ).all();
        return c.json({ result: results });
      } catch (e) {
        return c.json({ error: String(e) }, 500);
      }
    } else {
      try {
        let { results } = await c.env.DB.prepare(
          `SELECT * FROM ranking WHERE ch_id = ${ch_id} AND r_current_seq = ${r_current_seq}`
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
