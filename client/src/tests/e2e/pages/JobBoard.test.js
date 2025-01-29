import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: "123",
        name: "Test User",
        email: "test@gmail.com",
      })
    );
  });

  await page.goto("http://localhost:3000/job-board");
});

const inputFields = [
  { label: "URL Link *", value: "fakeLink.com" },
  { label: "Job Name *", value: "Software Engineer" },
  { label: "Company *", value: "Google" },
  { label: "Category *", value: "CS" },
  { label: "Point of Contact (optional)", value: "John" },
];

test.describe("Job Board", () => {
  test("should render the page", async ({ page }) => {
    const jobBoard = page.getByTestId("job-board");

    await expect(jobBoard).toBeVisible();
  });

  test("should clear text input inputFields when clear form is clicked", async ({
    page,
  }) => {
    console.log();
    for (const inputField of inputFields) {
      await page.getByLabel(inputField.label).fill(inputField.value);
    }

    for (const inputField of inputFields) {
      const inputValue = await page.getByLabel(inputField.label).inputValue();
      expect(inputValue).toBe(inputField.value);
    }

    await page.getByRole("button", { name: "Clear Form" }).click();

    for (const inputField of inputFields) {
      const clearedValue = await page.getByLabel(inputField.label).inputValue();
      expect(clearedValue).toBe("");
    }
  });

  test("should show an error when job name and company fields are not found ", async ({
    page,
  }) => {
    const urlLink = inputFields[0].value;
    await page.getByLabel("URL Link *").fill(urlLink);
    const inputValue = await page.getByLabel("URL Link *").inputValue();

    expect(inputValue).toBe(urlLink);

    const jobErrorMessage = page.locator("text=Job title not found");
    const companyErrorMessage = page.locator("text=Company not found");

    await expect(jobErrorMessage).toBeVisible();
    await expect(companyErrorMessage).toBeVisible();
  });
});
