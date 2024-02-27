import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const seasonCreate = new Hono<{ Bindings: Bindings }>();

seasonCreate.get("/create", async (c) => {
  const syear = c.req.query("syear");
  const sseason = c.req.query("sseason");
  const sdesc = c.req.query("sdesc");
  if (!syear || !sseason || !sdesc) {
    return c.json({ error: "Invalid parameter" }, 400);
  }
  try {
    const sql = `INSERT INTO season (syear, sseason, sdesc) VALUES ('${syear}', '${sseason}', '${sdesc}')`;
    console.log(sql);
    let { results } = await c.env.DB.prepare(sql).all();
    console.log(results);
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

export default seasonCreate;
