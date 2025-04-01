test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch(
    "https://turbo-fiesta-v7v6rpv44vgh64g7-3000.app.github.dev/api/v1/status",
  );
  expect(response.status).toBe(200);
});
