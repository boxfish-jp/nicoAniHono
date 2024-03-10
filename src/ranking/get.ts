import { Hono } from "hono";
import betweenDay from "../lib/betweenDay";

type Bindings = {
  DB: D1Database;
};

const rankingGet = new Hono<{ Bindings: Bindings }>();

rankingGet.get("/", async (c) => {
  const ch_id = c.req.query("ch_id");
  const raddtime = c.req.query("raddtime");
  const syear = c.req.query("syear");
  const sseason = c.req.query("sseason");
  const limit = c.req.query("limit");
  const offset = c.req.query("offset");
  const order = c.req.query("order");
  if (ch_id) {
    if (raddtime) {
      try {
        const sql = `SELECT * FROM ranking WHERE ch_id = ${ch_id} AND raddtime < "${raddtime}" ORDER BY raddtime DESC LIMIT 1`;
        console.log(sql);
        let { results } = await c.env.DB.prepare(sql).all();
        return c.json({ result: results });
      } catch (e) {
        return c.json({ error: String(e) }, 500);
      }
    } else {
      try {
        let { results } = await c.env.DB.prepare(
          `SELECT * FROM ranking WHERE ch_id = ${ch_id}`
        ).all();
        return c.json({ result: results });
      } catch (e) {
        return c.json({ error: String(e) }, 500);
      }
    }
  }
  if (syear && sseason && raddtime) {
    const between = betweenDay(new Date(raddtime));
    if (limit && offset && order) {
      try {
        const sql = `SELECT chlist.syear, chlist.sseason, chlist.ch_title, chlist.ch_url, chlist.ch_LtstFree, chlist.ch_PrmFree, chlist.ch_thumb ,ranking.* FROM ranking INNER JOIN chlist ON ranking.ch_id = chlist.ch_id WHERE chlist.syear = ${syear} AND chlist.sseason = ${sseason} AND ranking.raddtime > '${between[0]}' AND ranking.raddtime < '${between[1]}' ORDER BY ${order} ASC LIMIT ${limit} OFFSET ${offset}`;
        console.log(sql);
        let { results } = await c.env.DB.prepare(sql).all();
        return c.json({ result: results });
      } catch (e) {
        return c.json({ error: String(e) }, 500);
      }
    }
    try {
      const sql = `SELECT chlist.syear, chlist.sseason, ranking.* FROM ranking INNER JOIN chlist ON ranking.ch_id = chlist.ch_id WHERE chlist.syear = ${syear} AND chlist.sseason = ${sseason} AND ranking.raddtime > '${between[0]}' AND ranking.raddtime < '${between[1]}'`;
      console.log(sql);
      let { results } = await c.env.DB.prepare(sql).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: String(e) }, 500);
    }
  }
  try {
    let { results } = await c.env.DB.prepare("SELECT * FROM ranking").all();
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

export default rankingGet;
