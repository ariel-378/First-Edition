# Changelog

All notable changes to First Edition are listed here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [1.1.0] — 2026-10-18 — DOI: https://doi.org/10.5281/zenodo.23456010

The fixes promised in Section 9 of the report. Lighthouse on the home, section and
article pages: accessibility 98 → 100, performance 74 → 98 (mobile) and 100 (desktop),
cumulative layout shift 0.5–0.9 → 0.

- Layout shift: nothing the reader can see moves after first paint. The cause was not
  the renderers alone: on a slow connection the browser painted the page before the
  scripts at the end of `<body>` ran, then the empty section nav filled, the breaking
  banner (painted visible) disappeared and `<main>` grew, so everything on screen
  jumped. Now the nav is built the moment its element is parsed (`nav.js`), the banner
  ships hidden until a story is marked Breaking, `<main>` reserves a viewport of height,
  the article photo has a fixed 3:2 box, and the five bundled fonts are
  `font-display: optional` with fallback faces measured to the same widths and
  preloaded by `brand.js`, so a font that arrives late never re-wraps text
- Accessibility: headings no longer skip a level on the home rails or the related-story
  and video blocks; the splash slides off instead of fading, so its white text is never
  measured on a half-transparent background (the 2.7:1 finding)
- Lighthouse gate raised to 95 for accessibility, with a new performance gate at 90
- `docs/CUSTOMIZE.md`: the accent colour must keep 3:1 against white; how the fonts load
- New `stable` test suite pins each of the fixes above; 1151 checks across 26 suites

## [1.0.1] — 2026-10-18 — DOI: https://doi.org/10.5281/zenodo.23445562

The release described and measured in the report (commit `98dedf5` plus citation metadata;
no code changes since).

- WordPress / SNO importer: `npm run import -- export.xml` turns a WordPress export into a
  content bundle the editor loads in one click (`setup/import-wxr.mjs`)
- Accessibility: the demo-mode editor link meets contrast; thumbnail links no longer
  duplicate the headline link for screen readers
- Lighthouse accessibility gate in CI (fails under 90 on home, section, article)
- Citation metadata: `CITATION.cff` and `.zenodo.json`; archived on Zenodo on release
- 1093 automated checks across 25 suites

## [1.0.0] — 2026-10-14

First public release.

- Editor dashboard: articles, sections, staff, sports, videos, puzzles & games,
  schedule
- Editor-managed sections, in-place layout editing, optional tags
- Scheduled publishing; generated story pages for link previews
- Brand configuration in one file; newsletter signup to a Google Sheet
- Host-ready authentication (Finalsite); optional shared editing via a
  Cloudflare Worker
- 1046 automated checks across 24 suites
