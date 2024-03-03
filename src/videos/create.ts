import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const videosCreate = new Hono<{ Bindings: Bindings }>();

videosCreate.get("/create", async (c) => {
  const ch_id = c.req.query("ch_id");
  const ch_seq = c.req.query("ch_seq");
  const ch_seq_url = c.req.query("ch_seq_url");
  const ch_seq_id = c.req.query("ch_seq_id");
  let ch_seq_title = c.req.query("ch_seq_title");
  const ch_seq_thumb = c.req.query("ch_seq_thumb");
  let ch_seq_desc = c.req.query("ch_seq_desc");
  const ch_seq_posted = c.req.query("ch_seq_posted");
  const encode = c.req.query("encode");
  if (
    !ch_id ||
    !ch_seq ||
    !ch_seq_url ||
    !ch_seq_id ||
    !ch_seq_title ||
    !ch_seq_thumb ||
    !ch_seq_desc ||
    !ch_seq_posted
  ) {
    return c.json({ error: "Invalid parameter" }, 400);
  }
  if (encode === "true") {
    ch_seq_title = decodeURIComponent(ch_seq_title).replace(/'/g, "''");
    ch_seq_desc = decodeURIComponent(ch_seq_desc).replace(/'/g, "''");
  }
  try {
    const sql = `INSERT INTO videos (ch_id, ch_seq, ch_seq_url, ch_seq_id, ch_seq_title, ch_seq_thumb, ch_seq_desc, ch_seq_posted) VALUES ('${ch_id}', '${ch_seq}', '${ch_seq_url}', '${ch_seq_id}', '${ch_seq_title}', '${ch_seq_thumb}', '${ch_seq_desc}', '${ch_seq_posted}')`;
    let { results } = await c.env.DB.prepare(sql).all();
    console.log(results);
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

export default videosCreate;
