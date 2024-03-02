import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const rankingCreate = new Hono<{ Bindings: Bindings }>();

rankingCreate.get("/create", async (c) => {
  const ch_id = c.req.query("ch_id");
  const r_current_seq = c.req.query("r_current_seq");
  const r_total_view = c.req.query("r_total_view");
  const r_total_mylist = c.req.query("r_total_mylist");
  const r_total_comment = c.req.query("r_total_comment");
  const r_ave_view = c.req.query("r_ave_view");
  const r_ave_comment = c.req.query("r_ave_comment");
  const r_ave_mylist = c.req.query("r_ave_mylist");
  const r_ave_view_rank = c.req.query("r_ave_view_rank");
  const r_ave_mylist_rank = c.req.query("r_ave_mylist_rank");
  const r_ave_comment_rank = c.req.query("r_ave_comment_rank");
  const r_diff_view = c.req.query("r_diff_view");
  const r_diff_comment = c.req.query("r_diff_comment");
  const r_diff_mylist = c.req.query("r_diff_mylist");
  const raddtime = c.req.query("raddtime");

  if (
    !ch_id ||
    !r_current_seq ||
    !r_total_view ||
    !r_total_mylist ||
    !r_total_comment ||
    !r_ave_view ||
    !r_ave_comment ||
    !r_ave_mylist ||
    !r_ave_view_rank ||
    !r_ave_mylist_rank ||
    !r_ave_comment_rank ||
    !r_diff_view ||
    !r_diff_comment ||
    !r_diff_mylist
  ) {
    return c.json({ error: "Invalid parameter" }, 400);
  }
  if (!raddtime) {
    try {
      const sql = `INSERT INTO ranking (ch_id, r_current_seq, r_total_view, r_total_mylist, r_total_comment, r_ave_view, r_ave_comment, r_ave_mylist, r_ave_view_rank, r_ave_mylist_rank, r_ave_comment_rank, r_diff_view, r_diff_comment, r_diff_mylist) VALUES ('${ch_id}', '${r_current_seq}', '${r_total_view}', '${r_total_mylist}', '${r_total_comment}', '${r_ave_view}', '${r_ave_comment}', '${r_ave_mylist}', '${r_ave_view_rank}', '${r_ave_mylist_rank}', '${r_ave_comment_rank}', '${r_diff_view}', '${r_diff_comment}', '${r_diff_mylist}')`;
      let { results } = await c.env.DB.prepare(sql).all();
      console.log(results);
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: String(e) }, 500);
    }
  } else {
    try {
      const sql = `INSERT INTO ranking (ch_id, r_current_seq, r_total_view, r_total_mylist, r_total_comment, r_ave_view, r_ave_comment, r_ave_mylist, r_ave_view_rank, r_ave_mylist_rank, r_ave_comment_rank, r_diff_view, r_diff_comment, r_diff_mylist, raddtime) VALUES ('${ch_id}', '${r_current_seq}', '${r_total_view}', '${r_total_mylist}', '${r_total_comment}', '${r_ave_view}', '${r_ave_comment}', '${r_ave_mylist}', '${r_ave_view_rank}', '${r_ave_mylist_rank}', '${r_ave_comment_rank}', '${r_diff_view}', '${r_diff_comment}', '${r_diff_mylist}', '${raddtime}')`;
      let { results } = await c.env.DB.prepare(sql).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: String(e) }, 500);
    }
  }
});

export default rankingCreate;
