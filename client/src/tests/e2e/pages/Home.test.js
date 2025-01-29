import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("localhost:3000");
});

test.describe("Home Page", () => {
  test("should render the page", async ({ page }) => {
    const homePage = page.getByTestId("home-page");

    await expect(homePage).toBeVisible();
  });
});
