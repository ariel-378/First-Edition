# First Edition

A framework-free (vanilla HTML/CSS/JS) platform for a student newspaper — section
pages, articles, sports, videos, puzzles & games, search, and an in-app
**editor dashboard**. No build step, no dependencies. Take it, rename it, and
run your school's paper on it.

**▶ Live demo: <https://ariel-378.github.io/First-Edition/>**

The demo runs in standalone mode with no host platform behind it, so you can
open the editor yourself: use the **"Editor preview"** link in the account bar,
top right. Changes you make are saved to your own browser and visible only to
you — click **Reset demo data** in the dashboard to put it back.

## Highlights

- **Editor dashboard** — create and edit articles, and manage staff, sports,
  videos, and the puzzles & games pages.
- **Editor-managed sections** — add, rename, reorder, and remove sections, and
  choose which section fills each home-page slot. The nav, section pages, home
  page, and search all update automatically.
- **Rearrange a page in place** — signed in as an editor, any page built from
  blocks gets an *Edit layout* toggle: drag them into new rows and columns, or
  move them with the keyboard. Article pages, the video index, staff, search,
  tags, team pages and the centerspread all included, each keeping its own
  layout. The home page is arranged differently — by choosing which section
  fills each slot, above.
- **Tags, if you want them** — editors keep a list of tags and switch the whole
  system on or off. Tagged articles get a tag page, and **search finds them**:
  a reader looking for *music* gets every article filed under Music, whether or
  not the word appears in the text, with the matching tag shown on the result so
  it is clear why it came up. Switched off, tags are hidden everywhere,
  search included — not deleted.
- **Plan an edition ahead** — every piece of content takes a publish date and
  time and stays invisible to readers until it arrives: articles, poems, art,
  videos, custom features and games alike. A **Schedule** tab gathers the whole
  plan into one list, in the order it goes out, grouped by day, with *Publish
  now* on any row when the plan changes.
- **Shared editing (optional)** — point `config.js` at a small store the school
  runs itself and every editor sees the same content, including what is
  scheduled, with no downloading or committing by hand. Off by default; see
  [setup/worker/README.md](setup/worker/README.md).
- **Newsletter signups** — a Subscribe button collecting an email address, and
  nothing else, into a Google Sheet the school owns.
- **Brand config** — one file (`config.js`) sets the masthead, school, colors,
  logo, and footer across every page. Editors can also upload a masthead
  flourish and a tab icon from the dashboard and export a finished `config.js`.
- **Host-ready auth** — designed to sit behind Finalsite, which provides login and
  decides who is an editor.

## Sample content

The repo ships with a demo newsroom so a fresh copy looks like a working paper
rather than an empty page: eleven stories, a fourteen-person masthead, three
teams with brackets, two videos, and flat SVG illustrations standing in for
photos.

**All of it is invented** — East High School, The Wildcat Times, every byline,
every staff member, every person quoted, every score. None of it refers to a
real school or a real person. To start clean, empty the objects in
`articles.js`, `staff-data.js`, `teams.js`, and `videos.js`; each file says so
at the top.

## Tests

```bash
npm install   # once — pulls jsdom, the only dependency
npm test
```

1046 checks across 24 suites: every page loads clean, every editor control is
pressed without throwing, and content added in the editor reaches the reader
pages. See [tests/README.md](tests/README.md).

## Run it locally

No build step and nothing to install:

```bash
npm run serve      # http://localhost:8781
```

`serve.py` sends no-cache headers, so a reload always shows your latest edit.
Pass a port if you want a specific one (`npm run serve 9000`); with no argument
it steps past a busy port rather than failing, which is what lets a second copy
of the site run alongside the first.

Any static server works just as well — `python3 -m http.server 8000` and open
`http://localhost:8000`. Opening the files directly with `file://` does not:
every editor change is kept in `localStorage`, which browsers restrict on
`file://` origins, so the dashboard cannot save.

With no host platform present, the site runs in **demo mode** — use the
**"Editor preview"** link in the account bar to open the dashboard. Editor changes
persist only in your browser's `localStorage`.

### Dashboard controls

Inside the editor dashboard, the toolbar has three buttons:

- **+ New Article** — create a new article.
- **Reset all changes** — discard your article edits and restore the original articles.
- **Reset demo data** — clear **all** saved changes in this browser (articles,
  sections, brand, layout, videos, sports, etc.) and restore the shipped content.

Because editor changes are saved to `localStorage` and override the shipped files,
if the demo ever shows stale content, click **Reset demo data** (or open the site
in a private window) to get back to the shipped version.

## Link previews

When a story is pasted into a group chat, iMessage, Slack or a social post, the
preview is built by a machine that fetches the page and reads its markup. **It
does not run JavaScript.** A page that fills in its own headline after loading
previews as the name of the paper and nothing else — which, for a school paper
whose readers share stories in group chats, is most of the distribution.

So every published story is also written out as a real page:

```
stories/<id>.html
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

- **Set `siteUrl` in `config.js`** to the address the paper is published at.
  Without it the photo in a preview is a relative path, which most previews
  cannot resolve. Headlines and descriptions work either way, and
  `npm run stories` tells you when it is missing.
- **Scheduled stories are not generated.** A story with a future publish time
  gets no page until that time, so an embargoed headline is never sitting in a
  public file early.

## Documentation

- **[FINALSITE.md](FINALSITE.md)** — how the site integrates with Finalsite: the
  identity contract (`WL_CONTEXT`), the **editors-group logic**, and a phased plan
  for hosting, authentication, and content persistence.
- **[CODE-GUIDE.md](CODE-GUIDE.md)** — a developer's tour of the code: how a
  page boots, where content comes from, the store pattern, and the things that
  will surprise you.
- **[CUSTOMIZE.md](CUSTOMIZE.md)** — rebrand the paper for your school (the Brand
  design tab, or editing `config.js`).
- **[INTEGRATION.md](INTEGRATION.md)** — for the host platform's administrator:
  where content lives, the identity hook, and a setup checklist.

## Project layout

| Path | Purpose |
|------|---------|
| `*.html` | Pages — public surfaces plus the `editor*.html` dashboard |
| `config.js` | Brand config (`WL_CONFIG`); the only per-school file |
| `articles.js`, `writers.js`, `teams.js`, … | Content sources (`window.WL_*`) |
| `*-store.js` | CRUD / data layer — the seam for server-backed persistence |
| `auth.js` | Identity adapter (`window.WLAuth`; reads `WL_CONTEXT`) |
| `nav.js`, `brand.js`, `section.js`, … | Shared rendering |
| `stories/` | Generated — one real page per story, so links preview. Do not edit by hand |
| `story-url.js` | Where a story lives; holds the generated list of pages |

## Licence

[MIT](LICENSE) — take it, rename it, run your own paper on it. No attribution
required in the site itself, though a line in your colophon is welcome.

The sample content is invented (East High School, The Wildcat Times, every
byline and score) and is covered by the same licence. Real student journalism
lives in each school's own deployment, not here.
