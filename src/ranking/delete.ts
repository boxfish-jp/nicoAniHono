import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const rankingDelete = new Hono<{ Bindings: Bindings }>();

rankingDelete.get("/delete/:ranking_id", async (c) => {
  const ranking_id = c.req.param("ranking_id");
  if (ranking_id) {
    try {
      let { results } = await c.env.DB.prepare(
        `DELETE FROM ranking WHERE ranking_id = ${ranking_id}`
      ).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: String(e) }, 500);
    }
  }
  return c.json({ error: "Invalid parameter" }, 400);
});

export default rankingDelete;
