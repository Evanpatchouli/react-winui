import { expect, test } from "@playwright/test";

const screenshotOptions = {
  animations: "disabled",
  caret: "hide",
  scale: "css"
};

const panel = (page, testId) => page.getByTestId(testId);

const expectFloatingSurfaceScreenshot = async (page, locator, name, padding = 16) => {
  await locator.evaluate((element) => {
    for (const animation of element.getAnimations({ subtree: true })) {
      animation.finish();
    }
  });

  const bounds = await locator.boundingBox();
  const viewport = page.viewportSize();

  expect(bounds).not.toBeNull();
  expect(viewport).not.toBeNull();

  const left = Math.max(0, bounds.x - padding);
  const top = Math.max(0, bounds.y - padding);
  const right = Math.min(viewport.width, bounds.x + bounds.width + padding);
  const bottom = Math.min(viewport.height, bounds.y + bounds.height + padding);

  await expect(page).toHaveScreenshot(name, {
    ...screenshotOptions,
    clip: {
      x: left,
      y: top,
      width: right - left,
      height: bottom - top
    }
  });
};

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

  test.describe("CommandBar interaction and visual states", () => {
    test("supports toolbar roving focus and controlled overflow keyboard behavior", async ({
      page
    }) => {
      const toolbar = page.getByRole("toolbar", { name: "Editor commands" });
      const save = toolbar.getByRole("button", { name: "Save" });
      const copy = toolbar.getByRole("button", { name: "Copy" });
      const more = toolbar.getByRole("button", { name: "More commands" });

      await expect(toolbar).toHaveAttribute("aria-orientation", "horizontal");
      await expect(toolbar.getByRole("button", { name: "Paste" })).toBeDisabled();
      await save.focus();
      await page.keyboard.press("Space");
      await expect(page.getByTestId("command-bar-result")).toHaveText("Save selected");
      await page.keyboard.press("ArrowRight");
      await expect(copy).toBeFocused();
      await page.keyboard.press("End");
      await expect(more).toBeFocused();
      await page.keyboard.press("Enter");

      const menu = page.getByRole("menu", { name: "More commands" });
      await expect(menu).toBeVisible();
      await expect(page.getByRole("menuitem", { name: "Rename" })).toBeFocused();
      await page.keyboard.press("ArrowDown");
      await expect(page.getByRole("menuitem", { name: "Properties" })).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(menu).toHaveCount(0);
      await expect(more).toBeFocused();
    });

    test("selects a secondary command, restores focus, and light-dismisses", async ({ page }) => {
      const more = page
        .getByRole("toolbar", { name: "Editor commands" })
        .getByRole("button", { name: "More commands" });
      await more.click();
      await page.getByRole("menuitem", { name: "Rename" }).click();
      await expect(page.getByTestId("command-bar-result")).toHaveText("Rename selected");
      await expect(page.getByRole("menu", { name: "More commands" })).toHaveCount(0);
      await expect(more).toBeFocused();

      await more.click();
      await panel(page, "command-bar-panel").getByRole("heading", { name: "CommandBar" }).click();
      await expect(page.getByRole("menu", { name: "More commands" })).toHaveCount(0);
    });

    test("moves trailing commands into responsive overflow", async ({ page }) => {
      const toolbar = page.getByRole("toolbar", { name: "Responsive commands" });
      await expect(toolbar.getByRole("button", { name: "Save" })).toBeVisible();
      await toolbar.getByRole("button", { name: "More responsive commands" }).click();

      const menu = page.getByRole("menu", { name: "More responsive commands" });
      await expect(menu).toBeVisible();
      await expect(menu.getByRole("menuitem", { name: "Refresh" })).toBeVisible();
    });

    test("captures the light CommandBar states", async ({ page }) => {
      await expect(panel(page, "command-bar-panel")).toHaveScreenshot(
        "command-bar-light.png",
        screenshotOptions
      );
    });

    test("captures the dark CommandBar states", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await expect(panel(page, "command-bar-panel")).toHaveScreenshot(
        "command-bar-dark.png",
        screenshotOptions
      );
    });

    test("captures the light and dark overflow surfaces", async ({ page }) => {
      await page
        .getByRole("toolbar", { name: "Editor commands" })
        .getByRole("button", { name: "More commands" })
        .click();
      const lightMenu = page.getByRole("menu", { name: "More commands" });
      await expectFloatingSurfaceScreenshot(page, lightMenu, "command-bar-menu-light.png");

      await page.keyboard.press("Escape");
      await page.getByTestId("theme-dark").click();
      await page
        .getByRole("toolbar", { name: "Editor commands" })
        .getByRole("button", { name: "More commands" })
        .click();
      await expectFloatingSurfaceScreenshot(
        page,
        page.getByRole("menu", { name: "More commands" }),
        "command-bar-menu-dark.png"
      );
    });
  });

  test.describe("NavigationView interaction and visual states", () => {
    test("supports nested roving focus and shared menu selection", async ({ page }) => {
      const host = page.getByTestId("navigation-view-auto-host");
      const navigation = host.getByRole("navigation", { name: "Workspace navigation" });
      const library = navigation.getByRole("button", { exact: true, name: "Library" });

      await expect(page.getByTestId("navigation-view-auto")).toHaveAttribute(
        "data-pane-display-mode",
        "expanded"
      );
      await expect(library.locator("xpath=ancestor::li[1]")).toHaveAttribute(
        "data-selected-descendant",
        "true"
      );
      await expect(library).not.toHaveAttribute("aria-current");
      await expect(host.locator('[data-rwu-navigation-key="string:reports"]')).toBeHidden();

      await library.focus();
      await page.keyboard.press("ArrowRight");
      await expect(navigation.getByRole("button", { name: "Collapse Library" })).toHaveAttribute(
        "aria-expanded",
        "true"
      );
      await page.keyboard.press("ArrowRight");
      await expect(navigation.getByRole("button", { name: "Reports" })).toBeFocused();
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Space");
      await expect(page.getByTestId("navigation-view-result")).toHaveText("downloads");

      await navigation.getByRole("button", { name: "Settings" }).click();
      await expect(page.getByTestId("navigation-view-result")).toHaveText("settings");
      await expect(navigation.getByRole("button", { name: "Settings" })).toHaveAttribute(
        "aria-current",
        "page"
      );
    });

    test("opens a compact overlay and restores focus after Escape", async ({ page }) => {
      const host = page.getByTestId("navigation-view-compact-host");
      const root = page.getByTestId("navigation-view-compact");
      const toggle = host.getByRole("button", { name: "Toggle navigation pane" });

      await expect(root).toHaveAttribute("data-pane-display-mode", "compact");
      await expect(root).toHaveAttribute("data-pane-open", "false");
      await toggle.click();
      await expect(root).toHaveAttribute("data-pane-open", "true");
      await expect(host.getByRole("navigation", { name: "Compact navigation" })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(root).toHaveAttribute("data-pane-open", "false");
      await expect(toggle).toBeFocused();
    });

    test("highlights the complete item row on hover", async ({ page }) => {
      const navigation = page
        .getByTestId("navigation-view-auto-host")
        .getByRole("navigation", { name: "Workspace navigation" });
      const itemButton = navigation.getByRole("button", { name: "Home" });
      const itemRow = itemButton.locator("xpath=..");

      await itemButton.hover();

      const backgrounds = await itemRow.evaluate((element) => ({
        row: getComputedStyle(element).backgroundColor,
        button: getComputedStyle(element.querySelector(".ui-navigation-view-item-button"))
          .backgroundColor
      }));

      expect(backgrounds.row).not.toBe("rgba(0, 0, 0, 0)");
      expect(backgrounds.button).toBe("rgba(0, 0, 0, 0)");
    });

    test("uses the minimal auto mode and light-dismisses at the mobile breakpoint", async ({
      page
    }) => {
      await page.setViewportSize({ height: 900, width: 600 });
      const host = page.getByTestId("navigation-view-auto-host");
      const root = page.getByTestId("navigation-view-auto");
      const toggle = host.getByRole("button", { name: "Toggle navigation pane" });

      await expect(root).toHaveAttribute("data-pane-display-mode", "minimal");
      await expect(root).toHaveAttribute("data-pane-open", "false");
      await toggle.click();
      await expect(host.getByRole("navigation", { name: "Workspace navigation" })).toBeVisible();
      await root.getByTestId("navigation-view-overlay").click({ position: { x: 400, y: 200 } });
      await expect(root).toHaveAttribute("data-pane-open", "false");
      await expect(host.getByRole("button", { name: "Toggle navigation pane" })).toBeFocused();
    });

    test("captures the expanded NavigationView in light and dark themes", async ({ page }) => {
      const host = page.getByTestId("navigation-view-auto-host");
      await expect(host.locator('[data-rwu-navigation-key="string:reports"]')).toBeHidden();
      await expect(host).toHaveScreenshot("navigation-view-expanded-light.png", screenshotOptions);

      await page.getByTestId("theme-dark").click();
      await expect(host).toHaveScreenshot("navigation-view-expanded-dark.png", screenshotOptions);
    });

    test("captures the compact rail and its open overlay", async ({ page }) => {
      const host = page.getByTestId("navigation-view-compact-host");
      await expect(host).toHaveScreenshot("navigation-view-compact.png", screenshotOptions);

      await host.getByRole("button", { name: "Toggle navigation pane" }).click();
      await expect(host).toHaveScreenshot("navigation-view-compact-overlay.png", screenshotOptions);
    });

    test("captures the minimal mobile overlay", async ({ page }) => {
      await page.setViewportSize({ height: 900, width: 600 });
      const host = page.getByTestId("navigation-view-auto-host");
      await host.getByRole("button", { name: "Toggle navigation pane" }).click();
      await expect(host).toHaveScreenshot("navigation-view-minimal-overlay.png", screenshotOptions);
    });
  });

  test.describe("Tooltip visual states", () => {
    test("captures the light Tooltip surface", async ({ page }) => {
      const tooltip = page.locator(".ui-tooltip-open");

      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveText("Create a new document");
      await expectFloatingSurfaceScreenshot(page, tooltip, "tooltip-light.png");
    });

    test("captures the hover Tooltip surface in dark theme", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await page.getByRole("button", { name: "Hover me" }).hover();

      const tooltip = page.locator(".ui-tooltip-open");
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveText("Supplemental information");
      await expectFloatingSurfaceScreenshot(page, tooltip, "tooltip-dark.png");
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
      await expectFloatingSurfaceScreenshot(page, popover, "popover-light.png");
    });

    test("captures the dark Popover surface", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await page.getByRole("button", { name: "Popover preview" }).click();

      const popover = page.locator(".ui-popover-open").first();
      await expect(popover).toBeVisible();
      await expectFloatingSurfaceScreenshot(page, popover, "popover-dark.png");
    });

    test("opens and dismisses the Flyout with click and Escape", async ({ page }) => {
      const flyout = page.locator(".ui-popover-open").filter({
        hasText: "Flyout closes on outside click or Escape"
      });

      await page.getByRole("button", { name: "Flyout preview" }).click();
      await expect(flyout).toBeVisible();
      await expectFloatingSurfaceScreenshot(page, flyout, "flyout-open.png");

      await page.keyboard.press("Escape");
      await expect(flyout).toHaveCount(0);
    });
  });

  test.describe("Toast interaction and visual states", () => {
    test("captures a limited FIFO stack in the light theme", async ({ page }) => {
      await page.getByRole("button", { name: "Show toast stack" }).click();

      const toaster = page.getByRole("region", { name: "Visual fixture notifications" });
      const toasts = toaster.getByRole("status");
      await expect(toasts).toHaveCount(3);
      await expect(toasts.nth(0)).toHaveAttribute("data-stack-level", "2");
      await expect(toasts.nth(1)).toHaveAttribute("data-stack-level", "1");
      await expect(toasts.nth(2)).toHaveAttribute("data-stack-level", "0");

      const toastBounds = await Promise.all(
        [0, 1, 2].map((index) => toasts.nth(index).boundingBox())
      );
      expect(toastBounds.every(Boolean)).toBe(true);
      expect(toastBounds[0].x).toBeLessThan(toastBounds[1].x);
      expect(toastBounds[1].x).toBeLessThan(toastBounds[2].x);
      expect(toastBounds[0].y).toBeLessThan(toastBounds[1].y);
      expect(toastBounds[1].y).toBeLessThan(toastBounds[2].y);
      await expect(toaster.getByText("Queued notification")).toHaveCount(0);
      await expectFloatingSurfaceScreenshot(page, toaster, "toast-stack-light.png", 32);
    });

    test("captures the same stack through dark theme tokens", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await page.getByRole("button", { name: "Show toast stack" }).click();

      const toaster = page.getByRole("region", { name: "Visual fixture notifications" });
      const toasts = toaster.getByRole("status");
      await expect(toasts).toHaveCount(3);
      await expect(toasts.nth(0)).toHaveAttribute("data-stack-level", "2");
      await expect(toasts.nth(1)).toHaveAttribute("data-stack-level", "1");
      await expect(toasts.nth(2)).toHaveAttribute("data-stack-level", "0");
      await expectFloatingSurfaceScreenshot(page, toaster, "toast-stack-dark.png", 32);
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

  test.describe("Expander interaction and visual states", () => {
    test("supports native Enter and Space activation with dynamic content", async ({ page }) => {
      const expander = page.getByTestId("expander-keyboard");
      const header = expander.getByRole("button", { name: "Advanced network settings" });
      const contentId = await header.getAttribute("aria-controls");

      expect(contentId).toBeTruthy();
      await expect(header).toHaveAttribute("aria-expanded", "false");
      await expect(page.locator(`#${contentId}`)).toHaveAttribute("inert", "");

      await header.press("Enter");
      await expect(header).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator(`#${contentId}`)).not.toHaveAttribute("inert");
      await expect(page.getByTestId("expander-result")).toHaveText("keyboard: true");

      await page.getByRole("button", { name: "Add dynamic detail" }).click();
      await expect(expander.getByText("Metered connection")).toBeVisible();

      await header.focus();
      await header.press("Space");
      await expect(header).toHaveAttribute("aria-expanded", "false");
      await expect(page.getByTestId("expander-result")).toHaveText("keyboard: false");
    });

    test("accepts controlled requests and blocks disabled keyboard events", async ({ page }) => {
      const controlled = page.getByTestId("expander-controlled");
      const controlledHeader = controlled.getByRole("button", { name: "Controlled details" });
      const disabledHeader = page
        .getByTestId("expander-disabled")
        .getByRole("button", { name: "Managed by your organization" });

      await controlledHeader.click();
      await expect(controlledHeader).toHaveAttribute("aria-expanded", "true");
      await expect(page.getByTestId("expander-result")).toHaveText("controlled: true");

      await expect(disabledHeader).toBeDisabled();
      await disabledHeader.dispatchEvent("keydown", { key: "Enter" });
      await disabledHeader.dispatchEvent("keyup", { key: "Enter" });
      await disabledHeader.dispatchEvent("keydown", { key: " " });
      await disabledHeader.dispatchEvent("keyup", { key: " " });
      await expect(disabledHeader).toHaveAttribute("aria-expanded", "false");
      await expect(page.getByTestId("expander-result")).toHaveText("controlled: true");
    });

    test("keeps upward DOM order and ARIA stable while placing content above", async ({ page }) => {
      const expander = page.getByTestId("expander-up");
      const header = expander.getByRole("button", { name: "Recent activity" });
      const contentId = await header.getAttribute("aria-controls");
      const content = page.locator(`#${contentId}`);
      const headerBox = await header.boundingBox();
      const contentBox = await content.boundingBox();
      const headerComesFirst = await expander.evaluate((root) => {
        const headerElement = root.querySelector(".ui-expander-header");
        const contentElement = root.querySelector(".ui-expander-content");
        return Boolean(
          headerElement.compareDocumentPosition(contentElement) & Node.DOCUMENT_POSITION_FOLLOWING
        );
      });

      expect(headerComesFirst).toBe(true);
      expect(headerBox).not.toBeNull();
      expect(contentBox).not.toBeNull();
      expect(contentBox.y).toBeLessThan(headerBox.y);
      await expect(header).toHaveAttribute("aria-expanded", "true");
      await expect(content).toHaveAttribute("aria-hidden", "false");
    });

    test("captures the expanded light surface", async ({ page }) => {
      await page
        .getByTestId("expander-keyboard")
        .getByRole("button", { name: "Advanced network settings" })
        .click();

      await expect(panel(page, "expander-panel")).toHaveScreenshot(
        "expander-light.png",
        screenshotOptions
      );
    });

    test("captures the expanded dark surface", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await page
        .getByTestId("expander-keyboard")
        .getByRole("button", { name: "Advanced network settings" })
        .click();

      await expect(panel(page, "expander-panel")).toHaveScreenshot(
        "expander-dark.png",
        screenshotOptions
      );
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
      await expectFloatingSurfaceScreenshot(page, contextMenu, "context-menu-light.png");
    });

    test("captures the dark surface", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await page.getByTestId("context-menu-trigger").click({ button: "right" });

      const contextMenu = page.locator(".ui-context-menu");
      await expect(contextMenu).toBeVisible();
      await expectFloatingSurfaceScreenshot(page, contextMenu, "context-menu-dark.png");
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

  test.describe("AutoSuggestBox interaction and visual states", () => {
    test("distinguishes suggestion choice from typed query submission", async ({ page }) => {
      const autoSuggestBox = page.getByTestId("auto-suggest-box-interactive");
      await autoSuggestBox.fill("Sea");

      const listbox = page.getByRole("listbox", { name: "Topic suggestions" });
      await expect(listbox.getByRole("option")).toHaveCount(1);
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Enter");
      await expect(page.getByTestId("auto-suggest-box-result")).toHaveText("suggestion: Seattle");
      await expect(listbox).toHaveCount(0);

      await autoSuggestBox.fill("Custom query");
      await expect(listbox.getByRole("status")).toHaveText("No matching topics");
      await page.keyboard.press("Enter");
      await expect(page.getByTestId("auto-suggest-box-result")).toHaveText("text: Custom query");
    });

    test("clears, light-dismisses, and blocks disabled interaction", async ({ page }) => {
      const autoSuggestBox = page.getByTestId("auto-suggest-box-interactive");
      const listbox = page.getByRole("listbox", { name: "Topic suggestions" });
      await autoSuggestBox.click();
      await expect(listbox).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(listbox).toHaveCount(0);

      await autoSuggestBox.click();
      await page.getByTestId("auto-suggest-box-outside").click();
      await expect(listbox).toHaveCount(0);

      await page.getByRole("button", { name: "Clear text" }).first().click();
      await expect(autoSuggestBox).toHaveValue("");
      await expect(page.getByTestId("auto-suggest-box-disabled")).toBeDisabled();
      await expect(page.getByTestId("auto-suggest-box-disabled")).toHaveAttribute(
        "aria-expanded",
        "false"
      );
    });

    test("keeps the input stable and signals action hover without a hand cursor", async ({ page }) => {
      const autoSuggestBox = page.getByTestId("auto-suggest-box-interactive");
      const before = await autoSuggestBox.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          backgroundColor: style.backgroundColor,
          filter: style.filter,
          opacity: style.opacity,
          cursor: style.cursor
        };
      });

      await autoSuggestBox.hover();

      const after = await autoSuggestBox.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          backgroundColor: style.backgroundColor,
          filter: style.filter,
          opacity: style.opacity,
          cursor: style.cursor
        };
      });

      expect(after).toEqual(before);

      await autoSuggestBox.focus();

      const focused = await autoSuggestBox.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          backgroundColor: style.backgroundColor,
          filter: style.filter,
          opacity: style.opacity,
          cursor: style.cursor
        };
      });

      await autoSuggestBox.hover();

      const focusedAfterHover = await autoSuggestBox.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          backgroundColor: style.backgroundColor,
          filter: style.filter,
          opacity: style.opacity,
          cursor: style.cursor
        };
      });

      expect(focusedAfterHover).toEqual(focused);

      const control = autoSuggestBox.locator("xpath=..");
      for (const action of [
        control.getByRole("button", { name: "Clear text" }),
        control.getByRole("button", { name: "Submit query" })
      ]) {
        const actionBefore = await action.evaluate((element) => {
          const style = getComputedStyle(element);
          return {
            backgroundColor: style.backgroundColor,
            filter: style.filter,
            opacity: style.opacity,
            cursor: style.cursor
          };
        });

        await action.hover();

        const actionAfter = await action.evaluate((element) => {
          const style = getComputedStyle(element);
          return {
            backgroundColor: style.backgroundColor,
            filter: style.filter,
            opacity: style.opacity,
            cursor: style.cursor
          };
        });

        expect(actionAfter.backgroundColor).not.toBe(actionBefore.backgroundColor);
        expect(actionAfter.filter).toBe("none");
        expect(actionAfter.opacity).toBe("1");
        expect(actionBefore.cursor).toBe("default");
        expect(actionAfter.cursor).toBe("default");
      }
    });

    test("matches InputText focus underline treatment", async ({ page }) => {
      const autoSuggestBox = page.getByTestId("auto-suggest-box-interactive");
      const inputText = page.getByTestId("input-text-loading");

      const readUnderlineStyle = async (locator) =>
        locator.evaluate((element) => {
          const style = getComputedStyle(element);
          return {
            backgroundImage: style.backgroundImage,
            backgroundPositionY: style.backgroundPositionY,
            backgroundRepeat: style.backgroundRepeat,
            backgroundSize: style.backgroundSize
          };
        });

      await autoSuggestBox.focus();
      const autoSuggestUnderline = await readUnderlineStyle(autoSuggestBox);

      await inputText.focus();
      const inputTextUnderline = await readUnderlineStyle(inputText);

      expect(autoSuggestUnderline).toEqual(inputTextUnderline);
    });

    test("uses a real top fallback near the viewport edge", async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 480 });
      const autoSuggestBox = page.getByTestId("auto-suggest-box-viewport");
      await autoSuggestBox.evaluate((element) => {
        const control = element.closest(".ui-auto-suggest-box");
        if (!(control instanceof HTMLElement)) {
          throw new Error("AutoSuggestBox control was not found");
        }
        control.style.position = "fixed";
        control.style.right = "16px";
        control.style.bottom = "8px";
        control.style.width = "320px";
        control.style.zIndex = "1";
      });
      await autoSuggestBox.click();

      const listbox = page.getByRole("listbox", { name: "Viewport topic suggestions" });
      await expect(listbox).toHaveAttribute("data-placement", "top");
      const inputBounds = await autoSuggestBox.boundingBox();
      const listboxBounds = await listbox.boundingBox();
      expect(inputBounds).not.toBeNull();
      expect(listboxBounds).not.toBeNull();
      expect(listboxBounds.y + listboxBounds.height).toBeLessThanOrEqual(inputBounds.y);
    });

    test("captures the light suggestion surface", async ({ page }) => {
      await page.getByTestId("auto-suggest-box-interactive").click();
      const listbox = page.getByRole("listbox", { name: "Topic suggestions" });

      await expect(listbox).toBeVisible();
      await expectFloatingSurfaceScreenshot(page, listbox, "auto-suggest-box-listbox-light.png");
    });

    test("captures the dark suggestion surface", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await page.getByTestId("auto-suggest-box-interactive").click();
      const listbox = page.getByRole("listbox", { name: "Topic suggestions" });

      await expect(listbox).toBeVisible();
      await expectFloatingSurfaceScreenshot(page, listbox, "auto-suggest-box-listbox-dark.png");
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
      await combobox.evaluate((element) => element.click());

      const listbox = page.getByRole("listbox", { name: "Viewport options" });
      await expect(listbox).toHaveAttribute("data-placement", "top");
      const comboBoxBounds = await combobox.boundingBox();
      const listboxBounds = await listbox.boundingBox();
      expect(comboBoxBounds).not.toBeNull();
      expect(listboxBounds).not.toBeNull();
      expect(listboxBounds.y + listboxBounds.height).toBeLessThanOrEqual(comboBoxBounds.y);
    });

    test("reuses the Select chevron geometry", async ({ page }) => {
      const selectChevron = page.getByTestId("select-control").locator(".ui-menu-title");
      const chevrons = page.locator(".ui-combobox-chevron, .ui-number-box-chevron");

      await expect(chevrons).not.toHaveCount(0);

      const selectStyle = await selectChevron.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          backgroundImage: style.backgroundImage,
          backgroundRepeat: style.backgroundRepeat,
          backgroundSize: style.backgroundSize
        };
      });

      const chevronStyles = await chevrons.evaluateAll((elements) =>
        elements.map((element) => {
          const style = getComputedStyle(element);
          return {
            backgroundImage: style.backgroundImage,
            backgroundRepeat: style.backgroundRepeat,
            backgroundSize: style.backgroundSize
          };
        })
      );

      expect(chevronStyles).toEqual(chevronStyles.map(() => selectStyle));
    });

    test("captures the light listbox surface", async ({ page }) => {
      await page.getByTestId("combo-box-select-only").click();
      const listbox = page.getByRole("listbox", { name: "Platform options" });

      await expect(listbox).toBeVisible();
      await expectFloatingSurfaceScreenshot(page, listbox, "combo-box-listbox-light.png");
    });

    test("captures the dark listbox surface", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await page.getByTestId("combo-box-select-only").click();
      const listbox = page.getByRole("listbox", { name: "Platform options" });

      await expect(listbox).toBeVisible();
      await expectFloatingSurfaceScreenshot(page, listbox, "combo-box-listbox-dark.png");
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

  test.describe("TreeView interaction and visual states", () => {
    test("supports branch navigation, selection, and typeahead", async ({ page }) => {
      const workspace = page.getByTestId("tree-workspace");

      await workspace.focus();
      await page.keyboard.press("ArrowLeft");
      await expect(workspace).toHaveAttribute("aria-expanded", "false");
      await expect(page.getByTestId("tree-src")).toHaveCount(0);

      await page.keyboard.press("ArrowRight");
      await expect(workspace).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("ArrowRight");
      await expect(page.getByTestId("tree-src")).toBeFocused();

      await page.keyboard.press("r");
      await expect(page.getByTestId("tree-readme")).toBeFocused();
      await page.keyboard.press("Space");
      await expect(page.getByTestId("tree-readme")).toHaveAttribute("aria-selected", "true");
      await expect(page.getByTestId("tree-view-result")).toHaveText("readme");
    });

    test("keeps disabled items out of pointer selection", async ({ page }) => {
      await page.getByText("System files", { exact: true }).click();

      await expect(page.getByText("System files", { exact: true })).toBeVisible();
      await expect(page.getByTestId("tree-view-result")).toHaveText("readme");
    });

    test("captures the light TreeView", async ({ page }) => {
      await expect(panel(page, "tree-view-panel")).toHaveScreenshot(
        "tree-view-light.png",
        screenshotOptions
      );
    });

    test("captures the dark TreeView", async ({ page }) => {
      await page.getByTestId("theme-dark").click();
      await expect(panel(page, "tree-view-panel")).toHaveScreenshot(
        "tree-view-dark.png",
        screenshotOptions
      );
    });
  });

  test.describe("SettingsCard interaction and visual states", () => {
    test("keeps the card trigger and nested actions as independent interactions", async ({
      page
    }) => {
      const settingsPanel = panel(page, "settings-card-panel");
      const displayTrigger = settingsPanel.getByRole("button", { name: "Display" });

      await displayTrigger.focus();
      await expect(displayTrigger).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.getByTestId("settings-card-result")).toHaveText("card: display");

      await page.getByTestId("settings-card-action").click();
      await expect(page.getByTestId("settings-card-result")).toHaveText("action: update");

      await settingsPanel.getByRole("checkbox", { name: "Desktop notifications" }).click();
      await expect(page.getByTestId("settings-card-result")).toHaveText("content: notifications");

      const link = page.getByTestId("settings-card-link").getByRole("link", {
        name: "Privacy & security"
      });
      await link.focus();
      await page.keyboard.press("Enter");
      await expect(page.getByTestId("settings-card-result")).toHaveText("link: privacy");
      await expect(page).not.toHaveURL(/#privacy$/);
    });

    test("makes the disabled card and descendants inert", async ({ page }) => {
      const disabledCard = page.getByTestId("settings-card-disabled");

      await expect(disabledCard).toHaveAttribute("aria-disabled", "true");
      await expect(disabledCard).toHaveAttribute("inert", "");
      await expect(disabledCard.locator(".ui-settings-card-trigger")).toBeDisabled();
      await expect(disabledCard.locator(".ui-settings-card-action button")).toBeDisabled();
    });

    test("uses the quiet card elevation token", async ({ page }) => {
      const card = page.getByTestId("settings-card-static");
      const shadow = await card.evaluate((element) => ({
        computed: getComputedStyle(element).boxShadow,
        token: getComputedStyle(document.documentElement)
          .getPropertyValue("--rwu-shadow-card")
          .trim()
      }));

      expect(shadow.token).toBe("0 1px 2px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.04)");
      expect(shadow.computed).toContain("0px 4px 8px");
    });

    test("shares the card elevation with InfoBar and SettingsExpander", async ({ page }) => {
      const surfaces = [
        page.getByTestId("settings-card-static"),
        page.getByTestId("info-bar-informational"),
        page.getByTestId("settings-expander-uncontrolled")
      ];
      const readShadows = () =>
        Promise.all(surfaces.map((surface) => surface.evaluate((element) => getComputedStyle(element).boxShadow)));

      const lightShadows = await readShadows();
      expect(new Set(lightShadows).size).toBe(1);

      await page.getByTestId("theme-dark").click();
      const darkShadows = await readShadows();
      expect(new Set(darkShadows).size).toBe(1);
    });

    test("captures the light and dark SettingsCard stack", async ({ page }) => {
      const cards = page.locator(".visual-fixture-settings-cards");

      await expect(cards).toHaveScreenshot("settings-card-light.png", screenshotOptions);

      await page.getByTestId("theme-dark").click();
      await expect(cards).toHaveScreenshot("settings-card-dark.png", screenshotOptions);
    });

    test("stacks content below the label at the responsive breakpoint", async ({ page }) => {
      await page.setViewportSize({ width: 620, height: 900 });
      await page.locator(".visual-fixture").evaluate((element) => {
        element.style.width = "540px";
      });

      const card = page.getByTestId("settings-card-static");
      const mainBox = await card.locator(".ui-settings-card-main").boundingBox();
      const trailingBox = await card.locator(".ui-settings-card-trailing").boundingBox();

      expect(mainBox).not.toBeNull();
      expect(trailingBox).not.toBeNull();
      expect(trailingBox.y).toBeGreaterThan(mainBox.y);
      await expect(card).toHaveScreenshot("settings-card-responsive.png", screenshotOptions);
    });
  });

  test.describe("SettingsExpander interaction and visual states", () => {
    test("keeps header controls independent from native keyboard disclosure", async ({ page }) => {
      const settingsPanel = panel(page, "settings-expander-panel");
      const toggle = settingsPanel.getByRole("button", { name: "Advanced network settings" });

      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await page.getByTestId("settings-expander-action").click();
      await expect(page.getByTestId("settings-expander-result")).toHaveText("action: reset");
      await expect(toggle).toHaveAttribute("aria-expanded", "true");

      await settingsPanel.getByRole("checkbox", { name: "Advanced network features" }).click();
      await expect(page.getByTestId("settings-expander-result")).toHaveText("content: network");
      await expect(toggle).toHaveAttribute("aria-expanded", "true");

      await toggle.focus();
      await page.keyboard.press("Enter");
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(page.getByTestId("settings-expander-result")).toHaveText("uncontrolled: false");
    });

    test("accepts controlled changes and restores focus when parent content closes", async ({
      page
    }) => {
      const toggle = panel(page, "settings-expander-panel").getByRole("button", {
        name: "Optional features"
      });

      await toggle.focus();
      await page.keyboard.press("Space");
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await expect(page.getByTestId("settings-expander-result")).toHaveText("controlled: true");

      const nestedAction = page.getByTestId("settings-expander-nested-action");
      await nestedAction.focus();
      await expect(nestedAction).toBeFocused();
      await toggle.evaluate((element) => element.click());
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(toggle).toBeFocused();
    });

    test("makes the disabled header and expanded descendants inert", async ({ page }) => {
      const disabledExpander = page.getByTestId("settings-expander-disabled");
      const disabledAction = page.getByTestId("settings-expander-disabled-action");
      const disabledItem = page.getByTestId("settings-expander-disabled-item");

      await expect(disabledExpander).toHaveAttribute("aria-disabled", "true");
      await expect(disabledExpander).toHaveAttribute("inert", "");
      await expect(
        disabledExpander.getByRole("button", { name: "Optional diagnostics", hidden: true })
      ).toBeDisabled();

      await disabledAction.focus();
      await expect(disabledAction).not.toBeFocused();
      await disabledItem.focus();
      await expect(disabledItem).not.toBeFocused();
      await disabledAction.evaluate((element) => element.click());
      await disabledItem.evaluate((element) => element.click());
      await expect(page.getByTestId("settings-expander-result")).toHaveText("none");
    });

    test("captures expanded and collapsed groups in light and dark themes", async ({ page }) => {
      const settingsPanel = panel(page, "settings-expander-panel");

      await expect(settingsPanel).toHaveScreenshot(
        "settings-expander-light.png",
        screenshotOptions
      );

      await page.getByTestId("theme-dark").click();
      await expect(settingsPanel).toHaveScreenshot("settings-expander-dark.png", screenshotOptions);
    });

    test("stacks header controls below labels at the responsive breakpoint", async ({ page }) => {
      await page.setViewportSize({ width: 620, height: 900 });
      await page.locator(".visual-fixture").evaluate((element) => {
        element.style.width = "540px";
      });

      const expander = page.getByTestId("settings-expander-uncontrolled");
      const mainBox = await expander.locator(".ui-settings-expander-main").boundingBox();
      const trailingBox = await expander.locator(".ui-settings-expander-trailing").boundingBox();

      expect(mainBox).not.toBeNull();
      expect(trailingBox).not.toBeNull();
      expect(trailingBox.y).toBeGreaterThan(mainBox.y);
      await expect(expander).toHaveScreenshot(
        "settings-expander-responsive.png",
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

    test("keeps a disabled Switch inert and visibly muted", async ({ page }) => {
      const disabledSwitch = page.getByTestId("switch-disabled");

      await expect(disabledSwitch).toBeDisabled();
      await expect(disabledSwitch).not.toBeChecked();
      await expect(disabledSwitch).toHaveCSS("cursor", "default");
      await expect(disabledSwitch).toHaveCSS("filter", "grayscale(1)");
      await expect(disabledSwitch).toHaveCSS("opacity", "0.5");
      await expect(disabledSwitch.locator("..")).toHaveClass(/ui-switch-container-disabled/);
      await expect(disabledSwitch.locator("..")).toHaveScreenshot(
        "switch-disabled-light.png",
        screenshotOptions
      );

      await disabledSwitch.click({ force: true });

      await expect(disabledSwitch).not.toBeChecked();

      await page.getByTestId("theme-dark").click();
      await expect(disabledSwitch.locator("..")).toHaveScreenshot(
        "switch-disabled-dark.png",
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
