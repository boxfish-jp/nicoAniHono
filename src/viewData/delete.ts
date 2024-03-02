import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const viewDataDelete = new Hono<{ Bindings: Bindings }>();

viewDataDelete.get("/delete/:viewdata_id", async (c) => {
  const viewdata_id = c.req.param("viewdata_id");
  if (!viewdata_id) {
    return c.json({ error: "Invalid parameter" }, 400);
  }
  try {
    const sql = `DELETE FROM viewData WHERE viewdata_id = '${viewdata_id}'`;
    let { results } = await c.env.DB.prepare(sql).all();
    console.log(results);
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

export default viewDataDelete;
