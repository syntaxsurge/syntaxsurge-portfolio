const DEFAULT_SITE_ORIGIN = "https://syntaxsurge.com";

export function parseSiteOrigin(value?: string): URL {
  let url: URL;
  try {
    url = new URL(value?.trim() || DEFAULT_SITE_ORIGIN);
  } catch {
    throw new Error("SITE_URL must be a valid HTTP(S) origin.");
  }

  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "SITE_URL must contain only an HTTP(S) origin, without credentials, a path, a query, or a fragment.",
    );
  }

  return new URL(url.origin);
}

export const siteUrl = parseSiteOrigin(process.env.SITE_URL);

export function siteHref(path = "/"): string {
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) {
    throw new Error("Site links must use an absolute path on this website.");
  }
  const url = new URL(path, siteUrl);
  if (url.origin !== siteUrl.origin) {
    throw new Error("Site links must stay on this website.");
  }
  return url.href;
}
