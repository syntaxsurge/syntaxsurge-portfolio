import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { motionInitScript, MOTION_STORAGE_KEY } from "../src/lib/motion.ts";

let checks = 0;
async function check(label, run) {
  await run();
  checks += 1;
  console.log(`PASS ${label}`);
}

function browser({ stored = null, reduced = false, brokenStorage = false } = {}) {
  const values = new Map(stored === null ? [] : [[MOTION_STORAGE_KEY, stored]]);
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
  const media = Object.assign(new EventTarget(), { matches: reduced });
  let mediaReads = 0;
  const window = Object.assign(new EventTarget(), {
    localStorage,
    matchMedia() {
      mediaReads += 1;
      return media;
    },
  });
  const document = Object.assign(new EventTarget(), {
    documentElement: { dataset: {} },
    visibilityState: "visible",
  });
  const activeListeners = new Set();
  for (const [name, target] of [
    ["window", window],
    ["document", document],
  ]) {
    const add = target.addEventListener.bind(target);
    const remove = target.removeEventListener.bind(target);
    target.addEventListener = (type, listener, options) => {
      activeListeners.add({ name, type, listener });
      return add(type, listener, options);
    };
    target.removeEventListener = (type, listener, options) => {
      for (const item of activeListeners) {
        if (item.name === name && item.type === type && item.listener === listener)
          activeListeners.delete(item);
      }
      return remove(type, listener, options);
    };
  }
  function dispatchStorage(key, newValue) {
    if (key === null) values.clear();
    else if (newValue === null) values.delete(key);
    else values.set(key, newValue);
    window.dispatchEvent(Object.assign(new Event("storage"), { key, newValue }));
  }
  return {
    window,
    document,
    media,
    values,
    activeListeners,
    dispatchStorage,
    mediaReads: () => mediaReads,
  };
}

for (const scenario of [
  { label: "First paint starts motion automatically", expected: "playing" },
  {
    label: "Automatic first paint follows the site's choice on a reduced-motion device",
    reduced: true,
    expected: "playing",
  },
  {
    label: "Saved pause is applied before visible content",
    stored: "paused",
    expected: "paused",
  },
  {
    label: "Saved play remains automatic on a reduced-motion device",
    stored: "playing",
    reduced: true,
    expected: "playing",
  },
  {
    label: "Invalid saved motion falls back to automatic play",
    stored: "invalid",
    reduced: true,
    expected: "playing",
  },
  {
    label: "Blocked storage leaves automatic first paint available",
    brokenStorage: true,
    expected: "playing",
  },
]) {
  await check(scenario.label, () => {
    const fixture = browser(scenario);
    runInNewContext(motionInitScript, fixture);
    assert.equal(fixture.document.documentElement.dataset.motion, scenario.expected);
    assert.equal(fixture.mediaReads(), 0);
  });
}

async function withBrowser(options, run) {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  const fixture = browser(options);
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    writable: true,
    value: fixture.window,
  });
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    writable: true,
    value: fixture.document,
  });
  try {
    const motion = await import(`../src/lib/motion.ts?test=${checks}`);
    await run(motion, fixture);
    assert.equal(fixture.activeListeners.size, 0);
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else delete globalThis.window;
    if (previousDocument)
      Object.defineProperty(globalThis, "document", previousDocument);
    else delete globalThis.document;
  }
}

await check("Client motion defaults to playing without device preference reads", () =>
  withBrowser({ reduced: true }, (motion, fixture) => {
    assert.equal(motion.getMotionEnabledSnapshot(), true);
    let notifications = 0;
    const unsubscribe = motion.subscribeMotion(() => notifications++);
    assert.equal(fixture.document.documentElement.dataset.motion, "playing");
    fixture.media.matches = false;
    fixture.media.dispatchEvent(new Event("change"));
    assert.equal(motion.getMotionEnabledSnapshot(), true);
    assert.equal(notifications, 0);
    assert.equal(fixture.mediaReads(), 0);
    unsubscribe();
  }),
);

await check("Saved pause stays consistent through bootstrap and subscription", () =>
  withBrowser({ stored: "paused", reduced: true }, (motion, fixture) => {
    runInNewContext(motionInitScript, fixture);
    assert.equal(motion.getMotionEnabledSnapshot(), false);
    const unsubscribe = motion.subscribeMotion(() => {});
    assert.equal(motion.getMotionEnabledSnapshot(), false);
    assert.equal(fixture.document.documentElement.dataset.motion, "paused");
    assert.equal(motion.getServerMotionSnapshot(), false);
    unsubscribe();
  }),
);

await check("Selection applies, persists, and notifies every active subscriber", () =>
  withBrowser({}, (motion, fixture) => {
    let first = 0;
    let second = 0;
    const unsubscribeFirst = motion.subscribeMotion(() => first++);
    const unsubscribeSecond = motion.subscribeMotion(() => second++);
    motion.setMotionEnabled(false);
    assert.equal(motion.getMotionEnabledSnapshot(), false);
    assert.equal(fixture.document.documentElement.dataset.motion, "paused");
    assert.equal(fixture.values.get(MOTION_STORAGE_KEY), "paused");
    assert.deepEqual([first, second], [1, 1]);
    motion.setMotionEnabled(true);
    assert.equal(motion.getMotionEnabledSnapshot(), true);
    assert.equal(fixture.document.documentElement.dataset.motion, "playing");
    assert.equal(fixture.values.get(MOTION_STORAGE_KEY), "playing");
    assert.deepEqual([first, second], [2, 2]);
    unsubscribeFirst();
    motion.setMotionEnabled(false);
    assert.deepEqual([first, second], [2, 3]);
    unsubscribeSecond();
  }),
);

await check("Pause and play remain selected for the session when storage is blocked", () =>
  withBrowser({ brokenStorage: true, reduced: true }, (motion, fixture) => {
    const unsubscribe = motion.subscribeMotion(() => {});
    assert.equal(motion.getMotionEnabledSnapshot(), true);
    assert.doesNotThrow(() => motion.setMotionEnabled(false));
    assert.equal(motion.getMotionEnabledSnapshot(), false);
    assert.equal(fixture.document.documentElement.dataset.motion, "paused");
    unsubscribe();
    const resubscribe = motion.subscribeMotion(() => {});
    assert.equal(motion.getMotionEnabledSnapshot(), false);
    motion.setMotionEnabled(true);
    assert.equal(motion.getMotionEnabledSnapshot(), true);
    assert.equal(fixture.document.documentElement.dataset.motion, "playing");
    resubscribe();
  }),
);

await check("Invalid runtime selections do not change or persist visitor preferences", () =>
  withBrowser({}, (motion, fixture) => {
    let notifications = 0;
    const unsubscribe = motion.subscribeMotion(() => notifications++);
    for (const invalid of [undefined, null, "paused", 0, 1])
      motion.setMotionEnabled(invalid);
    assert.equal(motion.getMotionEnabledSnapshot(), true);
    assert.equal(fixture.document.documentElement.dataset.motion, "playing");
    assert.equal(fixture.values.has(MOTION_STORAGE_KEY), false);
    assert.equal(notifications, 0);
    unsubscribe();
  }),
);

await check("Other tabs update motion while unrelated storage changes are ignored", () =>
  withBrowser({}, (motion, fixture) => {
    let notifications = 0;
    const unsubscribe = motion.subscribeMotion(() => notifications++);
    fixture.dispatchStorage("another-key", "paused");
    assert.equal(motion.getMotionEnabledSnapshot(), true);
    assert.equal(notifications, 0);
    fixture.dispatchStorage(MOTION_STORAGE_KEY, "paused");
    assert.equal(motion.getMotionEnabledSnapshot(), false);
    assert.equal(fixture.document.documentElement.dataset.motion, "paused");
    fixture.dispatchStorage(MOTION_STORAGE_KEY, "playing");
    assert.equal(motion.getMotionEnabledSnapshot(), true);
    assert.equal(fixture.document.documentElement.dataset.motion, "playing");
    assert.equal(notifications, 2);
    unsubscribe();
  }),
);

await check("Removed, cleared, or invalid stored motion restores automatic play", () =>
  withBrowser({ stored: "paused" }, (motion, fixture) => {
    let notifications = 0;
    const unsubscribe = motion.subscribeMotion(() => notifications++);
    fixture.dispatchStorage(MOTION_STORAGE_KEY, null);
    assert.equal(motion.getMotionEnabledSnapshot(), true);
    fixture.dispatchStorage(MOTION_STORAGE_KEY, "paused");
    assert.equal(motion.getMotionEnabledSnapshot(), false);
    fixture.dispatchStorage(MOTION_STORAGE_KEY, "invalid");
    assert.equal(motion.getMotionEnabledSnapshot(), true);
    fixture.dispatchStorage(MOTION_STORAGE_KEY, "paused");
    fixture.dispatchStorage(null, null);
    assert.equal(motion.getMotionEnabledSnapshot(), true);
    assert.equal(fixture.document.documentElement.dataset.motion, "playing");
    assert.equal(notifications, 5);
    unsubscribe();
  }),
);

await check("Unsubscribe removes motion and cross-tab listeners", () =>
  withBrowser({}, (motion, fixture) => {
    let notifications = 0;
    const unsubscribe = motion.subscribeMotion(() => notifications++);
    assert.equal(fixture.activeListeners.size, 2);
    unsubscribe();
    assert.equal(fixture.activeListeners.size, 0);
    motion.setMotionEnabled(false);
    fixture.dispatchStorage(MOTION_STORAGE_KEY, "playing");
    assert.equal(notifications, 0);
    assert.equal(motion.getMotionEnabledSnapshot(), false);
  }),
);

await check("Visibility changes are observable and their subscription cleans up", () =>
  withBrowser({}, (motion, fixture) => {
    let notifications = 0;
    const unsubscribe = motion.subscribeVisibility(() => notifications++);
    assert.equal(motion.getVisibility(), true);
    fixture.document.visibilityState = "hidden";
    fixture.document.dispatchEvent(new Event("visibilitychange"));
    assert.equal(motion.getVisibility(), false);
    assert.equal(notifications, 1);
    unsubscribe();
    fixture.document.visibilityState = "visible";
    fixture.document.dispatchEvent(new Event("visibilitychange"));
    assert.equal(notifications, 1);
  }),
);

await check("Server snapshots and safe operations work without browser globals", async () => {
  const motion = await import("../src/lib/motion.ts?server");
  assert.equal(motion.getServerMotionSnapshot(), false);
  assert.equal(motion.getMotionEnabledSnapshot(), false);
  assert.equal(motion.getVisibility(), false);
  assert.doesNotThrow(() => motion.setMotionEnabled(false));
  assert.doesNotThrow(() => motion.subscribeMotion(() => {})());
  assert.doesNotThrow(() => motion.subscribeVisibility(() => {})());
});

await check("Server snapshot never reads browser state even when access would throw", async () => {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    get() {
      throw new Error("Browser state must not be read during server rendering");
    },
  });
  try {
    const motion = await import("../src/lib/motion.ts?server-no-window-read");
    assert.equal(motion.getServerMotionSnapshot(), false);
    assert.equal(motion.getMotionEnabledSnapshot(), false);
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else delete globalThis.window;
  }
});

console.log(`\n${checks} motion behavior checks passed.`);
