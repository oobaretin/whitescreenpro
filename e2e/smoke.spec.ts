import { test, expect } from "@playwright/test";

test.describe("smoke", () => {
  test("homepage loads with tool search", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("searchbox", { name: /search tools/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /white screen/i }).first()).toBeVisible();
  });

  test("white screen tool renders display area", async ({ page }) => {
    await page.goto("/white-screen");
    await expect(page.locator("[data-display-area]").first()).toBeAttached({
      timeout: 15_000,
    });
  });

  test("shortcuts modal opens from footer", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Shortcuts" }).click();
    await expect(
      page.getByRole("dialog", { name: /keyboard shortcuts/i }),
    ).toBeVisible();
  });
});
