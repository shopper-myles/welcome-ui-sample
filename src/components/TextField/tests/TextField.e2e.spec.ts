import { test, expect } from "@playwright/test";

test.describe("TextField Component E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/src/components/TextField/TextField.html");
  });

  test("displays all input types", async ({ page }) => {
    await expect(page.getByTestId("text-basic-input")).toBeVisible();
    await expect(page.getByTestId("email-basic-input")).toBeVisible();
    await expect(page.getByTestId("password-basic-input")).toBeVisible();
    await expect(page.getByTestId("tel-basic-input")).toBeVisible();
    await expect(page.getByTestId("number-basic-input")).toBeVisible();
    await expect(page.getByTestId("url-basic-input")).toBeVisible();
  });

  test("displays different sizes", async ({ page }) => {
    await expect(page.getByTestId("text-small-input")).toBeVisible();
    await expect(page.getByTestId("text-medium-input")).toBeVisible();
    await expect(page.getByTestId("text-large-input")).toBeVisible();

    // Test that they have different sizes
    const smallInput = page.getByTestId("text-small-input");
    const mediumInput = page.getByTestId("text-medium-input");
    const largeInput = page.getByTestId("text-large-input");

    const smallHeight = await smallInput.evaluate(
      (el) => el.getBoundingClientRect().height
    );
    const mediumHeight = await mediumInput.evaluate(
      (el) => el.getBoundingClientRect().height
    );
    const largeHeight = await largeInput.evaluate(
      (el) => el.getBoundingClientRect().height
    );

    expect(smallHeight).toBeLessThan(mediumHeight);
    expect(mediumHeight).toBeLessThan(largeHeight);
  });

  test("displays different states", async ({ page }) => {
    await expect(page.getByTestId("text-required-input")).toBeVisible();
    await expect(page.getByTestId("text-error-input")).toBeVisible();
    await expect(page.getByTestId("text-disabled-input")).toBeVisible();
    await expect(page.getByTestId("text-helper-input")).toBeVisible();

    // Test disabled state
    await expect(page.getByTestId("text-disabled-input")).toBeDisabled();

    // Test required indicator
    await expect(page.locator("text=*")).toBeVisible();

    // Test helper text
    await expect(page.getByTestId("text-helper-helper")).toContainText(
      "This is helpful information"
    );
    await expect(page.getByTestId("text-error-helper")).toContainText(
      "Something went wrong"
    );
  });

  test("interactive form works", async ({ page }) => {
    const nameInput = page.getByTestId("interactive-name-input");
    const emailInput = page.getByTestId("interactive-email-input");
    const submitButton = page.getByRole("button", { name: "Submit Form" });

    // Test name validation
    await nameInput.fill("A"); // Too short
    await expect(page.getByTestId("interactive-name-helper")).toContainText(
      "at least 2 characters"
    );

    await nameInput.fill("John Doe"); // Valid
    await expect(page.getByTestId("interactive-name-helper")).toContainText(
      "Enter your full name"
    );

    // Test email validation
    await emailInput.fill("invalid-email"); // Invalid
    await expect(page.getByTestId("interactive-email-helper")).toContainText(
      "valid email address"
    );

    await emailInput.fill("john@example.com"); // Valid
    await expect(page.getByTestId("interactive-email-helper")).toContainText(
      "We'll never share"
    );

    // Test form submission
    await submitButton.click();

    // Should show success alert (we'll just check it doesn't error)
    // In a real app, you might check for a success message or navigation
  });

  test("inputs accept user input", async ({ page }) => {
    const textInput = page.getByTestId("text-basic-input");

    await textInput.fill("Hello World");
    await expect(textInput).toHaveValue("Hello World");

    await textInput.fill("");
    await expect(textInput).toHaveValue("");
  });

  test("has navigation links", async ({ page }) => {
    await expect(page.getByRole("link", { name: "← Main App" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Button Tests" })
    ).toBeVisible();
  });

  test("navigation links work", async ({ page }) => {
    await page.getByRole("link", { name: "← Main App" }).click();
    await expect(page).toHaveURL("/");
  });

  test("page has proper title", async ({ page }) => {
    await expect(page).toHaveTitle("TextField Component Test");
  });

  test("focus and blur work correctly", async ({ page }) => {
    const input = page.getByTestId("text-basic-input");

    await input.focus();
    await expect(input).toBeFocused();

    await input.blur();
    await expect(input).not.toBeFocused();
  });

  test("placeholder text is visible", async ({ page }) => {
    const nameInput = page.getByTestId("text-basic-input");
    await expect(nameInput).toHaveAttribute("placeholder", "Enter your name");
  });

  test("labels are associated with inputs", async ({ page }) => {
    // Click on label should focus the input
    await page.getByText("Name").click();
    await expect(page.getByTestId("text-basic-input")).toBeFocused();
  });

  test("error states display correctly", async ({ page }) => {
    const errorInput = page.getByTestId("text-error-input");
    const errorHelper = page.getByTestId("text-error-helper");

    await expect(errorInput).toHaveValue("Invalid value");
    await expect(errorHelper).toContainText("Something went wrong");
  });
});
