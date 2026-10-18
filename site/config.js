// ============================================================================
//  ►►► BRAND CONFIG — EDIT THIS ONE FILE TO MAKE THE PAPER YOUR SCHOOL'S. ◄◄◄
//
//  Everything below is applied across every page by brand.js: the masthead
//  name, the school name and tagline, the colors, the masthead flourish, the
//  favicon, and the footer contacts. You do not need to touch any other file.
// ============================================================================
window.WL_CONFIG = {
  // ── Names ────────────────────────────────────────────────────────────────
  name: "The Wildcat Times",      // the masthead headline (and browser tab)
  school: "East High School",          // shown in the dateline under the masthead
  tagline: "Student Newspaper",   // dateline suffix, e.g. "Student Press Since 1998"
  splashMark: "PRESS",            // the big word behind the name on the opening splash

  // ── Colors ───────────────────────────────────────────────────────────────
  //  `accent` is your school color (masthead rule, links, active nav, favicon).
  //  The rest rarely need changing.
  colors: {
    ink:    "#121212",   // main text
    muted:  "#666666",   // secondary text
    rule:   "#e2e2e2",   // hairline borders
    paper:  "#ffffff",   // page background
    cream:  "#f7f5ef",   // panel background
    accent: "#d11c22",   // ← your school color
  },

  // ── The flourish beside the masthead ─────────────────────────────────────
  //  ►► TO USE YOUR OWN ARTWORK: put your image file in the `media/` folder,
  //     then change `file` below to its name. That's the only step.
  //
  //  Your file's own colors are used as-is — the flourish does NOT follow
  //  `accent`, so the art looks exactly like the file you made. SVG is
  //  sharpest, but PNG / JPG / WEBP / AVIF all work.
  //
  //  Set `file: ""` to remove the flourish entirely.
  ornament: {
    file: "media/ornament.svg", // ← your file, e.g. "media/my-school-crest.svg"
    width: 72,                // rendered width in px (height follows your art)
    mirror: true,             // flip the right-hand copy to face inward.
                              //   Set false for art with text or a crest in it,
                              //   which would read backwards when mirrored.
    opacity: 0.55,            // 1 = full strength
  },
  //  (A plain string still works too: an emoji like "✦", or a bare file path.)

  // ── Favicon (the little tab icon) ─────────────────────────────────────────
  //  Either an object to auto-generate a lettered badge (recommended)…
  favicon: { initials: "WT", bg: "#d11c22", fg: "#ffffff" },
  //  …or a path string to your own file, e.g. favicon: "my-logo.svg"

  // ── Footer contacts ──────────────────────────────────────────────────────
  contacts: [
    { title: "Editor-in-Chief", email: "editor@example.org" },
    { title: "Managing Editor", email: "managing@example.org" },
  ],
  footerNote: "Student Publication",

  // ── Sports ───────────────────────────────────────────────────────────────
  //  Your team's name AS IT APPEARS in the bracket data (teams.js). The
  //  brackets page highlights this team. Leave as "Home" if you use that.
  homeTeam: "Home",

  // ── Shared editing (optional) ────────────────────────────────────────────
  //  With an endpoint here, every editor sees the same content — including
  //  what is scheduled — and publishing happens on its own: no downloading, no
  //  committing by hand. Leave it blank and the site works exactly as before,
  //  with each editor's work in their own browser.
  //
  //  Set this up once: setup/worker/README.md (about 20 minutes).
  sync: {
    endpoint: "",   // ← your Worker's URL, e.g. https://paper-content.you.workers.dev
    key: "",        // ← the editor key you set on the Worker
  },

  // ── Where the site lives ─────────────────────────────────────────────────
  //  Used by `npm run brand` to generate sitemap.xml and robots.txt, which
  //  need absolute URLs. Leave blank until you know the address; no sitemap is
  //  better than one pointing at somebody else's site.
  siteUrl: "https://ariel-378.github.io/First-Edition",

  // ── Where newsletter signups go ──────────────────────────────────────────
  //  The Subscribe link in the utility bar collects an email address — and only
  //  an email address, no phone numbers — and appends it to a Google Sheet
  //  through a Google Apps Script web app. Follow setup/README.md, then paste
  //  the web-app URL here:
  //    https://script.google.com/macros/s/AKfycb.../exec
  //
  //  Until this is filled in, the form does NOT silently discard addresses —
  //  it says signups aren't set up and offers `fallbackEmail` instead.
  //
  //  Editors can fill all of this in from the Newsletter panel of the Brand
  //  design tab and download the resulting config.js, rather than editing here.
  submissions: {
    enabled: true,                       // false removes the Subscribe button entirely
    endpoint: "",                        // ← your Apps Script web-app URL
    fallbackEmail: "",                   // ← who gets emailed if the send fails.
                                         //    Defaults to the first contact above.
    sheetUrl: "",                        // ← your Subscribers Sheet. Editors only —
                                         //    it is never shown to readers.
  },
};
