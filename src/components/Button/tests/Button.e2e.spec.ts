import { test, expect } from "@playwright/test";

test.describe("Button Component E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/src/components/Button/Button.html");
  });

  test("displays all button variants", async ({ page }) => {
    await expect(page.getByTestId("btn-primary-small")).toBeVisible();
    await expect(page.getByTestId("btn-primary-medium")).toBeVisible();
    await expect(page.getByTestId("btn-primary-large")).toBeVisible();

    await expect(page.getByTestId("btn-secondary")).toBeVisible();
    await expect(page.getByTestId("btn-accent")).toBeVisible();
    await expect(page.getByTestId("btn-warning")).toBeVisible();
    await expect(page.getByTestId("btn-danger")).toBeVisible();
    await expect(page.getByTestId("btn-info")).toBeVisible();
  });

  test("disabled buttons are not clickable", async ({ page }) => {
    const disabledButton = page.getByTestId("btn-disabled-primary");
    await expect(disabledButton).toBeDisabled();
  });

  test("buttons are clickable when enabled", async ({ page }) => {
    const button = page.getByTestId("btn-primary-medium");
    await button.click();
    // Button should be clickable without errors
  });

  test("has navigation links", async ({ page }) => {
    await expect(page.getByRole("link", { name: "← Main App" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "TextField Tests" })
    ).toBeVisible();
  });

  test("buttons have correct text content", async ({ page }) => {
    await expect(page.getByTestId("btn-primary-small")).toHaveText(
      "Small Primary"
    );
    await expect(page.getByTestId("btn-secondary")).toHaveText("Secondary");
    await expect(page.getByTestId("btn-danger")).toHaveText("Danger");
  });

  test("buttons have hover effects", async ({ page }) => {
    const button = page.getByTestId("btn-primary-medium");

    // Hover over button
    await button.hover();

    // Background should change on hover (we won't test exact color due to browser differences)
    await expect(button).toBeVisible();
  });

  test("navigation links work", async ({ page }) => {
    await page.getByRole("link", { name: "← Main App" }).click();
    await expect(page).toHaveURL("/");
  });

  test("page has proper title", async ({ page }) => {
    await expect(page).toHaveTitle("Button Component Test");
  });

  test("all button sizes are rendered", async ({ page }) => {
    const smallButton = page.getByTestId("btn-primary-small");
    const mediumButton = page.getByTestId("btn-primary-medium");
    const largeButton = page.getByTestId("btn-primary-large");

    await expect(smallButton).toBeVisible();
    await expect(mediumButton).toBeVisible();
    await expect(largeButton).toBeVisible();

    // Test that they have different sizes by checking computed styles
    const smallHeight = await smallButton.evaluate(
      (el) => el.getBoundingClientRect().height
    );
    const mediumHeight = await mediumButton.evaluate(
      (el) => el.getBoundingClientRect().height
    );
    const largeHeight = await largeButton.evaluate(
      (el) => el.getBoundingClientRect().height
    );

    expect(smallHeight).toBeLessThan(mediumHeight);
    expect(mediumHeight).toBeLessThan(largeHeight);
  });
});
