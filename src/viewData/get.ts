import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const viewDataGet = new Hono<{ Bindings: Bindings }>();

viewDataGet.get("/", async (c) => {
  const ch_id = c.req.query("ch_id");
  const ch_seq = c.req.query("ch_seq");
  if (!ch_id || !ch_seq) {
    try {
      const sql = `SELECT * FROM viewData`;
      let { results } = await c.env.DB.prepare(sql).all();
      console.log(results);
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: String(e) }, 500);
    }
  }
  try {
    const sql = `SELECT * FROM viewData WHERE ch_id = '${ch_id}' AND ch_seq = '${ch_seq}'`;
    let { results } = await c.env.DB.prepare(sql).all();
    console.log(results);
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

export default viewDataGet;
