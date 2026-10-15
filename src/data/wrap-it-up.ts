export const wrapItUp = {
  name: "Wrap It Up!",
  path: "/work/wrap-it-up",
  version: "1.0.1 (20)",
  privacyEffectiveDate: "October 15, 2026",
  playTestingUrl:
    "https://play.google.com/apps/internaltest/4701089363572737974",
  playClosedTestingUrl:
    "https://play.google.com/apps/testing/com.syntaxsurge.wrapitup",
  closedTestingAvailable: true,
  playAgeRatingSummary:
    "Google Play ratings vary by region. Check the current age rating in your local Google Play listing.",
  appleAgeRatingSummary:
    "Apple’s saved age rating is 18+ in most regions (17+ on operating systems earlier than version 26), with regional exceptions. Check the rating in your local App Store listing.",
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
