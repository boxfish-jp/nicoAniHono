const parseChlist = async (data: Response) =>
  (await data.json()) as {
    result: {
      chlist_id: number;
      caddtime: string;
      ch_id: number;
      ch_NaniTag: string;
      ch_title: string;
      ch_url: string;
      ch_detail: string;
      ch_LtstFree: number;
      ch_PrmFree: number;
      syear: number;
      sseason: number;
      ch_twt: string;
      ch_site: string;
      ch_thumb: string;
    }[];
  };

test("chlist", async () => {
  const data = await fetch(
    "http://localhost:8787/chlist/create?ch_id=1000&ch_NaniTag=test2&ch_title=test2&ch_url=localhost2&ch_detail=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&ch_LtstFree=1&ch_PrmFree=0&syear=2024&sseason=1&ch_twt=boxfish_jp&ch_site=nothing&ch_thumb=thumb"
  );
  expect(data.status).toBe(200);
  const result = await data.json();

  expect(result).toEqual({ result: [] });

  const getDataFromTag = await fetch(
    "http://localhost:8787/chlist?ch_NaniTag=test2"
  );
  expect(getDataFromTag.status).toBe(200);
  const getResultFromTag = await parseChlist(getDataFromTag);
  expect(getResultFromTag.result.length).toBeGreaterThan(0);

  const getData0 = await fetch("http://localhost:8787/chlist?ch_id=2000");
  expect(getData0.status).toBe(200);
  const getResult0 = await parseChlist(getData0);
  expect(getResult0.result.length).toBe(0);

  const getData1 = await fetch(
    "http://localhost:8787/chlist?syear=2024&sseason=1"
  );
  const getResult1 = await parseChlist(getData1);
  expect(getResult1.result.length).toBeGreaterThan(0);

  if (getResult1.result.length > 0) {
    const targetId = getResult1.result[0].chlist_id;
    const deleteData = await fetch(
      `http://localhost:8787/chlist/delete/${targetId}`
    );
    expect(deleteData.status).toBe(200);

    const confirmData = await fetch("http://localhost:8787/chlist?ch_id=1000");
    const confirmResult = await parseChlist(confirmData);
    expect(confirmResult.result.length).toBe(0);
  }
});
