import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/season", async (c) => {
  const syear = c.req.query("syear");
  const sseason = c.req.query("sseason");
  if (!syear || !sseason) {
    try {
      let { results } = await c.env.DB.prepare("SELECT * FROM season").all();
      return c.json(results);
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  }
  try {
    let { results } = await c.env.DB.prepare(
      `SELECT * FROM season WHERE syear = ${syear} AND sseason = ${sseason}`
    ).all();
    return c.json(results);
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

app.get("season/create", async (c) => {
  const syear = c.req.query("syear");
  const sseason = c.req.query("sseason");
  const sdesc = c.req.query("sdesc");
  if (!syear || !sseason || !sdesc) {
    return c.json({ error: "Invalid parameter" }, 400);
  }
  try {
    const sql = `INSERT INTO season (syear, sseason, sdesc) VALUES ('${syear}', '${sseason}', '${sdesc}')`;
    console.log(sql);
    let { results } = await c.env.DB.prepare(sql).all();
    console.log(results);
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

app.get("/season/delete/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "Invalid parameter" }, 400);
  }
  try {
    const sql = `DELETE FROM season WHERE season_id = '${id}'`;
    console.log(sql);
    let { results } = await c.env.DB.prepare(sql).all();
    console.log(results);
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

app.get("/chlist", async (c) => {
  const ch_id = c.req.query("ch_id");
  const syear = c.req.query("syear");
  const sseason = c.req.query("sseason");
  if (ch_id) {
    try {
      let { results } = await c.env.DB.prepare(
        `SELECT * FROM chlist WHERE ch_id = ${ch_id}`
      ).all();
      return c.json(results);
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  }
  try {
    let { results } = await c.env.DB.prepare("SELECT * FROM chlist").all();
    return c.json(results);
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

app.get("/chlist/create", async (c) => {
  const ch_id = c.req.query("ch_id");
  const ch_title = c.req.query("ch_title");
  const ch_url = c.req.query("ch_url");
  const ch_detail = c.req.query("ch_detail");
  const ch_LtstFree = c.req.query("ch_LtstFree");
  const ch_PrmFree = c.req.query("ch_PrmFree");
  const syear = c.req.query("syear");
  const sseason = c.req.query("sseason");
  const ch_twt = c.req.query("ch_twt");
  const ch_site = c.req.query("ch_site");
  const ch_thumb = c.req.query("ch_thumb");
  if (
    !ch_id ||
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
    return c.json({ error: "Invalid parameter" }, 400);
  }
  try {
    const sql = `INSERT INTO chlist (ch_id, ch_title, ch_url, ch_detail, ch_LtstFree, ch_PrmFree, syear, sseason, ch_twt, ch_site, ch_thumb) VALUES ('${ch_id}', '${ch_title}', '${ch_url}', '${ch_detail}', '${ch_LtstFree}', '${ch_PrmFree}', '${syear}', '${sseason}', '${ch_twt}', '${ch_site}', '${ch_thumb}')`;
    console.log(sql);
    let { results } = await c.env.DB.prepare(sql).all();
    console.log(results);
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

export default app;
