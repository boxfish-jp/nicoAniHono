import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const chlistCreate = new Hono<{ Bindings: Bindings }>();

chlistCreate.get("/create", async (c) => {
  const ch_id = c.req.query("ch_id");
  const ch_NaniTag = c.req.query("ch_NaniTag");
  let ch_title = c.req.query("ch_title");
  const ch_url = c.req.query("ch_url");
  let ch_detail = c.req.query("ch_detail");
  const ch_LtstFree = c.req.query("ch_LtstFree");
  const ch_PrmFree = c.req.query("ch_PrmFree");
  const syear = c.req.query("syear");
  const sseason = c.req.query("sseason");
  const ch_twt = c.req.query("ch_twt");
  const ch_site = c.req.query("ch_site");
  const ch_thumb = c.req.query("ch_thumb");
  const encode = c.req.query("encode");
  if (
    !ch_id ||
    !ch_NaniTag ||
    !ch_title ||
    !ch_url ||
    !ch_detail ||
    !ch_LtstFree ||
    !ch_PrmFree ||
    !syear ||
    !sseason ||
    !ch_twt ||
    !ch_site ||
    !ch_thumb
  ) {
    return c.json(
      {
        error: "Invalid parameter",
        url: {
          ch_id: ch_id,
          ch_NaniTag: ch_NaniTag,
          ch_title: ch_title,
          ch_url: ch_url,
          ch_detail: ch_detail,
          ch_latestFree: ch_LtstFree,
          ch_premium: ch_PrmFree,
          syear: syear,
          sseason: sseason,
          ch_twt: ch_twt,
          ch_site: ch_site,
          ch_thumb: ch_thumb,
        },
      },
      400
    );
  }
  if (encode === "true") {
    ch_title = decodeURIComponent(ch_title).replace(/'/g, "''");
    ch_detail = decodeURIComponent(ch_detail).replace(/'/g, "''");
  }

  try {
    let { results } = await c.env.DB.prepare(
      `SELECT * FROM chlist WHERE ch_id = ${ch_id}`
    ).all();
    if (results.length < 1) {
      try {
        const sql = `INSERT INTO chlist (ch_id, ch_NaniTag, ch_title, ch_url, ch_detail, ch_LtstFree, ch_PrmFree,  ch_twt, ch_site, ch_thumb) VALUES ('${ch_id}', '${ch_NaniTag}', '${ch_title}', '${ch_url}', '${ch_detail}', '${ch_LtstFree}', '${ch_PrmFree}', '${ch_twt}', '${ch_site}', '${ch_thumb}')`;
        console.log(sql);
        let { results } = await c.env.DB.prepare(sql).all();
        // console.log(results);
      } catch (e) {
        return c.json({ error: e }, 500);
      }
    }
    try {
      const sql = `SELECT * FROM schedule WHERE ch_id = ${ch_id} AND syear = ${syear} AND sseason = ${sseason}`;
      let { results } = await c.env.DB.prepare(sql).all();
      if (results.length > 0) {
        return c.json({ error: "Already exists" }, 200);
      }
    } catch (e) {}
    try {
      const sql = `INSERT INTO schedule (ch_id, syear, sseason) VALUES ('${ch_id}', '${syear}', '${sseason}')`;
      console.log(sql);
      let { results } = await c.env.DB.prepare(sql).all();
      //console.log(results);
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

export default chlistCreate;
