import { Hono } from "hono";
import betweenDay from "../lib/betweenDay";

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
  const limit = c.req.query("limit");
  const loose = c.req.query("loose");
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
        console.log(sql);
        let { results } = await c.env.DB.prepare(sql).all();
        return c.json({ result: results });
      } catch (e) {
        return c.json({ error: String(e) }, 500);
      }
    }

    try {
      const sql = `SELECT * FROM viewData WHERE ch_seq_id = '${ch_seq_id}'`;
      console.log(sql);
      let { results } = await c.env.DB.prepare(sql).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: String(e) }, 500);
    }
  }
  if (syear && sseason && daddtime) {
    const between = betweenDay(new Date(daddtime), loose);
    try {
      const sql = `SELECT schedule.syear, schedule.sseason, viewData.* FROM viewData INNER JOIN schedule ON viewData.ch_id = schedule.ch_id WHERE schedule.syear = '${syear}' AND schedule.sseason = '${sseason}' AND daddtime > '${between[0]}' AND daddtime < '${between[1]}'`;
      console.log(sql);
      let { results } = await c.env.DB.prepare(sql).all();
      console.log(results);

      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: String(e) }, 500);
    }
  }
  if (ch_id && limit) {
    try {
      const sql = `SELECT * FROM viewData WHERE ch_id = '${ch_id}' ORDER BY daddtime DESC LIMIT ${limit}`;
      console.log(sql);
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
