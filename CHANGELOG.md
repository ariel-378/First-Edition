# Changelog

All notable changes to First Edition are listed here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

- WordPress / SNO importer: `npm run import -- export.xml` turns a WordPress
  export into a content bundle the editor loads in one click (`setup/import-wxr.mjs`)
- Accessibility: the demo-mode editor link meets contrast; thumbnail links no
  longer duplicate the headline link for screen readers
- Lighthouse accessibility gate in CI (fails under 90 on home, section, article)

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
