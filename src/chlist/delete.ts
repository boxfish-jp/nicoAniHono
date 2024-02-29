import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const chlistDelete = new Hono<{ Bindings: Bindings }>();

chlistDelete.get("/delete/:id", async (c) => {
  const chlist_id = c.req.param("id");
  if (!chlist_id) {
    return c.json({ error: "Invalid parameter" }, 400);
  }
  try {
    const sql = `DELETE FROM chlist WHERE chlist_id = ${chlist_id}`;
    console.log(sql);
    let { results } = await c.env.DB.prepare(sql).all();
    console.log(results);
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

export default chlistDelete;
