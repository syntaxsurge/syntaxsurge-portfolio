import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { projects, awards } from "../src/data/portfolio.ts";
import { business } from "../src/data/business.ts";
import { awardMedia } from "../src/data/award-media.ts";
import { projectPreviews } from "../src/data/project-media.ts";
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
const imageSources = (html) =>
  [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map((match) => {
    const url = new URL(match[1].replaceAll("&amp;", "&"), siteHref());
    return url.pathname === "/_next/image"
      ? url.searchParams.get("url")
      : url.pathname;
  });
let checks = 0;
function check(label, run) {
  run();
  checks++;
  console.log(`PASS ${label}`);
}
check("Complete, unique project and award collection", () => {
  assert.equal(projects.length, 19);
  assert.equal(new Set(projects.map((p) => p.id)).size, 19);
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
const recognition = read("recognition.html");
check(
  "Business homepage has direct navigation, registration, and founder résumé",
  () => {
    assert.equal((homepage.match(/<h1\b/g) || []).length, 1);
    assert.ok(homepage.includes('id="main"'));
    for (const id of ["services", "work", "team", "registration", "contact"])
      assert.ok(homepage.includes(`id="${id}"`));
    const header = homepage.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1];
    assert.ok(header);
    for (const id of ["services", "work", "team"])
      assert.ok(header.includes(`href="/#${id}"`));
    assert.ok(header.includes('href="#contact"'));
    assert.ok(header.includes(business.name));
    assert.ok(homepage.includes(business.legalName));
    assert.ok(homepage.includes(business.founder.name));
    assert.ok(plain(homepage).includes(business.certificate.number));
    assert.ok(plain(homepage).includes(`${business.certificate.scope} scope`));
    const certificateLinks = [...homepage.matchAll(/<a\b[^>]*>/g)]
      .map((match) => match[0])
      .filter((link) => link.includes(`href="${business.certificate.href}"`));
    assert.equal(certificateLinks.length, 3);
    assert.ok(certificateLinks.some((link) => /\bdownload=/.test(link)));
    const certificate = readFileSync(
      resolve(root, "public", business.certificate.href.slice(1)),
    );
    assert.equal(certificate.subarray(0, 5).toString(), "%PDF-");
    const resumeLinks = [...homepage.matchAll(/<a\b[^>]*>/g)]
      .map((match) => match[0])
      .filter((link) => link.includes(`href="${business.resumeHref}"`));
    assert.equal(resumeLinks.length, 4);
    assert.equal(
      resumeLinks.filter((link) => /\bdownload=/.test(link)).length,
      3,
    );
    assert.ok(resumeLinks.some((link) => link.includes('target="_blank"')));
    assert.ok(header.includes(`href="${business.resumeHref}"`));
    const hero = homepage.match(
      /<section\b[^>]*class="business-hero shell"[^>]*>([\s\S]*?)<\/section>/,
    )?.[1];
    assert.ok(hero && hero.includes(`href="${business.resumeHref}"`));
    const resume = readFileSync(
      resolve(root, "public", business.resumeHref.slice(1)),
    );
    assert.equal(resume.subarray(0, 5).toString(), "%PDF-");
    assert.ok(!homepage.includes('href="/work"'));
    assert.ok(homepage.includes('href="/recognition"'));
    assert.ok(!homepage.includes("<details"));
    assert.ok(!homepage.includes("Create Next App"));
  },
);
check("Business contact uses the owner-supplied email", () => {
  assert.equal(business.email, "syntaxsurge@gmail.com");
  assert.equal(business.links.email, `mailto:${business.email}`);
  assert.ok(homepage.includes(`href="${business.links.email}"`));
  const footer = homepage.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
  assert.ok(footer && footer.includes(`href="${business.links.email}"`));
  assert.ok(plain(footer).includes(business.email));
});
check("All services have local SVG illustrations", () => {
  const cards = [
    ...homepage.matchAll(
      /<article\b[^>]*class="service-card"[^>]*>([\s\S]*?)<\/article>/g,
    ),
  ].map((match) => match[1]);
  assert.equal(business.services.length, 3);
  assert.equal(cards.length, business.services.length);
  assert.equal(
    new Set(business.services.map((service) => service.image)).size,
    3,
  );
  for (const service of business.services) {
    const card = cards.find((html) => plain(html).includes(service.title));
    assert.ok(card && imageSources(card).includes(service.image));
    assert.ok(service.image.startsWith("/images/"));
    assert.ok(service.image.endsWith(".svg"));
    const illustration = readFileSync(
      resolve(root, "public", service.image.slice(1)),
      "utf8",
    );
    assert.match(illustration, /<svg\b/);
    assert.match(illustration, /viewBox="[^"]+"/);
  }
});
check(
  "Homepage collection has all project previews and on-request demo controls",
  () => {
    assert.deepEqual(
      Object.keys(projectPreviews).sort(),
      projects.map((project) => project.id).sort(),
    );
    const cards = [
      ...homepage.matchAll(
        /<article\b[^>]*class="archive-row"[^>]*>([\s\S]*?)<\/article>/g,
      ),
    ].map((match) => match[1]);
    assert.equal(cards.length, projects.length);
    assert.equal((homepage.match(/<iframe\b/g) || []).length, 0);
    const demoCount = projects.filter(
      (project) => projectPreviews[project.id].demo,
    ).length;
    assert.equal(demoCount, 14);
    const demoButtons = [
      ...homepage.matchAll(/<button\b[^>]*class="archive-preview"[^>]*>/g),
    ];
    assert.equal(demoButtons.length, demoCount);
    for (const button of demoButtons)
      assert.ok(button[0].includes('aria-expanded="false"'));
    for (const project of projects) {
      const preview = projectPreviews[project.id];
      const card = cards.find((html) =>
        html.includes(`href="/work/${project.id}"`),
      );
      assert.ok(card, `Collection card for ${project.title}`);
      assert.equal((card.match(/<h3\b/g) || []).length, 1);
      assert.ok(plain(card).includes(project.title));
      assert.ok(plain(card).includes(preview.summary));
      assert.ok(
        card.includes(
          `href="${project.links[0].href.replaceAll("&", "&amp;")}"`,
        ),
      );
      const images = [...card.matchAll(/<img\b[^>]*>/g)];
      assert.equal(images.length, 1);
      assert.ok(imageSources(card).includes(preview.image.src));
      assert.ok(preview.image.alt.length > 10);
      assert.ok(preview.image.width > 0 && preview.image.height > 0);
      const file = readFileSync(
        resolve(root, "public", preview.image.src.slice(1)),
      );
      assert.equal(file.subarray(8, 12).toString(), "WEBP");
      if (preview.demo) {
        assert.equal(new URL(preview.demo.href).hostname, "www.youtube.com");
        assert.ok(new URL(preview.demo.href).searchParams.get("v"));
        assert.ok(card.includes(`aria-controls="project-demo-${project.id}"`));
        const demoRegion = card.match(
          new RegExp(`<div\\b(?=[^>]*id="project-demo-${project.id}")[^>]*>`),
        )?.[0];
        assert.ok(demoRegion && /\bhidden=""/.test(demoRegion));
      } else {
        assert.ok(plain(card).includes(preview.label));
      }
    }
    assert.ok(homepage.includes('aria-label="Filter projects"'));
    assert.ok(homepage.includes('aria-pressed="true"'));
    assert.ok(homepage.includes('aria-live="polite"'));
    assert.ok(homepage.includes('id="project-results"'));
  },
);
check("Recognition has an accessible standalone route", () => {
  assert.equal((recognition.match(/<h1\b/g) || []).length, 1);
  assert.ok(recognition.includes('id="main"'));
  assert.ok(recognition.includes('aria-label="Breadcrumb"'));
  assert.equal(
    (recognition.match(/class="award-card(?: award-card-compact)?"/g) || [])
      .length,
    awards.length,
  );
  const dental = projects.find((p) => p.id === "mc-dental-station");
  assert.equal(dental.links[0].href, "https://mc-dental.syntaxsurge.com/");
  assert.ok(
    read("work/mc-dental-station.html").includes(
      "Clinic staff confirm the final appointment",
    ),
  );
  assert.ok(read("work/mc-dental-station.html").includes("Project artwork."));
});
check(
  "Collection address redirects permanently to the homepage work section",
  () => {
    assert.ok(!existsSync(resolve(root, "src/app/work/page.tsx")));
    assert.ok(!existsSync(resolve(app, "work.html")));
    const routes = JSON.parse(
      readFileSync(resolve(root, ".next/routes-manifest.json"), "utf8"),
    );
    const redirect = routes.redirects.find((route) => route.source === "/work");
    assert.ok(redirect);
    assert.equal(redirect.destination, "/#work");
    assert.equal(redirect.statusCode, 308);
  },
);
check(
  "Hero presents the supplied workspace photograph without a runtime video",
  () => {
    const hero = homepage.match(
      /<section\b[^>]*class="business-hero shell"[^>]*>([\s\S]*?)<\/section>/,
    )?.[1];
    assert.ok(hero);
    assert.ok(hero.includes('class="hero-portrait"'));
    const sources = imageSources(hero);
    assert.ok(sources.includes(business.heroPortrait.src));
    assert.ok(hero.includes(business.heroPortrait.alt));
    assert.ok(!sources.includes(business.logo.src));
    assert.equal((hero.match(/<video\b/g) || []).length, 0);
    const photograph = readFileSync(
      resolve(root, "public", business.heroPortrait.src.slice(1)),
    );
    assert.equal(photograph.subarray(8, 12).toString(), "WEBP");
    assert.ok(!existsSync(resolve(root, "public/videos/hero-loop.mp4")));
    assert.ok(
      !existsSync(resolve(root, "public/images/hero-loop-poster.webp")),
    );
  },
);
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
check("Every recognition has local media and a direct YouTube link", () => {
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
    assert.ok(recognition.includes(`href="${media.video.href}"`));
    assert.ok(
      read(`work/${award.projectId}.html`).includes(
        `href="${media.video.href}"`,
      ),
    );
  }
});
check("Domain metadata and sitemap use the portfolio origin", () => {
  assert.equal(parseSiteOrigin().origin, "https://syntaxsurge.com");
  for (const value of [
    "https://syntaxsurge.com/work/kaldi",
    "https://user:password@example.com",
    "javascript:alert(1)",
  ]) {
    assert.throws(() => parseSiteOrigin(value));
  }
  assert.throws(() => siteHref("//example.com"));
  const homepageCanonical = homepage.match(
    /rel="canonical" href="([^"]+)"/,
  )?.[1];
  assert.ok(homepageCanonical);
  assert.equal(new URL(homepageCanonical).href, siteHref());
  const sitemap = read("sitemap.xml.body");
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  const expected = new Set([
    siteHref("/"),
    siteHref("/recognition"),
    ...projects.map((project) => siteHref(`/work/${project.id}`)),
    ...wrapItUpPaths.map((path) => siteHref(path)),
  ]);
  assert.equal(locations.length, expected.size);
  assert.equal(locations.length, 23);
  assert.equal(new Set(locations).size, locations.length);
  assert.ok(!sitemap.includes("/apps/wrap-it-up"));
  assert.ok(!locations.includes(siteHref("/work")));
  assert.ok(
    recognition.includes(`rel="canonical" href="${siteHref("/recognition")}"`),
  );
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
check(
  "Wrap It Up! pages have public metadata, support, and honest beta links",
  () => {
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
    assert.ok(
      game.includes("not yet a public App Store or Google Play release"),
    );
    assert.ok(support.includes(wrapItUp.supportEmail));
    assert.ok(support.includes("<details"));
    assert.ok(support.includes("cannot restore a local save from a server"));
    for (const html of [game, support, privacy]) {
      assert.ok(html.includes("ESRB Everyone"));
      assert.ok(html.includes("PEGI 3"));
      assert.ok(html.includes("18+ in Australia"));
    }
    for (const html of [game, support]) {
      if (wrapItUp.closedTestingAvailable) {
        assert.ok(html.includes(`href="${wrapItUp.playClosedTestingUrl}"`));
        assert.ok(html.includes("first leave it"));
      } else {
        assert.ok(
          html.includes(
            "closed Alpha test is not yet available; review and publication must be confirmed first",
          ),
        );
        assert.ok(!html.includes(`href="${wrapItUp.playClosedTestingUrl}"`));
      }
    }
    assert.ok(privacy.includes(wrapItUp.supportEmail));
    assert.ok(privacy.includes("automatic startup entry points"));
    assert.ok(privacy.includes("Google Mobile Ads"));
    assert.ok(!privacy.includes("collect no data"));
    assert.ok(privacy.includes("In build 4"));
    assert.ok(privacy.includes("The distributed Android beta"));
    assert.ok(privacy.includes(wrapItUp.version));
    assert.ok(!privacy.toLowerCase().includes("release candidate"));
  },
);
check(
  "Installed beta links redirect permanently to the canonical project pages",
  () => {
    assert.ok(!existsSync(resolve(root, "src/app/apps/wrap-it-up/page.tsx")));
    assert.ok(!existsSync(resolve(app, "apps/wrap-it-up.html")));
    assert.ok(!homepage.includes("/apps/wrap-it-up"));
    const routes = JSON.parse(
      readFileSync(resolve(root, ".next/routes-manifest.json"), "utf8"),
    );
    for (const suffix of ["", "/support", "/privacy"]) {
      const redirect = routes.redirects.find(
        (route) => route.source === `/apps/wrap-it-up${suffix}`,
      );
      assert.ok(redirect);
      assert.equal(redirect.destination, `${wrapItUp.path}${suffix}`);
      assert.equal(redirect.statusCode, 308);
    }
  },
);
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
    for (const id of ["services", "work", "team"])
      assert.ok(header.includes(`href="/#${id}"`));
    assert.ok(header.includes('href="#contact"'));
    assert.ok(header.includes(`href="${business.resumeHref}"`));
    assert.ok(html.includes('href="/#work"'));
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
    "mc-dental-feature.webp",
    "syntaxsurge-logo.jpg",
    "jade-laurence-empleo.jpg",
    "syntax-surge-dti-certificate.png",
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
check("Space Grotesk headings are served from a licensed local font", () => {
  const font = readFileSync(
    resolve(root, "public/fonts/space-grotesk-variable.woff2"),
  );
  assert.equal(font.subarray(0, 4).toString(), "wOF2");
  assert.ok(
    readFileSync(resolve(root, "public/fonts/OFL.txt"), "utf8").includes(
      "SIL OPEN FONT LICENSE",
    ),
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
