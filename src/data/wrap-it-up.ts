export const wrapItUp = {
  name: "Wrap It Up!",
  path: "/work/wrap-it-up",
  version: "1.0.1 (6)",
  playTestingUrl:
    "https://play.google.com/apps/internaltest/4701089363572737974",
  testFlightUrl: "https://testflight.apple.com/join/9f2WNa94",
  supportEmail: "ejadelaurence@icloud.com",
  contactUrl: "mailto:ejadelaurence@icloud.com?subject=Wrap%20It%20Up!%20Support",
  contactLabel: "Email support",
  artwork: "/images/wrap-it-up-cover.webp",
} as const;

export const wrapItUpPaths = [
  wrapItUp.path,
  `${wrapItUp.path}/support`,
  `${wrapItUp.path}/privacy`,
] as const;
