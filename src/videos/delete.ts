import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const videosDelete = new Hono<{ Bindings: Bindings }>();

videosDelete.get("/delete/:video_id", async (c) => {
  const video_id = c.req.param("video_id");
  if (!video_id) {
    return c.json({ error: "Invalid parameter" }, 400);
  }
  try {
    const sql = `DELETE FROM videos WHERE video_id = ${video_id}`;
    let { results } = await c.env.DB.prepare(sql).all();
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

export default videosDelete;
