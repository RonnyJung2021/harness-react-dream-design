import { expect, test } from "@playwright/test";

test.describe("文档站 E2E（V2 Button 基线）", () => {
  test("首页可访问且主内容区可见", async ({ page }) => {
    await page.goto("/");
    const main = page.getByTestId("doc-main");
    await expect(main).toBeVisible();
    await expect(main.getByRole("heading", { level: 1 })).toContainText("欢迎使用");
  });

  test("Button 文档路由、主内容区与视觉基线", async ({ page }) => {
    await page.goto("/components/button");
    await expect(page.getByTestId("doc-main")).toBeVisible();

    const buttonDoc = page.getByTestId("doc-page-button");
    await expect(buttonDoc).toBeVisible();
    await expect(buttonDoc.getByRole("heading", { level: 1 })).toContainText("Button");

    await expect(buttonDoc).toHaveScreenshot("button-doc-page.png");
  });
});
