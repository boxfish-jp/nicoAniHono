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
      const previous = betweenDay(
        new Date(new Date(raddtime).getTime() - 24 * 60 * 60 * 1000)
      );
      try {
        const sql = `SELECT current_ranking.ranking_id AS current_ranking_id,
    current_ranking.raddtime AS current_raddtime,
    current_ranking.ch_id AS current_ch_id,
    current_ranking.r_current_seq AS current_r_current_seq,
    current_ranking.r_total_view AS current_r_total_view,
    current_ranking.r_total_mylist AS current_r_total_mylist,
    current_ranking.r_total_comment AS current_r_total_comment,
    current_ranking.r_ave_view AS current_r_ave_view,
    current_ranking.r_ave_mylist AS current_r_ave_mylist,
    current_ranking.r_ave_comment AS current_r_ave_comment,
    current_ranking.r_ave_view_rank AS current_r_ave_view_rank,
    current_ranking.r_ave_mylist_rank AS current_r_ave_mylist_rank,
    current_ranking.r_ave_comment_rank AS current_r_ave_comment_rank,
    current_ranking.r_diff_view AS current_r_diff_view,
    current_ranking.r_diff_mylist AS current_r_diff_mylist,
    current_ranking.r_diff_comment AS current_r_diff_comment,
    previous_ranking.ranking_id AS previous_ranking_id,
    previous_ranking.raddtime AS previous_raddtime,
    previous_ranking.ch_id AS previous_ch_id,
    previous_ranking.r_ave_view_rank AS previous_r_ave_view_rank,
    previous_ranking.r_ave_mylist_rank AS previous_r_ave_mylist_rank,
    previous_ranking.r_ave_comment_rank AS previous_r_ave_comment_rank,
    chlist.syear AS syear,
    chlist.sseason AS sseason,
    chlist.ch_title,
    chlist.syear,
    chlist.sseason,
    chlist.ch_title,
    chlist.ch_url,
    chlist.ch_LtstFree,
    chlist.ch_PrmFree,
    chlist.ch_thumb
FROM
    ranking AS current_ranking
INNER JOIN 
    ranking AS previous_ranking ON current_ch_id = previous_ch_id AND current_raddtime > '${between[0]}' AND current_raddtime < '${between[1]}' AND
    previous_raddtime > '${previous[0]}' AND previous_raddtime < '${previous[1]}' AND current_ranking_id != previous_ranking_id 
INNER JOIN
    chlist ON current_ranking.ch_id = chlist.ch_id
WHERE
    chlist.syear = ${syear}
    AND chlist.sseason = ${sseason}
ORDER BY
    current_ranking.${order} ASC LIMIT ${limit} OFFSET ${offset};`;
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
