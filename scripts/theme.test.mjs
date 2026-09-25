import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { themeInitScript, THEME_STORAGE_KEY } from "../src/lib/theme.ts";

let checks = 0;
async function check(label, run) {
  await run();
  checks += 1;
  console.log(`PASS ${label}`);
}

function browser({ stored = null, dark = false, brokenStorage = false } = {}) {
  const values = new Map(stored ? [[THEME_STORAGE_KEY, stored]] : []);
  const localStorage = {
    getItem(key) {
      if (brokenStorage) throw new Error("Storage is unavailable");
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      if (brokenStorage) throw new Error("Storage is unavailable");
      values.set(key, value);
    },
  };
  const media = Object.assign(new EventTarget(), { matches: dark });
  const window = Object.assign(new EventTarget(), {
    localStorage,
    matchMedia: () => media,
  });
  const document = { documentElement: { dataset: {}, style: {} } };
  return { window, document, media, values };
}

for (const scenario of [
  { label: "First visit respects a light device", expected: "light" },
  { label: "First visit respects a dark device", dark: true, expected: "dark" },
  {
    label: "Saved light overrides a dark device",
    stored: "light",
    dark: true,
    expected: "light",
  },
  {
    label: "Saved dark overrides a light device",
    stored: "dark",
    expected: "dark",
  },
  {
    label: "Invalid saved values fall back to the device",
    stored: "invalid",
    dark: true,
    expected: "dark",
  },
  {
    label: "Blocked storage still allows a dark first paint",
    brokenStorage: true,
    dark: true,
    expected: "dark",
  },
]) {
  await check(scenario.label, () => {
    const fixture = browser(scenario);
    runInNewContext(themeInitScript, fixture);
    assert.equal(
      fixture.document.documentElement.dataset.theme,
      scenario.expected,
    );
    assert.equal(
      fixture.document.documentElement.style.colorScheme,
      scenario.expected,
    );
  });
}

await check("Unsupported device-theme detection falls back safely", () => {
  const fixture = browser({ brokenStorage: true });
  delete fixture.window.matchMedia;
  runInNewContext(themeInitScript, fixture);
  assert.equal(fixture.document.documentElement.dataset.theme, "light");
});

async function withBrowser(options, run) {
  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;
  const fixture = browser(options);
  globalThis.window = fixture.window;
  globalThis.document = fixture.document;
  try {
    const theme = await import(`../src/lib/theme.ts?test=${checks}`);
    await run(theme, fixture);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
}

await check("Selection applies, persists, and notifies all subscribers", () =>
  withBrowser({}, (theme, fixture) => {
    let notifications = 0;
    const unsubscribe = theme.subscribeTheme(() => notifications++);
    theme.setTheme("dark");
    assert.equal(theme.getThemeSnapshot(), "dark");
    assert.equal(fixture.document.documentElement.style.colorScheme, "dark");
    assert.equal(fixture.values.get(THEME_STORAGE_KEY), "dark");
    assert.equal(notifications, 1);
    unsubscribe();
    theme.setTheme("light");
    assert.equal(notifications, 1);
  }),
);

await check(
  "Selection works with blocked storage and survives a device change",
  () =>
    withBrowser({ brokenStorage: true }, (theme, fixture) => {
      const unsubscribe = theme.subscribeTheme(() => {});
      theme.setTheme("dark");
      fixture.media.dispatchEvent(new Event("change"));
      assert.equal(theme.getThemeSnapshot(), "dark");
      unsubscribe();
    }),
);

await check(
  "Device changes are followed until the visitor selects a theme",
  () =>
    withBrowser({}, (theme, fixture) => {
      const unsubscribe = theme.subscribeTheme(() => {});
      fixture.media.matches = true;
      fixture.media.dispatchEvent(new Event("change"));
      assert.equal(theme.getThemeSnapshot(), "dark");
      theme.setTheme("light");
      fixture.media.dispatchEvent(new Event("change"));
      assert.equal(theme.getThemeSnapshot(), "light");
      unsubscribe();
    }),
);

await check(
  "Other tabs update the theme; clearing preferences restores the device",
  () =>
    withBrowser({}, (theme, fixture) => {
      const unsubscribe = theme.subscribeTheme(() => {});
      const dispatchStorage = (key, newValue) =>
        fixture.window.dispatchEvent(
          Object.assign(new Event("storage"), { key, newValue }),
        );
      dispatchStorage("another-key", "dark");
      assert.equal(theme.getThemeSnapshot(), "light");
      dispatchStorage(THEME_STORAGE_KEY, "dark");
      assert.equal(theme.getThemeSnapshot(), "dark");
      dispatchStorage(null, null);
      assert.equal(theme.getThemeSnapshot(), "light");
      unsubscribe();
    }),
);

await check("Server rendering never reads browser state", async () => {
  const theme = await import("../src/lib/theme.ts?server");
  assert.equal(theme.getServerThemeSnapshot(), null);
  assert.equal(theme.getThemeSnapshot(), null);
  assert.doesNotThrow(() => theme.setTheme("dark"));
  assert.doesNotThrow(() => theme.subscribeTheme(() => {})());
});

console.log(`\n${checks} theme behavior checks passed.`);
