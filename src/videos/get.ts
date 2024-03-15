import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const videosGet = new Hono<{ Bindings: Bindings }>();

videosGet.get("/", async (c) => {
  const video_id = c.req.query("video_id");
  const ch_id = c.req.query("ch_id");
  const ch_seq = c.req.query("ch_seq");
  const ch_seq_id = c.req.query("ch_seq_id");
  const syear = c.req.query("syear");
  const sseason = c.req.query("sseason");
  if (video_id) {
    const sql = `SELECT * FROM videos WHERE video_id = '${video_id}'`;
    console.log(sql);
    try {
      let { results } = await c.env.DB.prepare(sql).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  }
  if (ch_id) {
    if (ch_seq) {
      try {
        let { results } = await c.env.DB.prepare(
          `SELECT * FROM videos WHERE ch_id = '${ch_id}' AND ch_seq = '${ch_seq}'`
        ).all();
        return c.json({ result: results });
      } catch (e) {
        return c.json({ error: e }, 500);
      }
    }
    try {
      let { results } = await c.env.DB.prepare(
        `SELECT * FROM videos WHERE ch_id = '${ch_id}'`
      ).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  }
  if (ch_seq_id) {
    try {
      let { results } = await c.env.DB.prepare(
        `SELECT * FROM videos WHERE ch_seq_id = '${ch_seq_id}'`
      ).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: String(e) }, 500);
    }
  }
  if (syear && sseason) {
    try {
      let { results } = await c.env.DB.prepare(
        `SELECT chlist.syear, chlist.sseason, videos.* FROM videos INNER JOIN chlist ON videos.ch_id = chlist.ch_id WHERE chlist.syear = '${syear}' AND chlist.sseason = '${sseason}'`
      ).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  }
  try {
    let { results } = await c.env.DB.prepare("SELECT * FROM videos").all();
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

export default videosGet;
