import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const seasonGet = new Hono<{ Bindings: Bindings }>();

seasonGet.get("/", async (c) => {
  const syear = c.req.query("syear");
  const sseason = c.req.query("sseason");
  if (!syear || !sseason) {
    try {
      let { results } = await c.env.DB.prepare("SELECT * FROM season").all();
      return c.json(results);
    } catch (e) {
      return c.json({ error: String(e) }, 500);
    }
  }
  try {
    let { results } = await c.env.DB.prepare(
      `SELECT * FROM season WHERE syear = ${syear} AND sseason = ${sseason}`
    ).all();
    return c.json(results);
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

export default seasonGet;
