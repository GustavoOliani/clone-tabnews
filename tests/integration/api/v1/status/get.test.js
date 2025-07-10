let response;
let responseBody;
beforeAll(async () => {
  response = await fetch("http://localhost:3000/api/v1/status");
  responseBody = await response.json();
});

test("GET to api/v1/status should return 200", async () => {
  expect(response.status).toBe(200);
});

test("GET to api/v1/status should contain updatedAt as date", async () => {
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

});

test("GET to api/v1/status should contain version as '16'", async () => {
  await expect(responseBody.dependencies.database.version).toBe("16.0");
});

test("GET to api/v1/status should contain max_connections as 100", async () => {
  expect(responseBody.dependencies.database.max_connections).toBe(100);
});

test("GET to api/v1/status should contain active_connections as 1", async () => {
  expect(responseBody.dependencies.database.active_connections).toBe(1);
});
