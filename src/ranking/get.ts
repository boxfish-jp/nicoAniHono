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
  if (ch_id) {
    if (raddtime) {
      try {
        let { results } = await c.env.DB.prepare(
          `SELECT * FROM ranking WHERE ch_id = ${ch_id} AND raddtime < "${raddtime} ORDER BY daddtime DESC LIMIT 1"`
        ).all();
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
    if (limit && offset) {
      try {
        let { results } = await c.env.DB.prepare(
          `SELECT chlist.syear, chlist.sseason, ranking.* FROM ranking INNER JOIN chlist ON ranking.ch_id = chlist.ch_id WHERE chlist.syear = ${syear} AND chlist.sseason = ${sseason} AND ranking.raddtime > '${between[0]}' AND ranking.raddtime < '${between[1]}' ORDER BY r_ave_view_rank DESC LIMIT ${limit} OFFSET ${offset}`
        ).all();
        return c.json({ result: results });
      } catch (e) {
        return c.json({ error: String(e) }, 500);
      }
    }
    try {
      let { results } = await c.env.DB.prepare(
        `SELECT chlist.syear, chlist.sseason, ranking.* FROM ranking INNER JOIN chlist ON ranking.ch_id = chlist.ch_id WHERE chlist.syear = ${syear} AND chlist.sseason = ${sseason} AND ranking.raddtime > '${between[0]}' AND ranking.raddtime < '${between[1]}'`
      ).all();
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
