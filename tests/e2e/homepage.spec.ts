import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the page", async ({ page }) => {
    await expect(page).toHaveTitle(/Next/);
  });

  test("should have content", async ({ page }) => {
    const content = await page.textContent("body");
    expect(content).toBeTruthy();
  });
});
