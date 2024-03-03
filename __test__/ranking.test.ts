const parseRanking = async (data: Response) =>
  (await data.json()) as {
    result: {
      ranking_id: number;
      caddtime: string;
      ch_id: number;
      r_current_seq: number;
      r_total_view: number;
      r_total_mylist: number;
      r_total_comment: number;
      r_ave_view: number;
      r_ave_comment: number;
      r_ave_mylist: number;
      r_ave_view_rank: number;
      r_ave_mylist_rank: number;
      r_ave_comment_rank: number;
      r_diff_view: number;
      r_diff_comment: number;
      r_diff_mylist: number;
    }[];
  };

test("ranking", async () => {
  const createData = await fetch(
    "http://localhost:8787/ranking/create?ch_id=9000&r_current_seq=1&r_total_view=50000&r_total_mylist=51000&r_total_comment=52000&r_ave_view=45000&r_ave_comment=45000&r_ave_mylist=45000&r_ave_view_rank=30&r_ave_mylist_rank=31&r_ave_comment_rank=32&r_diff_view=400&r_diff_comment=400&r_diff_mylist=400&raddtime=2024-03-02 0:00:00"
  );
  const createResult = await createData.json();
  expect(createResult).toEqual({ result: [] });

  const getData0 = await fetch(
    "http://localhost:8787/ranking?ch_id=9000&raddtime=2024-03-01 12:00:00"
  );
  expect(getData0.status).toBe(200);
  const getResult0 = await parseRanking(getData0);
  expect(getResult0.result.length).toBe(0);

  const getData1 = await fetch("http://localhost:8787/ranking");
  expect(getData1.status).toBe(200);
  const getResult1 = await parseRanking(getData1);
  expect(getResult1.result.length).toBeGreaterThan(0);

  if (getResult1.result.length > 0) {
    const targetId = getResult1.result[0].ranking_id;
    const deleteData = await fetch(
      `http://localhost:8787/ranking/delete/${targetId}`
    );
    expect(deleteData.status).toBe(200);

    const confirmData = await fetch("http://localhost:8787/ranking?ch_id=9000");
    expect(confirmData.status).toBe(200);

    const confirmResult = await parseRanking(confirmData);
    expect(confirmResult.result.length).toBe(0);
  }
});
