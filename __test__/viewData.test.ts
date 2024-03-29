const parseViewData = async (data: Response) =>
  (await data.json()) as {
    result: {
      viewData_id: number;
      daddtime: string;
      ch_id: number;
      ch_seq: number;
      ch_seq_id: number;
      view_amount: number;
      comment_amount: number;
      mylist_amount: number;
      diff_view: number;
      diff_comment: number;
      diff_mylist: number;
    }[];
  };

test("viewData", async () => {
  const date = new Date(1706877921000);
  const createData = await fetch(
    "http://localhost:8787/viewData/create?ch_id=4678&ch_seq=1&ch_seq_id=65432&view_amount=1000&comment_amount=2000&mylist_amount=3000&diff_view=10&diff_comment=20&diff_mylist=30" +
      `&daddtime=${date}`
  );
  const createResult = await createData.json();
  expect(createResult).toEqual({ result: [] });

  const getDataFromseqId = await fetch(
    "http://localhost:8787/viewData?ch_seq_id=65432"
  );
  const getResultFromseqId = await parseViewData(getDataFromseqId);
  expect(getResultFromseqId.result.length).toBe(1);

  const now = new Date(1706867921000);
  const getDataFromseqIdAndTime = await fetch(
    "http://localhost:8787/viewData?ch_seq_id=65432&daddtime=" + now
  );
  const getResultFromseqIdAndTime = await parseViewData(
    getDataFromseqIdAndTime
  );
  expect(getResultFromseqIdAndTime.result.length).toBe(0);

  const getData = await fetch("http://localhost:8787/viewData");
  const getResult = await parseViewData(getData);
  expect(getResult.result.length).toBeGreaterThan(0);

  if (getResult.result.length > 0) {
    const targetId = getResult.result[0].viewData_id;
    const deleteData = await fetch(
      `http://localhost:8787/viewData/delete/${targetId}`
    );
    const deleteResult = await deleteData.json();
    expect(deleteResult).toEqual({ result: [] });

    const confirmData = await fetch(
      "http://localhost:8787/viewData?ch_id=4678&ch_seq=1"
    );
    const confirmResult = await parseViewData(confirmData);
    expect(confirmResult.result.length).toBe(0);
  }
});
