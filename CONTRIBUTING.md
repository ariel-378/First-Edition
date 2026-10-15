# Contributing to First Edition

Thanks for helping school papers run their own sites.

## Ground rules

- No build step and no runtime dependencies. If a change needs a library, open
  an issue first.
- Every change that touches a page or the editor comes with a test in
  `tests/suites/`. `npm test` must pass.
- Keep public URLs stable: `index.html`, section pages, `article.html?id=`,
  `stories/<id>.html`.
- Content files (`site/articles.js`, `site/staff-data.js`, `site/teams.js`,
  `site/videos.js`) are sample content. Don't put real students or schools in
  them.

## Setup

```bash
npm ci
npm test
npm run serve     # http://localhost:8781
```

## Pull requests

- One change per PR, with a sentence on what it does and why.
- Run `npm test` before pushing.
- If you changed anything under `site/`, note which pages you checked by hand.

## Schools deploying First Edition

Open an issue with the **School deployment** template and we'll help you get
set up.
