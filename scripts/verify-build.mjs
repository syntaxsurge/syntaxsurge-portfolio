import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { projects, awards } from "../src/data/portfolio.ts";
import { business } from "../src/data/business.ts";
import { awardMedia } from "../src/data/award-media.ts";
import { projectPreviews } from "../src/data/project-media.ts";
import { parseSiteOrigin, siteHref } from "../src/lib/site.ts";
import { wrapItUp, wrapItUpPaths } from "../src/data/wrap-it-up.ts";
import { motionInitScript } from "../src/lib/motion.ts";
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
  assert.equal(projects.length, 20);
  assert.equal(new Set(projects.map((p) => p.id)).size, 20);
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
check(
  "ClipLore products have separate identities, destinations, and attribution",
  () => {
    const original = projects.find((project) => project.id === "cliplore");
    const current = projects.find((project) => project.id === "cliplore-ai");
    assert.ok(original && current);
    assert.equal(original.title, "ClipLore for Story Protocol");
    assert.equal(original.category, "AI & Web3");
    assert.equal(original.year, "2025");
    assert.match(original.description, /Story Protocol/);
    for (const feature of [/licens/i, /remix/i, /enforce/i])
      assert.match(original.description, feature);
    assert.deepEqual(
      new Set(original.links.map((link) => link.href)),
      new Set([
        "https://github.com/syntaxsurge/cliplore",
        "https://www.youtube.com/watch?v=WRJlQDFcxVI",
      ]),
    );
    assert.match(original.award, /Story Protocol/);
    assert.equal(current.title, "ClipLore.ai");
    assert.equal(current.category, "Products");
    assert.equal(current.year, "Current");
    assert.deepEqual(
      current.links.map((link) => link.href),
      ["https://cliplore.ai/"],
    );
    assert.equal(current.award, undefined);
    const originalAwards = awards.filter(
      (award) => award.projectId === original.id,
    );
    assert.equal(originalAwards.length, 1);
    assert.equal(originalAwards[0].event, "Surreal World Assets Buildathon 2");
    assert.equal(
      awards.filter((award) => award.projectId === current.id).length,
      0,
    );
    assert.equal(awardMedia[current.id], undefined);
    assert.equal(
      projectPreviews[original.id].demo.href,
      awardMedia[original.id].video.href,
    );
    assert.equal(projectPreviews[current.id].demo, undefined);
    assert.equal(
      projectPreviews[original.id].image.src,
      "/images/awards/cliplore.webp",
    );
    assert.equal(
      projectPreviews[current.id].image.src,
      "/images/cliplore-ai-preview.webp",
    );
    assert.notEqual(
      projectPreviews[current.id].image.src,
      projectPreviews[original.id].image.src,
    );
  },
);
const homepage = read("index.html");
const recognition = read("recognition.html");
check(
  "ClipLore pages and collection cards show each project's own cover and links",
  () => {
    const original = read("work/cliplore.html");
    const current = read("work/cliplore-ai.html");
    const originalCover = projectPreviews.cliplore.image.src;
    const currentCover = projectPreviews["cliplore-ai"].image.src;
    const originalDemo = awardMedia.cliplore.video.href;
    const originalSource = awardMedia.cliplore.source.href;
    const currentWebsite = "https://cliplore.ai/";
    assert.ok(imageSources(original).includes(originalCover));
    assert.ok(!imageSources(original).includes(currentCover));
    assert.ok(original.includes(`href="${originalDemo}"`));
    assert.ok(original.includes(`href="${originalSource}"`));
    assert.ok(original.includes("Surreal World Assets Buildathon 2"));
    assert.ok(!original.includes(`href="${currentWebsite}"`));
    assert.ok(imageSources(current).includes(currentCover));
    assert.ok(!imageSources(current).includes(originalCover));
    assert.ok(current.includes(`href="${currentWebsite}"`));
    assert.ok(!current.includes(`href="${originalDemo}"`));
    assert.ok(!current.includes(`href="${originalSource}"`));
    assert.ok(!current.includes("Surreal World Assets Buildathon 2"));
    assert.ok(!recognition.includes(`href="/work/cliplore-ai#top"`));
    assert.ok(recognition.includes('href="/work/cliplore#top"'));
    const cards = [
      ...homepage.matchAll(
        /<article\b[^>]*class="archive-row"[^>]*>([\s\S]*?)<\/article>/g,
      ),
    ].map((match) => match[1]);
    const originalCard = cards.find((html) =>
      html.includes('href="/work/cliplore#top"'),
    );
    const currentCard = cards.find((html) =>
      html.includes('href="/work/cliplore-ai#top"'),
    );
    assert.ok(originalCard && currentCard);
    assert.ok(imageSources(originalCard).includes(originalCover));
    assert.ok(imageSources(currentCard).includes(currentCover));
    assert.ok(
      originalCard.includes(
        'aria-label="Play ClipLore for Story Protocol demo"',
      ),
    );
    assert.ok(!currentCard.includes('class="archive-preview-play"'));
    assert.ok(currentCard.includes(`href="${currentWebsite}"`));
    for (const html of [original, current, originalCard, currentCard])
      assert.ok(!html.includes("cliplore-cover.webp"));
  },
);
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
    assert.ok(!header.includes(`href="${business.resumeHref}"`));
    assert.ok(!plain(header).includes("Download résumé"));
    const hero = homepage.match(
      /<section\b[^>]*class="business-hero"[^>]*>([\s\S]*?)<\/section>/,
    )?.[1];
    assert.ok(hero && hero.includes('aria-haspopup="dialog"'));
    assert.ok(plain(hero).includes("View résumé"));
    assert.ok(!homepage.includes('href="/work"'));
    assert.ok(homepage.includes('href="/recognition#top"'));
    assert.ok(!homepage.includes("<details"));
    assert.ok(!homepage.includes("Create Next App"));
  },
);
check(
  "Résumé preview has two accessible triggers and one closed download dialog",
  () => {
    const triggers = [
      ...homepage.matchAll(
        /<button\b[^>]*aria-haspopup="dialog"[^>]*>([\s\S]*?)<\/button>/g,
      ),
    ];
    assert.equal(triggers.length, 2);
    const dialogs = [
      ...homepage.matchAll(/<dialog\b[^>]*>([\s\S]*?)<\/dialog>/g),
    ];
    assert.equal(dialogs.length, 1);
    const dialog = dialogs[0];
    const dialogTag = dialog[0].slice(0, dialog[0].indexOf(">") + 1);
    assert.ok(!/\sopen(?:\s|=|>)/.test(dialogTag));
    const dialogId = dialogTag.match(/\bid="([^"]+)"/)?.[1];
    const titleId = dialogTag.match(/\baria-labelledby="([^"]+)"/)?.[1];
    const descriptionId = dialogTag.match(/\baria-describedby="([^"]+)"/)?.[1];
    assert.ok(dialogId && titleId && descriptionId);
    for (const trigger of triggers) {
      assert.equal(plain(trigger[1]).trim(), "View résumé");
      assert.ok(trigger[0].includes(`aria-controls="${dialogId}"`));
      assert.ok(trigger[0].includes('aria-expanded="false"'));
    }
    const title = dialog[1].match(
      new RegExp(`<h2\\b[^>]*id="${titleId}"[^>]*>([\\s\\S]*?)<\\/h2>`),
    )?.[1];
    assert.equal(plain(title ?? "").trim(), "Résumé");
    assert.ok(dialog[1].includes(`id="${descriptionId}"`));
    assert.ok(dialog[1].includes('aria-label="Close résumé preview"'));
    assert.ok(dialog[1].includes('aria-label="Résumé pages"'));
    const downloads = [
      ...dialog[1].matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g),
    ].filter((link) => link[0].includes(`href="${business.resumeHref}"`));
    assert.equal(downloads.length, 1);
    assert.ok(/\bdownload=/.test(downloads[0][0]));
    assert.ok(downloads[0][1].includes("<svg"));
    assert.ok(plain(downloads[0][1]).includes("Download PDF"));
    assert.ok(!downloads[0][0].includes('target="_blank"'));
    assert.equal((dialog[1].match(/<iframe\b/g) || []).length, 0);
    assert.equal(business.resumePreview.length, 2);
    assert.equal(
      new Set(business.resumePreview.map((page) => page.src)).size,
      2,
    );
    const sources = imageSources(homepage);
    for (const page of business.resumePreview) {
      assert.ok(
        !sources.includes(page.src),
        "Closed preview must not render page images",
      );
      assert.ok(page.src.startsWith("/images/") && page.src.endsWith(".webp"));
      assert.ok(page.width > 0 && page.height > page.width);
      assert.ok(page.alt.includes(business.founder.name));
      const image = readFileSync(resolve(root, "public", page.src.slice(1)));
      assert.equal(image.subarray(8, 12).toString(), "WEBP");
      assert.ok(image.length > 1000);
    }
    const resume = readFileSync(
      resolve(root, "public", business.resumeHref.slice(1)),
    );
    assert.equal(resume.subarray(0, 5).toString(), "%PDF-");
  },
);
check("Page navigation starts at the top and résumé viewing stays in its dialog", () => {
  const pages = readdirSync(app, { recursive: true })
    .filter((file) => file.endsWith(".html"))
    .map((file) => ({ file, html: read(file) }));
  assert.ok(pages.length >= projects.length + 4);
  let topLinks = 0;
  for (const { file, html } of pages) {
    if (file === "_global-error.html") {
      assert.equal((html.match(/<a\b/g) || []).length, 0);
      continue;
    }
    const htmlTag = html.match(/<html\b[^>]*>/)?.[0];
    assert.ok(htmlTag?.includes('data-scroll-behavior="smooth"'), file);
    assert.ok(html.includes('<body id="top"'), file);
    const anchors = [...html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)];
    for (const anchor of anchors) {
      const href = anchor[0].match(/\bhref="([^"]+)"/)?.[1];
      assert.ok(href, `${file}: every link has a destination`);
      assert.ok(!/^(?:Preview|Download) r[ée]sum[ée]$/i.test(plain(anchor[1]).trim()), file);
      if ((!href.startsWith("/") && !href.startsWith("#")) || href.startsWith("//")) continue;
      if (href.startsWith("/images/") || href.startsWith("/documents/")) continue;
      const url = new URL(href.replaceAll("&amp;", "&"), `https://example.test/${file === "index.html" ? "" : file.slice(0, -5)}`);
      if (url.hash === "#top") {
        topLinks++;
        continue;
      }
      assert.ok(url.hash, `${file}: page-opening link ${href} needs #top`);
      const destination = href.startsWith("#") ? html : read(url.pathname === "/" ? "index.html" : `${url.pathname.slice(1)}.html`);
      assert.ok(destination.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${file}: fragment ${href} must exist`);
    }
    const outsideDialog = html.replace(/<dialog\b[^>]*>[\s\S]*?<\/dialog>/g, "");
    assert.ok(!outsideDialog.includes(`href="${business.resumeHref}"`), `${file}: PDF download belongs inside the résumé dialog`);
    const dialogs = [...html.matchAll(/<dialog\b[^>]*>/g)];
    assert.equal(dialogs.length, file === "index.html" ? 1 : 0, `${file}: résumé preview belongs to the homepage`);
    for (const dialog of dialogs) assert.ok(!/\sopen(?:\s|=|>)/.test(dialog[0]), file);
  }
  assert.ok(topLinks > projects.length);
  for (const [index, project] of projects.entries()) {
    const html = read(`work/${project.id}.html`);
    const next = projects[(index + 1) % projects.length];
    const navigation = html.match(/<nav\b[^>]*aria-label="More projects"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
    assert.ok(navigation?.includes('href="/#work"'), project.title);
    const nextLink = navigation.match(/<a\b[^>]*class="next-project"[^>]*>([\s\S]*?)<\/a>/);
    assert.ok(nextLink?.[0].includes(`href="/work/${next.id}#top"`), `${project.title}: next project destination`);
    assert.ok(plain(nextLink[1]).includes(next.title), `${project.title}: next project label`);
  }
});
check("Business contact uses the owner-supplied email", () => {
  assert.equal(business.email, "syntaxsurge@gmail.com");
  assert.equal(business.links.email, `mailto:${business.email}`);
  assert.ok(homepage.includes(`href="${business.links.email}"`));
  const footer = homepage.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
  assert.ok(footer && footer.includes(`href="${business.links.email}"`));
  assert.ok(plain(footer).includes(business.email));
});
check(
  "Scroll-through services render complete cards and native jump links",
  () => {
    const nav = homepage.match(
      /<nav\b[^>]*aria-label="Services"[^>]*>([\s\S]*?)<\/nav>/,
    )?.[1];
    const panels = [
      ...homepage.matchAll(
        /<article\b[^>]*id="service-[^"]+"[^>]*>([\s\S]*?)<\/article>/g,
      ),
    ];
    assert.equal(business.services.length, 6);
    assert.ok(nav);
    const links = [...nav.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)];
    assert.equal(links.length, business.services.length);
    assert.equal(panels.length, business.services.length);
    assert.equal(
      links.filter((link) => link[0].includes('aria-current="location"'))
        .length,
      1,
    );
    assert.ok(links[0][0].includes('aria-current="location"'));
    assert.equal(
      new Set(business.services.map((service) => service.id)).size,
      business.services.length,
    );
    const sources = imageSources(homepage);
    for (const [index, service] of business.services.entries()) {
      const panel = panels[index];
      const panelId = `service-${service.id}`;
      assert.match(service.id, /^[a-z0-9-]+$/);
      assert.ok(plain(links[index][1]).includes(service.title));
      assert.ok(links[index][0].includes(`href="#${panelId}"`));
      assert.ok(!links[index][0].includes('tabindex="-1"'));
      assert.ok(panel[0].includes(`aria-labelledby="${panelId}-title"`));
      assert.ok(panel[0].includes(`id="${panelId}-title"`));
      assert.ok(!/\bhidden=""/.test(panel[0]));
      assert.ok(plain(panel[1]).includes(service.title));
      assert.ok(plain(panel[1]).includes(service.description));
      assert.ok(sources.includes(service.image));
      assert.ok(
        panel[1].includes(
          `${business.links.email}?subject=${encodeURIComponent(`Let's talk about ${service.title.toLowerCase()}`).replaceAll("'", "&#x27;")}`,
        ),
      );
    }
    assert.equal(
      new Set(business.services.map((service) => service.image)).size,
      business.services.length,
    );
    for (const service of business.services) {
      assert.ok(service.image.startsWith("/images/"));
      assert.ok(service.image.endsWith(".svg"));
      const illustration = readFileSync(
        resolve(root, "public", service.image.slice(1)),
        "utf8",
      );
      assert.match(illustration, /<svg\b/);
      assert.match(illustration, /viewBox="[^"]+"/);
    }
  },
);
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
        html.includes(`href="/work/${project.id}#top"`),
      );
      assert.ok(card, `Collection card for ${project.title}`);
      assert.equal((card.match(/<h3\b/g) || []).length, 1);
      assert.ok(plain(card).includes(project.title));
      assert.ok(plain(card).includes(preview.summary));
      const destination =
        project.links.find(
          (link) => !/watch demo|award-winning demo/i.test(link.label),
        ) ?? project.links[0];
      assert.ok(
        card.includes(`href="${destination.href.replaceAll("&", "&amp;")}"`),
      );
      assert.ok(!card.includes('class="archive-project-meta"'));
      assert.ok(!card.includes('class="archive-preview-caption"'));
      assert.ok(!plain(card).includes("Watch demo"));
      assert.ok(!plain(card).includes("Project artwork"));
      assert.ok(!plain(card).includes("Brand artwork"));
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
        assert.ok(card.includes(`aria-label="Play ${project.title} demo"`));
        const playIcon = card.match(
          /<span\b[^>]*class="archive-preview-play"[^>]*>([\s\S]*?)<\/span>/,
        );
        assert.ok(playIcon && playIcon[0].includes('aria-hidden="true"'));
        assert.ok(playIcon[1].includes("<svg"));
        assert.equal(plain(playIcon[1]).trim(), "");
        const demoRegion = card.match(
          new RegExp(`<div\\b(?=[^>]*id="project-demo-${project.id}")[^>]*>`),
        )?.[0];
        assert.ok(demoRegion && /\bhidden=""/.test(demoRegion));
      }
    }
    assert.ok(homepage.includes('aria-label="Filter projects"'));
    assert.ok(homepage.includes('aria-pressed="true"'));
    assert.ok(homepage.includes('aria-live="polite"'));
    assert.ok(homepage.includes('id="project-results"'));
    for (const [label, count] of [
      ["All projects", 20],
      ["Websites & apps", 6],
      ["Experiments", 11],
      ["Tools", 3],
    ]) {
      const filter = [
        ...homepage.matchAll(
          /<button\b[^>]*aria-pressed="(?:true|false)"[^>]*>([\s\S]*?)<\/button>/g,
        ),
      ].find((match) => plain(match[1]).startsWith(label));
      assert.ok(
        filter && plain(filter[1]).endsWith(String(count)),
        `${label} filter count`,
      );
    }
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
  assert.ok(
    !plain(read("work/mc-dental-station.html")).includes("Project artwork."),
  );
});
check("Screenshot prizes retain their denominations and estimate qualifiers", () => {
  const recorded = Object.fromEntries(
    awards.map((award) => [award.projectId, award.prize]),
  );
  assert.equal(awards.filter((award) => award.prize).length, 13);
  assert.equal(recorded.escrowzy, undefined);
  for (const [projectId, prize] of Object.entries({
    viskify: "~US$2,000",
    rivalidate: "0.5 ETH (~US$2,000)",
    polkastamp: "US$7,650",
    hirestamp: "US$1,000",
    aipenguild: "US$2,000",
    field2fridge: "2,600 USDT",
    creatorbank: "2,000 MUSD",
  })) {
    assert.equal(recorded[projectId], prize, `${projectId} screenshot prize`);
  }
});
check("Awards and their recorded prizes belong to the correct projects", () => {
  const cards = [
    ...recognition.matchAll(
      /<article\b[^>]*class="award-card(?: award-card-compact)?"[^>]*>([\s\S]*?)<\/article>/g,
    ),
  ].map((match) => match[1]);
  const prizeLabels = (html) => [
    ...html.matchAll(
      /<(span|p)\b[^>]*class="award-prize"[^>]*>([\s\S]*?)<\/\1>/g,
    ),
  ].map((match) => plain(match[2]).trim());
  for (const project of projects) {
    const expected = awards.filter((award) => award.projectId === project.id);
    const detail = read(`work/${project.id}.html`);
    const detailAwards = [
      ...detail.matchAll(
        /<div\b[^>]*class="detail-award"[^>]*>([\s\S]*?)<\/div>/g,
      ),
    ].map((match) => match[1]);
    assert.equal(detailAwards.length, expected.length, project.title);
    for (const award of expected) {
      const matching = (html) =>
        plain(html).includes(award.title) && plain(html).includes(award.event);
      const card = cards.find((html) =>
        html.includes(`href="/work/${project.id}#top"`) && matching(html),
      );
      const detailAward = detailAwards.find(matching);
      assert.ok(card && detailAward, `${project.title}: ${award.event}`);
      const expectedPrize = award.prize ? [`Prize: ${award.prize}`] : [];
      assert.deepEqual(
        prizeLabels(card), expectedPrize, `${project.title} recognition prize`,
      );
      assert.deepEqual(
        prizeLabels(detailAward), expectedPrize, `${project.title} detail prize`,
      );
    }
    assert.equal(
      prizeLabels(detail).length,
      expected.filter((award) => award.prize).length,
      `${project.title} must not claim unrecorded prizes`,
    );
  }
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
check("Hero pairs the supplied workspace photo with a lazy looping background", () => {
  const hero = homepage.match(
    /<section\b[^>]*class="business-hero"[^>]*>([\s\S]*?)<\/section>/,
  )?.[1];
  assert.ok(hero);
  assert.ok(hero.includes('data-background="hero"'));
  assert.ok(hero.indexOf("<video") < hero.indexOf('class="hero-layout shell"'));
  const video = hero.match(/<video\b[^>]*>/)?.[0];
  assert.ok(video);
  assert.ok(video.includes(`poster="${business.heroMotion.poster}"`));
  assert.ok(!/\bsrc=/.test(video));
  for (const property of ["muted", "loop", "autoPlay", "playsInline"]) {
    assert.ok(new RegExp(`\\b${property}=""`, "i").test(video));
  }
  assert.ok(video.includes('preload="none"'));
  assert.ok(video.includes('aria-hidden="true"'));
  assert.ok(video.includes('tabindex="-1"'));
  assert.ok(imageSources(hero).includes(business.heroMotion.poster));
  assert.ok(imageSources(hero).includes(business.workspacePhoto.src));
  assert.ok(hero.includes(business.workspacePhoto.alt));
  const workspace = readFileSync(
    resolve(root, "public", business.workspacePhoto.src.slice(1)),
  );
  assert.equal(workspace.subarray(8, 12).toString(), "WEBP");
  assert.ok(!imageSources(hero).includes(business.logo.src));
  const poster = readFileSync(resolve(root, "public", business.heroMotion.poster.slice(1)));
  const clip = readFileSync(resolve(root, "public", business.heroMotion.video.slice(1)));
  assert.equal(poster.subarray(8, 12).toString(), "WEBP");
  assert.equal(clip.subarray(4, 8).toString(), "ftyp");
  assert.ok(clip.length < 2_000_000);
  assert.ok(hero.includes(`href="${business.links.email}"`));
  assert.ok(hero.includes('href="#work"'));
  assert.equal((homepage.match(/<video\b/g) || []).length, 2);
});
check(
  "Theme initializes before content with one accessible icon toggle",
  () => {
    const bodyStart = homepage.indexOf("<body");
    const initializer = homepage.indexOf('<script id="syntaxsurge-theme-init"');
    assert.ok(bodyStart >= 0 && initializer > bodyStart);
    assert.ok(initializer < homepage.indexOf('class="skip-link"'));
    const head = homepage.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
    assert.ok(!head.includes("syntaxsurge-theme"));
    const header = homepage.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1];
    assert.ok(header);
    const buttons = [
      ...header.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g),
    ];
    assert.equal(buttons.length, 2);
    const toggle = buttons.find((button) =>
      button[0].includes('aria-label="Toggle color theme"'),
    );
    assert.ok(toggle);
    assert.equal((toggle[1].match(/<svg\b/g) || []).length, 2);
    assert.equal(plain(toggle[1]).trim(), "");
    assert.ok(!header.includes('aria-label="Color theme"'));
    assert.ok(!header.includes('data-mode="light"'));
    assert.ok(!header.includes('data-mode="dark"'));
  },
);
check(
  "Work background has a local poster without eager video loading",
  () => {
    const work = homepage.match(
      /<section\b[^>]*id="work"[^>]*>([\s\S]*?)<\/section>/,
    )?.[1];
    assert.ok(work);
    assert.ok(work.indexOf("<video") < work.indexOf('class="shell"'));
    const video = work.match(/<video\b[^>]*>/)?.[0];
    assert.ok(video);
    assert.ok(video.includes('aria-hidden="true"'));
    assert.ok(video.includes('preload="none"'));
    assert.ok(video.includes(`poster="${business.workMotion.poster}"`));
    assert.ok(/\bmuted=""/.test(video));
    assert.ok(/\bloop=""/.test(video));
    assert.ok(/\bplaysInline=""/i.test(video));
    assert.ok(!/\bsrc=/.test(video));
    assert.ok(/\bautoplay=""/i.test(video));
    assert.ok(imageSources(homepage).includes(business.workMotion.poster));
    const poster = readFileSync(
      resolve(root, "public", business.workMotion.poster.slice(1)),
    );
    const clip = readFileSync(
      resolve(root, "public", business.workMotion.video.slice(1)),
    );
    assert.equal(poster.subarray(8, 12).toString(), "WEBP");
    assert.equal(clip.subarray(4, 8).toString(), "ftyp");
    assert.ok(clip.length < 2_000_000);
  },
);
check(
  "Automatic site motion has one persistent pause action and no launch or wave buttons",
  () => {
    const bodyStart = homepage.indexOf("<body");
    const initializer = homepage.indexOf(
      '<script id="syntaxsurge-motion-init"',
    );
    assert.ok(initializer > bodyStart);
    assert.ok(initializer < homepage.indexOf('class="skip-link"'));
    const script = homepage.match(
      /<script\b[^>]*id="syntaxsurge-motion-init"[^>]*>([\s\S]*?)<\/script>/,
    )?.[1];
    assert.equal(script, motionInitScript);
    const htmlPages = [
      homepage,
      recognition,
      ...projects.map((project) => read(`work/${project.id}.html`)),
      ...wrapItUpPaths
        .filter((path) => path !== wrapItUp.path)
        .map((path) => read(`${path.slice(1)}.html`)),
    ];
    for (const html of htmlPages) {
      const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
      assert.ok(footer);
      const controls = [
        ...footer.matchAll(
          /<button\b[^>]*class="motion-toggle"[^>]*>([\s\S]*?)<\/button>/g,
        ),
      ];
      assert.equal(controls.length, 1);
      assert.equal(plain(controls[0][1]).trim(), "Pause animations");
      assert.ok(!/\bLaunch (?:a spark|an idea)\b/.test(plain(footer)));
    }
    const homepageButtons = [
      ...homepage.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g),
    ];
    assert.ok(
      !homepageButtons.some((button) =>
        plain(button[1]).trim().startsWith("Wave"),
      ),
    );
    assert.ok(!homepage.includes('aria-label="Make the code companion wave"'));
  },
);
check(
  "Header has native icon links and a controlled navigation disclosure",
  () => {
    const htmlPages = [
      homepage,
      recognition,
      ...projects.map((project) => read(`work/${project.id}.html`)),
      ...wrapItUpPaths
        .filter((path) => path !== wrapItUp.path)
        .map((path) => read(`${path.slice(1)}.html`)),
    ];
    for (const html of htmlPages) {
      const header = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1];
      assert.ok(header);
      const navigation = header.match(
        /<nav\b[^>]*aria-label="Main navigation"[^>]*>([\s\S]*?)<\/nav>/,
      );
      const menu = header.match(
        /<button\b[^>]*aria-label="Open navigation"[^>]*>/,
      )?.[0];
      assert.ok(navigation && menu);
      const navigationId = navigation[0].match(/\bid="([^"]+)"/)?.[1];
      assert.ok(navigationId);
      assert.ok(menu.includes(`aria-controls="${navigationId}"`));
      assert.ok(menu.includes('aria-expanded="false"'));
      assert.ok(navigation[0].includes('data-open="false"'));
      assert.ok(!/\shidden=/.test(navigation[0].split(">")[0]));
      const links = [...navigation[1].matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)];
      assert.equal(links.length, 4);
      for (const [index, href] of [
        "/#services",
        "/#work",
        "/#team",
        "#contact",
      ].entries()) {
        assert.ok(links[index][0].includes(`href="${href}"`));
        assert.ok(links[index][1].includes("<svg"));
        assert.ok(links[index][1].includes('aria-hidden="true"'));
      }
      assert.ok(!header.includes(business.resumeHref));
    }
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
check("Supplied award snapshots appear only on their matching project pages", () => {
  const expectedIds = [
    "aipenguild",
    "cliplore",
    "creatorbank",
    "croignite",
    "field2fridge",
    "hirestamp",
    "lexlink",
    "packtrace",
    "ping402",
    "polkastamp",
    "rivalidate",
    "sentinelx",
    "viskify",
  ];
  const screenshots = Object.entries(awardMedia)
    .filter(([, media]) => media.recognitionScreenshot)
    .map(([id, media]) => [id, media.recognitionScreenshot]);
  assert.deepEqual(screenshots.map(([id]) => id).sort(), expectedIds);
  const sources = screenshots.map(([, screenshot]) => screenshot.src);
  assert.equal(new Set(sources).size, expectedIds.length);
  for (const [id, screenshot] of screenshots) {
    assert.equal(screenshot.src, `/images/recognition-screenshots/${id}.webp`);
    assert.ok(screenshot.width > 0 && screenshot.height > 0);
    assert.ok(screenshot.alt.length > 30);
    const file = readFileSync(resolve(root, "public", screenshot.src.slice(1)));
    assert.equal(file.subarray(8, 12).toString(), "WEBP");
    assert.ok(file.length > 1000);
    assert.ok(!imageSources(homepage).includes(screenshot.src));
    assert.ok(!imageSources(recognition).includes(screenshot.src));
  }
  for (const project of projects) {
    const detail = read(`work/${project.id}.html`);
    const screenshot = awardMedia[project.id]?.recognitionScreenshot;
    const snapshotSections = [
      ...detail.matchAll(
        /<section\b[^>]*class="award-snapshot"[^>]*>([\s\S]*?)<\/section>/g,
      ),
    ];
    assert.equal(snapshotSections.length, screenshot ? 1 : 0, project.title);
    assert.deepEqual(
      imageSources(detail).filter((src) => sources.includes(src)),
      screenshot ? [screenshot.src] : [],
      `${project.title} snapshot attribution`,
    );
    if (!screenshot) continue;
    const section = snapshotSections[0];
    assert.ok(section[0].includes('aria-labelledby="award-snapshot-title"'));
    assert.ok(section[1].includes('id="award-snapshot-title"'));
    const image = section[1].match(/<img\b[^>]*>/)?.[0];
    assert.ok(image);
    assert.ok(image.includes('loading="lazy"'));
    assert.ok(image.includes(`width="${screenshot.width}"`));
    assert.ok(image.includes(`height="${screenshot.height}"`));
    assert.equal(
      plain(image.match(/\balt="([^"]+)"/)?.[1] ?? ""),
      screenshot.alt,
    );
    const viewLink = [
      ...section[1].matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g),
    ].find((link) => link[0].includes(`href="${screenshot.src}"`));
    assert.ok(viewLink);
    assert.ok(viewLink[0].includes('target="_blank"'));
    assert.ok(viewLink[0].includes('rel="noopener noreferrer"'));
    assert.equal(
      plain(viewLink[0].match(/\baria-label="([^"]+)"/)?.[1] ?? ""),
      `Open ${project.title} award snapshot (opens in a new tab)`,
    );
    assert.equal(plain(viewLink[1]).trim(), "Open full image");
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
  assert.equal(locations.length, 24);
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
        assert.ok(html.includes(`href="${destination}#top"`));
    }
    const game = read("work/wrap-it-up.html");
    const support = read("work/wrap-it-up/support.html");
    const privacy = read("work/wrap-it-up/privacy.html");
    assert.ok(game.includes("Your own cozy wrapping shop."));
    assert.ok(game.includes("About the project"));
    assert.ok(game.includes('aria-label="More projects"'));
    assert.ok(game.includes(`href="${wrapItUp.playTestingUrl}"`));
    assert.ok(game.includes(`href="${wrapItUp.testFlightUrl}"`));
    assert.ok(game.includes("allowlisted Google account"));
    assert.ok(
      game.includes("not yet a public App Store or Google Play release"),
    );
    assert.ok(support.includes(wrapItUp.supportEmail));
    const supportContact = support.match(
      /<section\b[^>]*aria-labelledby="support-contact"[^>]*>([\s\S]*?)<\/section>/,
    )?.[1];
    assert.ok(supportContact);
    const supportLinks = [
      ...supportContact.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g),
    ];
    assert.equal(supportLinks.length, 1);
    assert.ok(supportLinks[0][0].includes(`href="${wrapItUp.contactUrl}"`));
    assert.ok(plain(supportLinks[0][1]).includes(wrapItUp.contactLabel));
    assert.ok(plain(supportLinks[0][1]).includes(wrapItUp.supportEmail));
    assert.ok(!supportLinks[0][0].includes(business.email));
    assert.ok(plain(supportContact).includes(wrapItUp.version));
    assert.ok(plain(supportContact).includes("TestFlight"));
    assert.ok(support.includes("<details"));
    assert.ok(support.includes("cannot restore a local save from a server"));
    for (const html of [game, support, privacy]) {
      assert.ok(plain(html).includes(wrapItUp.playAgeRatingSummary));
      assert.ok(plain(html).includes(wrapItUp.appleAgeRatingSummary));
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
    assert.ok(!privacy.includes("In build 4"));
    assert.ok(privacy.includes(wrapItUp.privacyEffectiveDate));
    assert.ok(plain(privacy).includes(`Testing version ${wrapItUp.version}`));
    assert.ok(plain(privacy).includes("2 Goodwill"));
    assert.ok(plain(privacy).includes("Live ads are disabled"));
    assert.ok(plain(privacy).includes("no real-world prize, real-money wager or cash-out"));
    assert.ok(plain(game).includes(`Version ${wrapItUp.version} is verified for Android internal testing and TestFlight`));
    assert.ok(plain(support).includes("Closed Alpha may offer an earlier build"));
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
    assert.ok(!header.includes(`href="${business.resumeHref}"`));
    const pageHeader = html.match(
      /<div\b[^>]*class="project-page-header"[^>]*>([\s\S]*?)<\/div>/,
    )?.[1];
    assert.ok(
      pageHeader && !pageHeader.includes('class="eyebrow section-label"'),
    );
    assert.ok(!html.includes('class="detail-tags"'));
    assert.ok(!html.includes('class="project-artwork-caption"'));
    assert.ok(html.includes("About the project"));
    assert.ok(html.includes('href="/#work"'));
    for (const link of project.links)
      assert.ok(html.includes(`href="${link.href.replaceAll("&", "&amp;")}"`));
  });
}
check("Project artwork is local and present", () => {
  for (const filename of [
    "cliplore-ai-preview.webp",
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
