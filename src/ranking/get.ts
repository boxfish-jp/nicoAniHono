import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const rankingGet = new Hono<{ Bindings: Bindings }>();

rankingGet.get("/", async (c) => {
  const ch_id = c.req.query("ch_id");
  const raddtime = c.req.query("raddtime");
  const syear = c.req.query("syear");
  const sseason = c.req.query("sseason");
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
    try {
      let { results } = await c.env.DB.prepare(
        `SELECT chlist.syear, chlist.sseason, ranking.* FROM ranking INNER JOIN chlist ON ranking.ch_id = chlist.ch_id WHERE chlist.syear = ${syear} AND chlist.sseason = ${sseason} AND raddtime < "${raddtime}" ORDER BY raddtime DESC LIMIT 1`
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
