import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Home Page", () => {
  test("redirects to /auth-page if not logged in", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/auth-page");
  });
});
