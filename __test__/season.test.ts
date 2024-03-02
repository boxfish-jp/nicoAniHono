test("season", async () => {
  const createData = await fetch(
    "http://localhost:8787/season/create?syear=2024&sseason=2&sdesc=2024年春アニメ"
  );
  const createResult = await createData.json();
  expect(createResult).toEqual({ result: [] });

  const getData = await fetch("http://localhost:8787/season");
  expect(getData.status).toBe(200);
  const getResult = (await getData.json()) as {
    result: {
      season_id: number;
      syear: number;
      sseason: number;
      sdesc: string;
    }[];
  };
  expect(getResult.result.length).toBeGreaterThan(0);

  if (getResult.result.length > 0) {
    const targetId = getResult.result[0].season_id;
    const deleteData = await fetch(
      `http://localhost:8787/season/delete/${targetId}`
    );
    expect(deleteData.status).toBe(200);

    const confirmData = await fetch(
      "http://localhost:8787/season?syear=2024&sseason=2"
    );
    const confirmResult = (await confirmData.json()) as {
      result: {
        season_id: number;
        syear: number;
        sseason: number;
        sdesc: string;
      }[];
    };
    expect(confirmResult.result.length).toBe(0);
  }
});
