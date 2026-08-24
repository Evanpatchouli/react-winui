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

  test.describe("Tooltip visual states", () => {
    test("captures the light Tooltip surface", async ({ page }) => {
      const tooltip = page.locator(".ui-tooltip-open");

      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveText("Create a new document");
      await expect(tooltip).toHaveScreenshot("tooltip-light.png", screenshotOptions);
    });

    test("captures the hover Tooltip surface in dark theme", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await page.getByRole("button", { name: "Hover me" }).hover();

      const tooltip = page.locator(".ui-tooltip-open");
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveText("Supplemental information");
      await expect(tooltip).toHaveScreenshot("tooltip-dark.png", screenshotOptions);
    });

    test("opens the Tooltip from keyboard focus", async ({ page }) => {
      await page.getByRole("button", { name: "Hover me" }).focus();
      await expect(page.locator(".ui-tooltip-open")).toHaveText("Supplemental information");
    });
  });

  test.describe("Popover and Flyout visual states", () => {
    test("captures the light Popover surface", async ({ page }) => {
      await page.getByRole("button", { name: "Popover preview" }).click();
      const popover = page.locator(".ui-popover-open").first();

      await expect(popover).toBeVisible();
      await expect(popover).toHaveText(/Quick actions/);
      await expect(popover).toHaveScreenshot("popover-light.png", screenshotOptions);
    });

    test("captures the dark Popover surface", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await page.getByRole("button", { name: "Popover preview" }).click();

      const popover = page.locator(".ui-popover-open").first();
      await expect(popover).toBeVisible();
      await expect(popover).toHaveScreenshot("popover-dark.png", screenshotOptions);
    });

    test("opens and dismisses the Flyout with click and Escape", async ({ page }) => {
      const flyout = page.locator(".ui-popover-open").filter({
        hasText: "Flyout closes on outside click or Escape"
      });

      await page.getByRole("button", { name: "Flyout preview" }).click();
      await expect(flyout).toBeVisible();
      await expect(flyout).toHaveScreenshot("flyout-open.png", screenshotOptions);

      await page.keyboard.press("Escape");
      await expect(flyout).toHaveCount(0);
    });
  });

  test.describe("Toast interaction and visual states", () => {
    test("captures a limited FIFO stack in the light theme", async ({ page }) => {
      await page.getByRole("button", { name: "Show toast stack" }).click();

      const toaster = page.getByRole("region", { name: "Visual fixture notifications" });
      await expect(toaster.getByRole("status")).toHaveCount(3);
      await expect(toaster.getByText("Queued notification")).toHaveCount(0);
      await expect(toaster).toHaveScreenshot("toast-stack-light.png", screenshotOptions);
    });

    test("captures the same stack through dark theme tokens", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await page.getByRole("button", { name: "Show toast stack" }).click();

      const toaster = page.getByRole("region", { name: "Visual fixture notifications" });
      await expect(toaster.getByRole("status")).toHaveCount(3);
      await expect(toaster).toHaveScreenshot("toast-stack-dark.png", screenshotOptions);
    });

    test("dismisses the focused Toast with Escape and promotes the queue", async ({ page }) => {
      await page.getByRole("button", { name: "Show toast stack" }).click();

      const toaster = page.getByRole("region", { name: "Visual fixture notifications" });
      const firstToast = toaster.getByRole("status").first();
      await firstToast.getByRole("button", { name: "Dismiss notification" }).focus();
      await page.keyboard.press("Escape");

      await expect(toaster.getByText("Saved", { exact: true })).toHaveCount(0);
      await expect(toaster.getByText("Queued notification")).toBeVisible();
      await expect(toaster.getByRole("status")).toHaveCount(3);
    });

    test("pauses timeout while hovered and resumes the remaining duration", async ({ page }) => {
      await page.getByRole("button", { name: "Show pausable toast" }).click();

      const toaster = page.getByRole("region", { name: "Visual fixture notifications" });
      const toast = toaster.getByRole("status").filter({ hasText: "Hover to pause" });
      await toast.hover();
      await page.waitForTimeout(700);
      await expect(toast).toBeVisible();

      await page.getByTestId("theme-light").hover();
      await expect(toast).toHaveCount(0, { timeout: 1000 });
      await expect(page.getByTestId("toast-result")).toHaveText("timeout");
    });
  });

  test.describe("InfoBar interaction and visual states", () => {
    test("maps all severities to live-region semantics and captures the light theme", async ({
      page
    }) => {
      const infoBars = panel(page, "info-bar-panel").locator(".visual-fixture-info-bars");
      const informational = page.getByTestId("info-bar-informational");

      await expect(informational).toHaveAttribute("role", "status");
      await expect(informational).toHaveAttribute("aria-live", "polite");

      for (const severity of ["success", "warning", "error"]) {
        const infoBar = page.getByTestId(`info-bar-${severity}`);
        await expect(infoBar).toHaveAttribute("role", "alert");
        await expect(infoBar).toHaveAttribute("aria-live", "assertive");
        await expect(infoBar).toHaveAttribute("data-severity", severity);
      }

      await expect(infoBars).toHaveScreenshot("info-bar-severities-light.png", screenshotOptions);
    });

    test("captures all severities through dark theme tokens", async ({ page }) => {
      await page.getByTestId("theme-dark").click();

      const infoBars = panel(page, "info-bar-panel").locator(".visual-fixture-info-bars");
      await expect(infoBars).toHaveScreenshot("info-bar-severities-dark.png", screenshotOptions);
    });

    test("vertically centers the severity icon when an action increases the summary height", async ({
      page
    }) => {
      const infoBar = page.getByTestId("info-bar-warning");
      const icon = await infoBar.locator(".ui-info-bar-icon").boundingBox();
      const summary = await infoBar.locator(".ui-info-bar-summary").boundingBox();

      expect(icon).not.toBeNull();
      expect(summary).not.toBeNull();
      expect(icon.y + icon.height / 2).toBeCloseTo(summary.y + summary.height / 2, 1);
    });

    test("dismisses and resets an uncontrolled InfoBar", async ({ page }) => {
      await page.getByRole("button", { name: "Dismiss uncontrolled info bar" }).click();

      await expect(page.getByTestId("info-bar-uncontrolled")).toHaveCount(0);
      await expect(page.getByTestId("info-bar-result")).toHaveText("uncontrolled closed");

      await page.getByRole("button", { name: "Reset uncontrolled InfoBar" }).click();
      await expect(page.getByTestId("info-bar-uncontrolled")).toBeVisible();
      await expect(page.getByTestId("info-bar-result")).toHaveText("uncontrolled reset");
    });

    test("emits a controlled close request without mutating visibility", async ({ page }) => {
      await page.getByRole("button", { name: "Request controlled close" }).click();

      await expect(page.getByTestId("info-bar-controlled")).toBeVisible();
      await expect(page.getByTestId("info-bar-result")).toHaveText("controlled request: false");
    });
  });

  test.describe("ContextMenu interaction and visual states", () => {
    test("opens from right click and captures the light surface", async ({ page }) => {
      await page.getByTestId("context-menu-trigger").click({ button: "right" });

      const contextMenu = page.locator(".ui-context-menu");
      await expect(contextMenu).toBeVisible();
      await expect(contextMenu.getByRole("menuitem")).toHaveCount(3);
      await expect(
        contextMenu.getByRole("menuitem", { name: "Paste unavailable" })
      ).toHaveAttribute("aria-disabled", "true");
      await expect(contextMenu).toHaveScreenshot("context-menu-light.png", screenshotOptions);
    });

    test("captures the dark surface", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await page.getByTestId("context-menu-trigger").click({ button: "right" });

      const contextMenu = page.locator(".ui-context-menu");
      await expect(contextMenu).toBeVisible();
      await expect(contextMenu).toHaveScreenshot("context-menu-dark.png", screenshotOptions);
    });

    test("opens with Shift+F10 and restores focus after Escape", async ({ page }) => {
      const trigger = page.getByTestId("context-menu-trigger");
      await trigger.focus();
      await page.keyboard.press("Shift+F10");

      const firstCommand = page.getByRole("menuitem", { name: "Copy" });
      await expect(firstCommand).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(page.locator(".ui-context-menu")).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });

    test("selects a command and restores focus", async ({ page }) => {
      const trigger = page.getByTestId("context-menu-trigger");
      await trigger.click({ button: "right" });
      await page.getByRole("menuitem", { name: "Rename" }).click();

      await expect(page.getByTestId("context-menu-result")).toHaveText("Rename selected");
      await expect(page.locator(".ui-context-menu")).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });

    test("closes on Tab without forcing focus back to the trigger", async ({ page }) => {
      const trigger = page.getByTestId("context-menu-trigger");
      await trigger.focus();
      await page.keyboard.press("Shift+F10");
      await expect(page.getByRole("menuitem", { name: "Copy" })).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(page.locator(".ui-context-menu")).toHaveCount(0);
      await expect(trigger).not.toBeFocused();
    });
  });

  test.describe("ComboBox interaction and visual states", () => {
    test("commits select-only keyboard navigation while skipping a disabled option", async ({
      page
    }) => {
      await expect(page).toHaveTitle("React Windows UI visual regression fixture");
      const combobox = page.getByTestId("combo-box-select-only");
      await combobox.focus();
      await page.keyboard.press("ArrowDown");

      const listbox = page.getByRole("listbox", { name: "Platform options" });
      await expect(listbox).toBeVisible();
      await expect(listbox.getByRole("option", { name: "Linux unavailable" })).toHaveAttribute(
        "aria-disabled",
        "true"
      );

      await page.keyboard.press("ArrowDown");
      await expect(combobox).toHaveAttribute(
        "aria-activedescendant",
        await listbox.getByRole("option", { name: "macOS" }).getAttribute("id")
      );
      await page.keyboard.press("Enter");

      await expect(page.getByTestId("combo-box-result")).toHaveText("macos");
      await expect(listbox).toHaveCount(0);
    });

    test("filters editable options and commits both an option and custom text", async ({
      page
    }) => {
      const combobox = page.getByTestId("combo-box-editable");
      await combobox.fill("Blu");

      const listbox = page.getByRole("listbox", { name: "Editable color options" });
      await expect(listbox.getByRole("option")).toHaveCount(1);
      await expect(listbox.getByRole("option", { name: "Blue" })).toBeVisible();

      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Enter");
      await expect(page.getByTestId("combo-box-editable-result")).toHaveText("option: blue");

      await combobox.fill("Orchid");
      await expect(listbox.getByRole("option")).toHaveCount(0);
      await expect(listbox).toContainText("No options");
      await page.keyboard.press("Enter");
      await expect(page.getByTestId("combo-box-editable-result")).toHaveText("custom: Orchid");
    });

    test("closes with Escape and an outside pointer without changing the value", async ({
      page
    }) => {
      const combobox = page.getByTestId("combo-box-select-only");
      const listbox = page.getByRole("listbox", { name: "Platform options" });

      await combobox.click();
      await expect(listbox).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(listbox).toHaveCount(0);

      await combobox.click();
      await page.getByTestId("combo-box-outside").click();
      await expect(listbox).toHaveCount(0);
      await expect(combobox).toHaveValue("Windows");
    });

    test("uses a real top fallback near the viewport edge", async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 480 });
      const combobox = page.getByTestId("combo-box-viewport");
      await combobox.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        window.scrollBy(0, rect.bottom - window.innerHeight + 6);
      });
      await combobox.click();

      const listbox = page.getByRole("listbox", { name: "Viewport options" });
      await expect(listbox).toHaveAttribute("data-placement", "top");
      const comboBoxBounds = await combobox.boundingBox();
      const listboxBounds = await listbox.boundingBox();
      expect(comboBoxBounds).not.toBeNull();
      expect(listboxBounds).not.toBeNull();
      expect(listboxBounds.y + listboxBounds.height).toBeLessThanOrEqual(comboBoxBounds.y);
    });

    test("captures the light listbox surface", async ({ page }) => {
      await page.getByTestId("combo-box-select-only").click();
      const listbox = page.getByRole("listbox", { name: "Platform options" });

      await expect(listbox).toBeVisible();
      await expect(listbox).toHaveScreenshot("combo-box-listbox-light.png", screenshotOptions);
    });

    test("captures the dark listbox surface", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await page.getByTestId("combo-box-select-only").click();
      const listbox = page.getByRole("listbox", { name: "Platform options" });

      await expect(listbox).toBeVisible();
      await expect(listbox).toHaveScreenshot("combo-box-listbox-dark.png", screenshotOptions);
    });
  });

  test.describe("NumberBox interaction and visual states", () => {
    test("commits keyboard and direct text input while respecting bounds", async ({ page }) => {
      const numberBox = page.getByTestId("number-box-default");
      await numberBox.focus();
      await page.keyboard.press("ArrowUp");
      await expect(numberBox).toHaveValue("5");
      await expect(page.getByTestId("number-box-result")).toHaveText("5");

      await numberBox.fill("14");
      await expect(numberBox).toHaveAttribute("aria-invalid", "true");
      await page.keyboard.press("Enter");
      await expect(numberBox).toHaveValue("10");
      await expect(numberBox).toHaveAttribute("aria-valuenow", "10");
      await expect(page.getByTestId("number-box-result")).toHaveText("10");
      await expect(page.getByRole("button", { name: "Increment" }).first()).toBeDisabled();
    });

    test("keeps input focus when an inline spin button is clicked", async ({ page }) => {
      const numberBox = page.getByTestId("number-box-decimal");
      await numberBox.focus();
      await page
        .getByTestId("number-box-panel")
        .getByRole("button", { name: "Increment" })
        .nth(1)
        .click();

      await expect(numberBox).toBeFocused();
      await expect(numberBox).toHaveValue("0.6");
    });

    test("captures the light NumberBox states", async ({ page }) => {
      await expect(panel(page, "number-box-panel")).toHaveScreenshot(
        "number-box-light.png",
        screenshotOptions
      );
    });

    test("captures the dark NumberBox states", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await expect(panel(page, "number-box-panel")).toHaveScreenshot(
        "number-box-dark.png",
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
      const nestedMenu = menuPanel.locator(".ui-menu-list-dialog").nth(1);

      await expect(nestedMenu).toHaveClass(/show/);
      await expect(menuPanel.getByText("Settings", { exact: true })).toBeVisible();
      await expect(nestedMenu).toHaveScreenshot("menu-submenu-items.png", screenshotOptions);
      await expect(menuPanel).toHaveScreenshot("menu-submenu.png", screenshotOptions);

      await menuPanel.getByText("Settings", { exact: true }).click();
      await expect(menuPanel.getByTestId("menu-result")).toHaveText("Settings selected");
      await expect(menuPanel.locator(".ui-menu-list-dialog").first()).not.toHaveClass(/show/);
      await expect(menuPanel.locator(".ui-menu-list-dialog").nth(1)).not.toHaveClass(/show/);
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
