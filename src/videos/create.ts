import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const videosCreate = new Hono<{ Bindings: Bindings }>();

videosCreate.get("/create", async (c) => {
  const ch_id = c.req.query("ch_id");
  const ch_seq = c.req.query("ch_seq");
  const ch_seq_url = c.req.query("ch_seq_url");
  const ch_seq_title = c.req.query("ch_seq_title");
  const ch_seq_thumb = c.req.query("ch_seq_thumb");
  const ch_seq_desc = c.req.query("ch_seq_desc");
  const ch_seq_posted = c.req.query("ch_seq_posted");
  if (
    !ch_id ||
    !ch_seq ||
    !ch_seq_url ||
    !ch_seq_title ||
    !ch_seq_thumb ||
    !ch_seq_desc ||
    !ch_seq_posted
  ) {
    return c.json({ error: "Invalid parameter" }, 400);
  }
  try {
    const sql = `INSERT INTO videos (ch_id, ch_seq, ch_seq_url, ch_seq_title, ch_seq_thumb, ch_seq_desc, ch_seq_posted) VALUES ('${ch_id}', '${ch_seq}', '${ch_seq_url}', '${ch_seq_title}', '${ch_seq_thumb}', '${ch_seq_desc}', '${ch_seq_posted}')`;
    let { results } = await c.env.DB.prepare(sql).all();
    console.log(results);
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

export default videosCreate;
