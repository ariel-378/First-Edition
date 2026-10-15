# Developer guide

Everything you need to run, change, and test First Edition. For a tour of the
code itself, read [CODE-GUIDE.md](CODE-GUIDE.md) next.

## Run it locally

No build step and nothing to install:

```bash
npm run serve      # http://localhost:8781
```

`tools/serve.py` serves `site/` with no-cache headers, so a reload always shows
your latest edit. Pass a port if you want a specific one (`npm run serve 9000`);
with no argument it steps past a busy port rather than failing, which is what
lets a second copy of the site run alongside the first.

Any static server works just as well, run from inside `site/`:

```bash
cd site && python3 -m http.server 8000     # then open http://localhost:8000
```

Opening the files directly with `file://` does not: every editor change is kept
in `localStorage`, which browsers restrict on `file://` origins, so the
dashboard cannot save.

With no host platform present, the site runs in **demo mode**. Use the
**Editor preview** link in the account bar to open the dashboard. Editor changes
persist only in your browser's `localStorage`.

### Dashboard controls

Inside the editor dashboard, the toolbar has three buttons:

- **+ New Article** — create a new article.
- **Reset all changes** — discard your article edits and restore the original
  articles.
- **Reset demo data** — clear **all** saved changes in this browser (articles,
  sections, brand, layout, videos, sports, etc.) and restore the shipped content.

Because editor changes are saved to `localStorage` and override the shipped
files, if the demo ever shows stale content, click **Reset demo data** (or open
the site in a private window) to get back to the shipped version.

## Sample content

The repo ships with a demo newsroom so a fresh copy looks like a working paper
rather than an empty page: eleven stories, a fourteen-person masthead, three
teams with brackets, two videos, and flat SVG illustrations standing in for
photos.

**All of it is invented** — East High School, The Wildcat Times, every byline,
every staff member, every person quoted, every score. None of it refers to a
real school or a real person. To start clean, empty the objects in
`site/articles.js`, `site/staff-data.js`, `site/teams.js`, and
`site/videos.js`; each file says so at the top.

## Tests

```bash
npm install   # once — pulls jsdom, the only dependency
npm test
```

1093 checks across 25 suites: every page loads clean, every editor control is
pressed without throwing, and content added in the editor reaches the reader
pages. The suites load real pages in jsdom and drive them the way an editor
would, clicking buttons and typing into fields rather than calling internals.
See [tests/README.md](../tests/README.md) for the suite list and how to run one
at a time.

## Link previews

When a story is pasted into a group chat, iMessage, Slack or a social post, the
preview is built by a machine that fetches the page and reads its markup. **It
does not run JavaScript.** A page that fills in its own headline after loading
previews as the name of the paper and nothing else — which, for a school paper
whose readers share stories in group chats, is most of the distribution.

So every published story is also written out as a real page:

```
site/stories/<id>.html
```

with its headline, description and photo already in the markup. `article.html`
still works — old links, and the editor previewing a draft, both go through it.

**Regenerating them:**

```
npm run stories      # just the story pages
npm run brand        # re-stamps the paper name, then regenerates
```

Both are run for you by `.github/workflows/stories.yml` after every publish, so
in normal use nobody has to remember. A story published in the last minute or
two may briefly link to `article.html?id=…` instead — that page works, it just
previews poorly, and the link corrects itself once the workflow has run.

Two things worth knowing:

- **Set `siteUrl` in `site/config.js`** to the address the paper is published
  at. Without it the photo in a preview is a relative path, which most previews
  cannot resolve. Headlines and descriptions work either way, and
  `npm run stories` tells you when it is missing.
- **Scheduled stories are not generated.** A story with a future publish time
  gets no page until that time, so an embargoed headline is never sitting in a
  public file early.

## Importing an archive from WordPress

"We'd lose our archive" is the objection that ends most switches. WordPress,
and SNO sites, which are WordPress underneath, export the whole archive from
**Tools → Export** as one XML file. The importer turns that file into a content
bundle the editor loads in one click:

```bash
npm run import -- export.xml                       # writes content-bundle.json
npm run import -- export.xml --map "Campus Life=Features" --map "Reviews=Style"
npm run import -- export.xml --no-new-sections --default-section News
```

Then open the editor's **Content** tab, click **Load bundle…**, pick the file,
and publish as usual.

What comes across: every published post with its headline, standfirst (the
excerpt), byline, date, body paragraphs, tags, and the featured image as a link
to wherever WordPress hosts it. Categories become sections: one that matches a
section the paper already has (including *Opinion* for Op-Ed) is used as-is,
and the rest are created, or sent to a default section with
`--no-new-sections`. Drafts, pages, menus and media-library entries are
skipped and counted in the report. Images inside the body text are not
carried over; the paragraphs are.

The importer has no dependencies and reads the section list from
`site/sections-store.js` itself, so it cannot drift from the editor.

## Project layout

| Path | Purpose |
|------|---------|
| `site/` | Everything that ships: pages, scripts, styles, fonts, media, generated story pages. Deploy this folder and nothing else |
| `site/*.html` | Pages — public surfaces plus the `editor*.html` dashboard |
| `site/config.js` | Brand config (`WL_CONFIG`); the only per-school file |
| `site/articles.js`, `writers.js`, `teams.js`, … | Content sources (`window.WL_*`) |
| `site/*-store.js` | CRUD / data layer — the seam for server-backed persistence |
| `site/auth.js` | Identity adapter (`window.WLAuth`; reads `WL_CONTEXT`) |
| `site/nav.js`, `brand.js`, `section.js`, … | Shared rendering |
| `site/published-content.js` | The committed snapshot editors published; what readers see |
| `site/stories/` | Generated — one real page per story, so links preview. Do not edit by hand |
| `site/story-url.js` | Where a story lives; holds the generated list of pages |
| `setup/` | One-time tooling: story-page generator, brand stamper, the newsletter Apps Script, the optional shared-editing Worker |
| `tests/` | The jsdom test harness and suites |
| `tools/serve.py` | The local dev server |
| `docs/` | Guides. Not shipped with the site |
| `.github/workflows/` | `pages.yml` deploys `site/`; `stories.yml` regenerates story pages after a publish |

## Why no framework

A school paper usually has no engineer on staff. The adviser who set the site
up graduates a class of editors every June, and whoever inherits it next needs
to be able to open a file, read it, and change it. Plain HTML, CSS and
JavaScript are the only stack a sixteen-year-old can learn from the page source
alone, and the only one that still works unchanged five years later: there is
no bundler to upgrade, no dependency to patch, no `node_modules` to rebuild
when a laptop is replaced. `npm test` is the only command, and it exists for
the people changing the code, not for the site.

What that choice costs is real. There is no component model, so shared pieces
of markup are rendered by small scripts rather than templates. State lives in
`localStorage` and a committed snapshot rather than a database, so two editors
working at once need the optional shared-editing Worker. And a page that
assembles itself in the browser previews badly when shared, which is why every
story is also written out as a static page.

Those are the trade-offs the whole design is built around, and they are the
right ones for a site that has to outlive everyone who worked on it.
