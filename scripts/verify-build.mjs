import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { projects, awards } from "../src/data/portfolio.ts";
import { awardMedia } from "../src/data/award-media.ts";
import { parseSiteOrigin, siteHref } from "../src/lib/site.ts";
import { wrapItUp, wrapItUpPaths } from "../src/data/wrap-it-up.ts";
const root = process.cwd();
const app = resolve(root, ".next/server/app");
const read = (file) => readFileSync(resolve(app, file), "utf8");
const plain = (s) =>
  s
    .replace(/<[^>]*>/g, "")
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"');
let checks = 0;
function check(label, run) {
  run();
  checks++;
  console.log(`PASS ${label}`);
}
check("Complete, unique project and award collection", () => {
  assert.equal(projects.length, 18);
  assert.equal(new Set(projects.map((p) => p.id)).size, 18);
  assert.equal(awards.length, 14);
  for (const p of projects) {
    assert.match(p.id, /^[a-z0-9-]+$/);
    assert.ok(p.links.length);
    for (const link of p.links)
      assert.equal(new URL(link.href).protocol, "https:");
  }
  for (const a of awards) {
    assert.ok(projects.some((p) => p.id === a.projectId));
    assert.match(a.date, /^20\d{2}-\d{2}$/);
  }
  assert.ok(awards.some((a) => a.prize?.includes("MUSD")));
});
const homepage = read("index.html");
check("Homepage landmarks, navigation, and all project destinations", () => {
  assert.equal((homepage.match(/<h1\b/g) || []).length, 1);
  assert.ok(homepage.includes('id="main"'));
  for (const id of ["work", "about", "recognition", "archive", "contact"])
    assert.ok(homepage.includes(`id="${id}"`));
  const header = homepage.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1];
  assert.ok(header);
  for (const id of ["work", "archive", "about", "recognition", "contact"])
    assert.ok(header.includes(`href="/#${id}"`));
  assert.ok(homepage.indexOf('id="archive"') < homepage.indexOf('id="about"'));
  assert.ok(!homepage.includes("<details"));
  assert.equal(
    (homepage.match(/class="award-card(?: award-card-compact)?"/g) || []).length,
    awards.length,
  );
  for (const p of projects)
    assert.ok(homepage.includes(`href="/work/${p.id}"`));
  assert.ok(!homepage.includes("Create Next App"));
  assert.ok(homepage.includes('aria-pressed="true"'));
  assert.ok(homepage.includes('aria-live="polite"'));
});
check(
  "Theme is initialized before content and both controls are available",
  () => {
    const bodyStart = homepage.indexOf("<body");
    const initializer = homepage.indexOf('<script id="syntaxsurge-theme-init"');
    assert.ok(bodyStart >= 0 && initializer > bodyStart);
    assert.ok(initializer < homepage.indexOf('class="skip-link"'));
    const head = homepage.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
    assert.ok(!head.includes("syntaxsurge-theme"));
    assert.ok(homepage.includes('aria-label="Color theme"'));
    assert.ok(homepage.includes('data-mode="light"'));
    assert.ok(homepage.includes('data-mode="dark"'));
  },
);
check(
  "Every recognition has local media and a direct YouTube link",
  () => {
    assert.equal(Object.keys(awardMedia).length, awards.length);
    for (const award of awards) {
      const media = awardMedia[award.projectId];
      assert.ok(media.image.alt.length > 10);
      assert.ok(media.image.width > 0 && media.image.height > 0);
      const buffer = readFileSync(
        resolve(root, "public", media.image.src.slice(1)),
      );
      assert.equal(buffer.subarray(8, 12).toString(), "WEBP");
      assert.equal(new URL(media.video.href).hostname, "www.youtube.com");
      assert.ok(homepage.includes(`href="${media.video.href}"`));
      assert.ok(
        read(`work/${award.projectId}.html`).includes(
          `href="${media.video.href}"`,
        ),
      );
    }
  },
);
check("Domain metadata and sitemap use the portfolio origin", () => {
  assert.equal(parseSiteOrigin().origin, "https://syntaxsurge.com");
  for (const value of [
    "https://syntaxsurge.com/kaldi-coffee",
    "https://user:password@example.com",
    "javascript:alert(1)",
  ]) {
    assert.throws(() => parseSiteOrigin(value));
  }
  assert.throws(() => siteHref("//example.com"));
  const homepageCanonical = homepage.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(homepageCanonical);
  assert.equal(new URL(homepageCanonical).href, siteHref());
  const sitemap = read("sitemap.xml.body");
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  const expected = new Set([siteHref("/"), ...projects.map((project) => siteHref(`/work/${project.id}`)), ...wrapItUpPaths.map((path) => siteHref(path))]);
  assert.equal(locations.length, expected.size);
  assert.equal(new Set(locations).size, locations.length);
  assert.ok(!sitemap.includes("/apps/wrap-it-up"));
  for (const project of projects) {
    const canonical = siteHref(`/work/${project.id}`);
    assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
    assert.ok(
      read(`work/${project.id}.html`).includes(
        `rel="canonical" href="${canonical}"`,
      ),
    );
  }
  assert.ok(read("robots.txt.body").includes(siteHref("/sitemap.xml")));
});
check("Wrap It Up! pages have public metadata, support, and honest beta links", () => {
  const sitemap = read("sitemap.xml.body");
  for (const path of wrapItUpPaths) {
    const html = read(`${path.slice(1)}.html`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(html.includes('id="main"'));
    assert.ok(html.includes('aria-label="Wrap It Up! navigation"'));
    assert.ok(html.includes(`rel="canonical" href="${siteHref(path)}"`));
    assert.ok(html.includes('name="description"'));
    assert.ok(html.includes('property="og:image"'));
    assert.ok(html.includes(wrapItUp.version));
    assert.ok(!html.includes("/apps/wrap-it-up"));
    assert.ok(sitemap.includes(`<loc>${siteHref(path)}</loc>`));
    for (const destination of wrapItUpPaths)
      assert.ok(html.includes(`href="${destination}"`));
  }
  const game = read("work/wrap-it-up.html");
  const support = read("work/wrap-it-up/support.html");
  const privacy = read("work/wrap-it-up/privacy.html");
  assert.ok(game.includes("Your own cozy wrapping shop."));
  assert.ok(game.includes("PROJECT FOCUS"));
  assert.ok(game.includes('aria-label="More projects"'));
  assert.ok(game.includes(`href="${wrapItUp.playTestingUrl}"`));
  assert.ok(game.includes(`href="${wrapItUp.testFlightUrl}"`));
  assert.ok(game.includes("allowlisted Google account"));
  assert.ok(game.includes("not yet a public App Store or Google Play release"));
  assert.ok(support.includes(wrapItUp.supportEmail));
  assert.ok(support.includes("<details"));
  assert.ok(support.includes("cannot restore a local save from a server"));
  assert.ok(privacy.includes(wrapItUp.supportEmail));
  assert.ok(privacy.includes("automatic startup entry points"));
  assert.ok(privacy.includes("Google Mobile Ads"));
  assert.ok(!privacy.includes("collect no data"));
  assert.ok(privacy.includes("In build 4"));
  assert.ok(privacy.includes("The distributed Android beta"));
  assert.ok(privacy.includes(wrapItUp.version));
  assert.ok(!privacy.toLowerCase().includes("release candidate"));
});
check("Installed beta links redirect permanently to the canonical project pages", () => {
  assert.ok(!existsSync(resolve(root, "src/app/apps/wrap-it-up/page.tsx")));
  assert.ok(!existsSync(resolve(app, "apps/wrap-it-up.html")));
  assert.ok(!homepage.includes("/apps/wrap-it-up"));
  const routes = JSON.parse(readFileSync(resolve(root, ".next/routes-manifest.json"), "utf8"));
  for (const suffix of ["", "/support", "/privacy"]) {
    const redirect = routes.redirects.find((route) => route.source === `/apps/wrap-it-up${suffix}`);
    assert.ok(redirect);
    assert.equal(redirect.destination, `${wrapItUp.path}${suffix}`);
    assert.equal(redirect.statusCode, 308);
  }
});
for (const project of projects) {
  check(`Static project page: ${project.title}`, () => {
    const html = read(`work/${project.id}.html`);
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
    assert.equal(headings.length, 1);
    assert.ok(plain(headings[0][1]).includes(project.title));
    assert.ok(html.includes('name="description"'));
    assert.ok(html.includes('id="main"'));
    assert.ok(html.includes('aria-label="Breadcrumb"'));
    assert.ok(html.includes('aria-label="More projects"'));
    const header = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1];
    assert.ok(header);
    for (const id of ["work", "archive", "about", "recognition", "contact"])
      assert.ok(header.includes(`href="/#${id}"`));
    for (const link of project.links)
      assert.ok(html.includes(`href="${link.href.replaceAll("&", "&amp;")}"`));
  });
}
check("Project artwork is local and present", () => {
  for (const filename of [
    "cliplore-cover.webp",
    "studysoda-cover.webp",
    "sipava-cover.webp",
    "kaldi-cover.webp",
  ]) {
    const file = resolve(root, "public/images", filename);
    assert.ok(existsSync(file));
    assert.ok(readFileSync(file).length > 1000);
  }
  assert.ok(!existsSync(resolve(root, "src/app/favicon.ico")));
});
check("Social preview is a generated PNG", () => {
  assert.ok(homepage.includes('property="og:image"'));
  const file = resolve(app, "opengraph-image.body");
  assert.ok(existsSync(file));
  assert.equal(readFileSync(file).subarray(1, 4).toString(), "PNG");
});
check("CSS includes responsive and reduced-motion rules", () => {
  const css = readdirSync(resolve(root, ".next/static/chunks"))
    .filter((f) => f.endsWith(".css"))
    .map((f) => readFileSync(resolve(root, ".next/static/chunks", f), "utf8"))
    .join("");
  assert.ok(css.includes("prefers-reduced-motion"));
  assert.ok(css.includes("focus-visible"));
  assert.ok(css.includes("700px"));
  assert.ok(
    css.includes('data-theme="dark"') || css.includes("data-theme=dark"),
  );
});
check("Normal text colors meet 4.5:1 on theme content surfaces", () => {
  const css = readFileSync(resolve(root, "src/app/globals.css"), "utf8");
  function luminance(hex) {
    const rgb = [1, 3, 5]
      .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  }
  for (const selector of [
    /:root\s*\{([^}]+)/,
    /:root\[data-theme="dark"\]\s*\{([^}]+)/,
  ]) {
    const properties = Object.fromEntries(
      [
        ...css.match(selector)[1].matchAll(/--([\w-]+):\s*(#[0-9a-f]{6});/g),
      ].map((m) => [m[1], m[2]]),
    );
    for (const foreground of ["ink", "muted", "accent"])
      for (const background of ["paper", "surface", "elevated"]) {
        const values = [
          luminance(properties[foreground]),
          luminance(properties[background]),
        ].sort((a, b) => a - b);
        assert.ok(
          (values[1] + 0.05) / (values[0] + 0.05) >= 4.5,
          `${foreground} on ${background}`,
        );
      }
  }
});
console.log(
  `\n${checks} checks passed. These inspect built artifacts; they do not substitute for browser interaction or visual testing.`,
);
