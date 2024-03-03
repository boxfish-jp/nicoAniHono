const parseVideos = async (data: Response) =>
  (await data.json()) as {
    result: {
      video_id: number;
      vaddtime: string;
      ch_id: number;
      ch_seq: number;
      ch_seq_url: string;
      ch_seq_id: number;
      ch_seq_title: string;
      ch_seq_thumb: string;
      ch_seq_detail: string;
      ch_seq_posted: string;
    }[];
  };

test("videos", async () => {
  const createData = await fetch(
    "http://localhost:8787/videos/create?ch_id=5563&ch_seq=2&ch_seq_url=65432&ch_seq_id=65432&ch_seq_title=テスト&ch_seq_thumb=testing&ch_seq_desc=テストテストテストテスト&ch_seq_posted=2024/03/01 00:00:00"
  );
  const createResult = await createData.json();
  expect(createResult).toEqual({ result: [] });

  const getDataFromseqId = await fetch(
    "http://localhost:8787/videos?ch_seq_id=65432"
  );
  const getResultFromseqId = await parseVideos(getDataFromseqId);
  expect(getResultFromseqId.result.length).toBe(1);

  const getData0 = await fetch(
    "http://localhost:8787/videos?ch_id=5563&ch_seq=3"
  );
  const getResult0 = await parseVideos(getData0);
  expect(getResult0.result.length).toBe(0);

  const getData1 = await fetch("http://localhost:8787/videos?ch_id=5563");
  const getResult1 = await parseVideos(getData1);
  expect(getResult1.result.length).toBe(1);

  if (getResult1.result.length > 0) {
    const targetId = getResult1.result[0].video_id;
    const deleteData = await fetch(
      `http://localhost:8787/videos/delete/${targetId}`
    );
    const deleteResult = await deleteData.json();
    expect(deleteResult).toEqual({ result: [] });

    const confirmData = await fetch(
      "http://localhost:8787/videos?ch_seq_url=0005"
    );
    const confirmResult = await parseVideos(confirmData);
    expect(confirmResult.result.length).toBe(0);
  }
});
