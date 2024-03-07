import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const viewDataGet = new Hono<{ Bindings: Bindings }>();

viewDataGet.get("/", async (c) => {
  const ch_id = c.req.query("ch_id");
  const ch_seq = c.req.query("ch_seq");
  const ch_seq_id = c.req.query("ch_seq_id");
  const daddtime = c.req.query("daddtime");
  const syear = c.req.query("syear");
  const sseason = c.req.query("sseason");
  if (ch_seq_id) {
    if (daddtime) {
      try {
        const sql = `SELECT * FROM viewData WHERE ch_seq_id = '${ch_seq_id}' AND daddtime < '${daddtime}' ORDER BY daddtime DESC LIMIT 1`;
        console.log(sql);
        let { results } = await c.env.DB.prepare(sql).all();
        console.log(results);
        return c.json({ result: results });
      } catch (e) {
        return c.json({ error: String(e) }, 500);
      }
    }
    if (ch_seq) {
      try {
        const sql = `SELECT * FROM viewData WHERE ch_seq_id = '${ch_seq_id}' AND ch_seq = '${ch_seq}'`;
        let { results } = await c.env.DB.prepare(sql).all();
        console.log(results);
        return c.json({ result: results });
      } catch (e) {
        return c.json({ error: String(e) }, 500);
      }
    }

    try {
      const sql = `SELECT * FROM viewData WHERE ch_seq_id = '${ch_seq_id}'`;
      let { results } = await c.env.DB.prepare(sql).all();
      console.log(results);
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: String(e) }, 500);
    }
  }
  if (syear && sseason && daddtime) {
    try {
      const sql = `SELECT chlist.syear, chlist.sseason, viewData.* FROM viewData INNER JOIN chlist ON viewData.ch_id = chlist.ch_id WHERE chlist.syear = '${syear}' AND chlist.sseason = '${sseason}' AND daddtime < '${daddtime}' ORDER BY daddtime DESC LIMIT 1`;
      let { results } = await c.env.DB.prepare(sql).all();
      console.log(results);
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: String(e) }, 500);
    }
  }
  try {
    const sql = `SELECT * FROM viewData`;
    let { results } = await c.env.DB.prepare(sql).all();
    console.log(results);
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

export default viewDataGet;
