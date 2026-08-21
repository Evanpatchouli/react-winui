import { expect, test } from "@playwright/test";

const screenshotOptions = {
  animations: "disabled",
  caret: "hide",
  scale: "css"
};

const panel = (page, testId) => page.getByTestId(testId);

test.beforeEach(async ({ page }) => {
  const defaultPropsWarnings = [];
  const consoleErrors = [];
  const runtimeErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
      if (message.text().includes("Support for defaultProps")) {
        defaultPropsWarnings.push(message.text());
      }
    }
  });
  page.on("pageerror", (error) => {
    runtimeErrors.push(error.message);
  });

  await page.goto("/");
  await expect(page.getByTestId("gallery-ready")).toHaveText("ready");
  await expect(page.getByTestId("image-state")).toHaveText("loaded");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(panel(page, "button-panel")).toBeVisible();
  expect(defaultPropsWarnings).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(runtimeErrors).toEqual([]);
});

test.describe("Public component visual baselines", () => {
  test("captures layout primitives in the light theme", async ({ page }) => {
    await expect(panel(page, "layout-panel")).toHaveScreenshot(
      "layout-light.png",
      screenshotOptions
    );
  });

  test("captures layout primitives in the dark theme", async ({ page }) => {
    await page.getByTestId("theme-dark").click();
    await expect(panel(page, "layout-panel")).toHaveScreenshot(
      "layout-dark.png",
      screenshotOptions
    );
  });

  test.describe("Button visual states", () => {
    test("captures the default and semantic variants", async ({ page }) => {
      await expect(panel(page, "button-panel")).toHaveScreenshot(
        "button-default.png",
        screenshotOptions
      );
    });

    test("captures the hover state", async ({ page }) => {
      await page.getByRole("button", { name: "Default" }).hover();

      await expect(panel(page, "button-panel")).toHaveScreenshot(
        "button-hover.png",
        screenshotOptions
      );
    });

    test("captures the pressed state", async ({ page }) => {
      const button = page.getByRole("button", { name: "Default" });
      const box = await button.boundingBox();

      expect(box).not.toBeNull();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();

      await expect(panel(page, "button-panel")).toHaveScreenshot(
        "button-pressed.png",
        screenshotOptions
      );

      await page.mouse.up();
    });

    test("captures the focus-visible state", async ({ page }) => {
      const button = page.getByRole("button", { name: "Default" });

      await button.focus();
      await expect(button).toBeFocused();
      await expect(panel(page, "button-panel")).toHaveScreenshot(
        "button-focus.png",
        screenshotOptions
      );
    });

    test("captures the disabled state", async ({ page }) => {
      await expect(page.getByRole("button", { name: "Disabled" })).toBeDisabled();
      await expect(panel(page, "button-panel")).toHaveScreenshot(
        "button-disabled.png",
        screenshotOptions
      );
    });

    test("captures the dark theme variants", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await expect(panel(page, "button-panel")).toHaveScreenshot(
        "button-dark.png",
        screenshotOptions
      );
    });
  });

  test.describe("Control and selection baselines", () => {
    test("captures the light form controls", async ({ page }) => {
      await expect(panel(page, "controls-panel")).toHaveScreenshot(
        "controls-light.png",
        screenshotOptions
      );
    });

    test("captures the dark form controls", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await expect(panel(page, "controls-panel")).toHaveScreenshot(
        "controls-dark.png",
        screenshotOptions
      );
    });

    test("captures selection controls in both themes", async ({ page }) => {
      await expect(panel(page, "selection-panel")).toHaveScreenshot(
        "selection-light.png",
        screenshotOptions
      );

      await page.getByTestId("theme-dark").click();
      await expect(panel(page, "selection-panel")).toHaveScreenshot(
        "selection-dark.png",
        screenshotOptions
      );
    });

    test("captures the open custom select", async ({ page }) => {
      const selectionPanel = panel(page, "selection-panel");

      await selectionPanel.locator(".ui-menu-title").click();
      await expect(selectionPanel.locator(".ui-menu-list")).toHaveClass(/show/);
      await expect(selectionPanel).toHaveScreenshot("select-open.png", screenshotOptions);
    });
  });

  test.describe("Feedback and overlay baselines", () => {
    test("captures the collapsed feedback panel", async ({ page }) => {
      await expect(panel(page, "feedback-panel")).toHaveScreenshot(
        "feedback-light.png",
        screenshotOptions
      );
    });

    test("captures the expanded accordion", async ({ page }) => {
      const feedbackPanel = panel(page, "feedback-panel");

      await feedbackPanel.locator(".ui-accordion-header").click();
      await expect(feedbackPanel.locator(".ui-accordion-header")).toHaveAttribute(
        "aria-expanded",
        "true"
      );
      await expect(feedbackPanel).toHaveScreenshot("accordion-expanded.png", screenshotOptions);
    });

    test("captures the open alert overlay", async ({ page }) => {
      await page.getByRole("button", { name: "Open alert" }).click();
      await expect(page.locator(".ui-alert")).toHaveClass(/show/);
      await expect(page.locator(".ui-alert")).toHaveScreenshot("alert-open.png", screenshotOptions);
    });

    test("captures the open dialog overlay", async ({ page }) => {
      await page.getByRole("button", { name: "Open dialog" }).click();
      await expect(page.locator(".ui-dialog")).toHaveClass(/show/);
      await expect(page.locator(".ui-dialog")).toHaveScreenshot(
        "dialog-open.png",
        screenshotOptions
      );
    });

    test("captures overlay surfaces in the dark theme", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await page.getByRole("button", { name: "Open alert" }).click();
      await expect(page.locator(".ui-alert")).toHaveClass(/show/);
      await expect(page.locator(".ui-alert")).toHaveScreenshot(
        "alert-open-dark.png",
        screenshotOptions
      );
    });
  });

  test.describe("Search, loading, and data baselines", () => {
    test("captures search controls in both themes", async ({ page }) => {
      await expect(panel(page, "search-panel")).toHaveScreenshot(
        "search-light.png",
        screenshotOptions
      );

      await page.getByTestId("theme-dark").click();
      await expect(panel(page, "search-panel")).toHaveScreenshot(
        "search-dark.png",
        screenshotOptions
      );
    });

    test("captures filtered search suggestions", async ({ page }) => {
      const searchPanel = panel(page, "search-panel");
      const searchBox = searchPanel.locator(".ui-input-search-box input");

      await searchBox.fill("win");
      await expect(searchPanel.locator(".ui-input-search-box ul")).toHaveClass(/show/);
      await expect(searchPanel).toHaveScreenshot("search-suggestions.png", screenshotOptions);
    });

    test("captures loading and media components", async ({ page }) => {
      await expect(panel(page, "loading-panel")).toHaveScreenshot(
        "loading-light.png",
        screenshotOptions
      );
    });

    test("captures loading and media components in the dark theme", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await expect(panel(page, "loading-panel")).toHaveScreenshot(
        "loading-dark.png",
        screenshotOptions
      );
    });

    test("captures the splash screen overlay", async ({ page }) => {
      await page.getByRole("button", { name: "Preview splash" }).click();
      await expect(page.locator(".ui-splash-screen")).toBeVisible();
      await expect(page.locator(".ui-splash-screen")).toHaveScreenshot(
        "splash-open.png",
        screenshotOptions
      );
    });

    test("captures the sortable table baseline", async ({ page }) => {
      await expect(panel(page, "table-panel")).toHaveScreenshot(
        "table-light.png",
        screenshotOptions
      );
    });

    test("captures the sorted table state", async ({ page }) => {
      const tablePanel = panel(page, "table-panel");

      await tablePanel.locator("thead th").first().click();
      await expect(tablePanel).toHaveScreenshot("table-sorted.png", screenshotOptions);
    });
  });

  test.describe("Menu and navigation baselines", () => {
    test("captures the closed menu baseline", async ({ page }) => {
      await expect(panel(page, "menu-panel")).toHaveScreenshot("menu-light.png", screenshotOptions);
    });

    test("captures the open menu", async ({ page }) => {
      const menuPanel = panel(page, "menu-panel");

      await page.getByTestId("menu-anchor").click();
      await expect(menuPanel.locator(".ui-menu-list-dialog").first()).toHaveClass(/show/);
      await expect(menuPanel).toHaveScreenshot("menu-open.png", screenshotOptions);
    });

    test("captures the nested menu state", async ({ page }) => {
      const menuPanel = panel(page, "menu-panel");

      await page.getByTestId("menu-anchor").click();
      await menuPanel.getByText("More", { exact: true }).click();
      await expect(menuPanel.locator(".ui-menu-list-dialog").nth(1)).toHaveClass(/show/);
      await expect(menuPanel).toHaveScreenshot("menu-submenu.png", screenshotOptions);
    });

    test("captures the expanded navigation shell", async ({ page }) => {
      await expect(panel(page, "navbar-panel")).toHaveScreenshot(
        "navbar-light.png",
        screenshotOptions
      );
    });

    test("captures the collapsed navigation shell", async ({ page }) => {
      const navbarPanel = panel(page, "navbar-panel");

      await navbarPanel.locator(".ui-navbar-header .ui-navbar-toggler").click();
      await expect(page.locator("#ui-navbar-wrap")).toHaveClass(/collapsed/);
      await expect(navbarPanel).toHaveScreenshot("navbar-collapsed.png", screenshotOptions);
    });

    test("captures the navigation submenu", async ({ page }) => {
      const navbarPanel = panel(page, "navbar-panel");

      await navbarPanel.locator(".ui-navbar-submenu-title").click();
      await expect(navbarPanel.locator(".ui-navbar-submenu-content")).toHaveClass(/show/);
      await expect(navbarPanel).toHaveScreenshot("navbar-submenu.png", screenshotOptions);
    });

    test("captures the dark navigation shell", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await expect(panel(page, "navbar-panel")).toHaveScreenshot(
        "navbar-dark.png",
        screenshotOptions
      );
    });

    test("captures the mobile navigation overlay", async ({ page }) => {
      await page.setViewportSize({ width: 640, height: 800 });
      await page.reload();
      await expect(page.getByTestId("gallery-ready")).toHaveText("ready");

      const navbarPanel = panel(page, "navbar-panel");
      await navbarPanel
        .locator(".ui-navbar-header-mobile .ui-navbar-toggler")
        .dispatchEvent("click");
      await expect(page.locator("#ui-navbar-wrap")).toHaveClass(/collapsed-float/);
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect(page).toHaveScreenshot("navbar-mobile-open.png", screenshotOptions);
    });
  });
});

test("covers keyboard, menu selection, search submit, and theme interactions", async ({ page }) => {
  const button = page.getByRole("button", { name: "Default" });

  await button.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("interaction-result")).toHaveText("default button activated");

  const selectionPanel = panel(page, "selection-panel");
  await selectionPanel.locator(".ui-menu-title").click();
  await selectionPanel.locator(".ui-menu-list-item").filter({ hasText: "Linux" }).click();
  await expect(page.getByTestId("selection-result")).toHaveText("linux");

  const searchPanel = panel(page, "search-panel");
  await searchPanel.locator(".ui-input-search-bar button").click();
  await expect(page.getByTestId("search-result")).toHaveText("Windows");

  await page.getByTestId("theme-dark").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("body")).toHaveClass(/dark-theme/);
});
