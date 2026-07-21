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

  test("tool pin adds pinned section on homepage", async ({ page }) => {
    await page.goto("/");
    const pinButton = page.getByRole("button", { name: /pin white screen/i }).first();
    await pinButton.click();
    await expect(page.getByRole("heading", { name: "Pinned", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /white screen/i }).first()).toBeVisible();
  });

  test("pin star does not overlap tool title", async ({ page }) => {
    await page.goto("/");
    const layout = await page.evaluate(() => {
      const pinBtn = document.querySelector<HTMLElement>(
        '[aria-label*="Pin White Screen" i], [aria-label*="Unpin White Screen" i]',
      );
      const card = pinBtn?.closest(".tool-card");
      const title = card?.querySelector<HTMLElement>(".font-medium.text-page");
      if (!pinBtn || !title) return { error: "missing elements" as const };
      const pinRect = pinBtn.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();
      const overlaps =
        pinRect.bottom > titleRect.top &&
        pinRect.right > titleRect.left &&
        pinRect.left < titleRect.right &&
        pinRect.top < titleRect.bottom;
      return {
        overlaps,
        gap: titleRect.top - pinRect.bottom,
      };
    });
    expect(layout).not.toHaveProperty("error");
    expect(layout.overlaps).toBe(false);
    expect(layout.gap).toBeGreaterThan(0);
  });

  test("changelog badge opens v2.2 release notes", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /what's new in v2\.2/i }).click();
    await expect(page.getByRole("dialog", { name: /release notes/i })).toBeVisible();
    await expect(page.getByText("Version 2.2")).toBeVisible();
  });
});
