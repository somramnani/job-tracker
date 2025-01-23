test("TextEncoder is globally defined in Jest", () => {
  expect(global.TextEncoder).toBeDefined();
});
