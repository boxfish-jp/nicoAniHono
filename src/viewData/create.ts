import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const viewDataCreate = new Hono<{ Bindings: Bindings }>();

viewDataCreate.get("/create", async (c) => {
  const ch_id = c.req.query("ch_id");
  const ch_seq = c.req.query("ch_seq");
  const ch_seq_id = c.req.query("ch_seq_id");
  const view_amount = c.req.query("view_amount");
  const comment_amount = c.req.query("comment_amount");
  const mylist_amount = c.req.query("mylist_amount");
  const diff_view = c.req.query("diff_view");
  const diff_comment = c.req.query("diff_comment");
  const diff_mylist = c.req.query("diff_mylist");
  const daddtime = c.req.query("daddtime");

  if (
    !ch_id ||
    !ch_seq ||
    !ch_seq_id ||
    !view_amount ||
    !comment_amount ||
    !mylist_amount ||
    !diff_view ||
    !diff_comment ||
    !diff_mylist
  ) {
    return c.json({ error: "Invalid parameter" }, 400);
  }
  if (daddtime) {
    try {
      const sql = `INSERT INTO viewData (ch_id, ch_seq, ch_seq_id, view_amount, comment_amount, mylist_amount, diff_view, diff_comment, diff_mylist, daddtime) VALUES ('${ch_id}', '${ch_seq}', '${ch_seq_id}', '${view_amount}', '${comment_amount}', '${mylist_amount}', '${diff_view}', '${diff_comment}', '${diff_mylist}', '${daddtime}')`;
      let { results } = await c.env.DB.prepare(sql).all();
      return c.json({ result: results });
    } catch (e) {
      return c.json({ error: String(e) }, 500);
    }
  }
  try {
    const sql = `INSERT INTO viewData (ch_id, ch_seq, ch_seq_id, view_amount, comment_amount, mylist_amount, diff_view, diff_comment, diff_mylist) VALUES ('${ch_id}', '${ch_seq}', '${ch_seq_id}', '${view_amount}', '${comment_amount}', '${mylist_amount}', '${diff_view}', '${diff_comment}', '${diff_mylist}')`;
    let { results } = await c.env.DB.prepare(sql).all();
    return c.json({ result: results });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

export default viewDataCreate;
