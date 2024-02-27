import app from "../src";

describe("season", () => {
  test("season/create error", async () => {
    const res = await app.request("/season/create");
    expect(res.status).toBe(400);
  });
  test("GET /season", async () => {
    const res = await app.request("/season");
    const parsed = await res.json();
    console.log(parsed);
    expect(res.status).toBe(200);
  });
});
