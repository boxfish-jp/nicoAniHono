import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const chlistGet = new Hono<{ Bindings: Bindings }>();

chlistGet.get("/get", async (c) => {
  try {
    let { results } = await c.env.DB.prepare("SELECT * FROM videos").all();
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

export default chlistGet;
