export const wrapItUp = {
  name: "Wrap It Up!",
  path: "/work/wrap-it-up",
  version: "1.0.1 (7)",
  playTestingUrl:
    "https://play.google.com/apps/internaltest/4701089363572737974",
  playClosedTestingUrl:
    "https://play.google.com/apps/testing/com.syntaxsurge.wrapitup",
  closedTestingAvailable: false,
  playAgeRatingSummary:
    "Google Play ratings vary by region: ESRB Everyone in North America (alcohol reference), PEGI 3 in Europe, and 18+ in Australia (simulated gambling). Check the rating shown in your local store.",
  appleAgeRatingSummary:
    "The current iOS age declaration is 17+ on older OS versions and 18+ in Brazil and France. It covers an occasional wine-bottle gift and the optional wheel's randomized virtual rewards.",
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
