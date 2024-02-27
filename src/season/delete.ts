import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const seasonDelete = new Hono<{ Bindings: Bindings }>();

seasonDelete.get("/delete/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "Invalid parameter" }, 400);
  }
  try {
    const sql = `DELETE FROM season WHERE season_id = '${id}'`;
    console.log(sql);
    let { results } = await c.env.DB.prepare(sql).all();
    console.log(results);
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

export default seasonDelete;
