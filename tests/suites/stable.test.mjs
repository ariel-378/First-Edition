// Nothing the reader can see moves after the first paint.
//
// The 1.0.1 report measured a cumulative layout shift of 0.5–0.9 on the reader
// pages. On a slow connection the browser paints the page while it is still
// fetching the scripts at the end of <body>; when they run, the empty nav
// fills, the breaking banner (painted visible) disappears, and the renderers
// fill <main>, so every element on screen jumps. These checks pin each fix:
// the nav builds before first paint, the banner ships hidden, <main> reserves
// a viewport of height, the lead photo has a fixed box, and a web font that
// arrives late is never swapped in over text already on screen.

import fs from "fs";
import path from "path";
import { SITE, loadPage, Check } from "../harness.mjs";

export async function run() {
  const check = new Check();
  const read = file => fs.readFileSync(path.join(SITE, file), "utf8");
  const css = read("styles.css");

  // ===== Space is reserved before the renderers run =====
  {
    check.ok("<main> reserves a viewport of height", /#main-content\s*\{[^}]*min-height:\s*100vh/.test(css));
    check.ok("the article photo has a fixed box", /\.article-photo\s*\{[^}]*aspect-ratio:/.test(css));
    check.ok("the breaking banner ships hidden", /id="breaking-banner"[^>]*\bhidden\b/.test(read("index.html")));
    check.ok("and hidden beats its flex display", /\.breaking-banner\[hidden\]\s*\{\s*display:\s*none/.test(css));

    const home = await loadPage("index.html", { editor: false });
    check.ok("with no breaking story the banner stays hidden", home.$("#breaking-banner").hidden === true);
    check.ok("the section nav is built by the time the page is up", home.$$(".sectionnav-inner a").length >= 2);
    check.ok("nav.js builds as soon as the nav element exists", /MutationObserver/.test(read("nav.js")));
    check.clean("home page loads clean", home);
    home.close();
  }

  // ===== Web fonts never re-wrap the page =====
  // Each self-hosted face is font-display: optional, so it is used only if it
  // has arrived by first paint; until then a system font scaled to the same
  // metrics stands in, and brand.js preloads the configured fonts so the real
  // one is usually there in time.
  {
    const faces = [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map(m => m[1]);
    const family = face => (face.match(/font-family:\s*"([^"]+)"/) || [])[1];
    const webFaces = faces.filter(f => /url\(/.test(f));
    const preloaded = [...read("brand.js").matchAll(/"(fonts\/[^"]+\.woff2)"/g)].map(m => m[1]);
    check.ok("web fonts exist to check", webFaces.length >= 5, `found ${webFaces.length}`);

    for (const face of webFaces) {
      const fam = family(face);
      const file = (face.match(/url\("([^"]+)"\)/) || [])[1];
      check.ok(`${fam}: font-display is optional`, /font-display:\s*optional/.test(face));
      check.ok(`${fam}: its file ships`, file && fs.existsSync(path.join(SITE, file)), file);
      check.ok(`${fam}: brand.js preloads it`, preloaded.includes(file), file);
      for (const weight of ["400", "700"]) {
        const fallback = faces.find(f => family(f) === `${fam} Fallback` && new RegExp(`font-weight:\\s*${weight}\\b`).test(f));
        check.ok(`${fam} ${weight}: has a measured fallback face`,
          !!fallback && /local\(/.test(fallback) && /size-adjust/.test(fallback) && /ascent-override/.test(fallback) && /descent-override/.test(fallback));
      }
    }
    for (const file of preloaded) check.ok(`${file} exists`, fs.existsSync(path.join(SITE, file)));
  }

  // ===== brand.js puts the fallback into any stack an editor picks =====
  {
    const fonts = { serif: '"Lora", Georgia, serif', sans: '"Libre Franklin", "Helvetica Neue", Arial, sans-serif' };
    const ctx = await loadPage("index.html", { editor: false, storage: { wl_brand: JSON.stringify({ fonts }) } });
    const root = ctx.document.documentElement.style;
    check.equal("Lora gets its fallback face", root.getPropertyValue("--font-serif").trim(), '"Lora", "Lora Fallback", Georgia, serif');
    check.ok("so does the sans stack", /^"Libre Franklin", "Libre Franklin Fallback",/.test(root.getPropertyValue("--font-sans").trim()));
    check.clean("no errors applying fonts", ctx);
    ctx.close();

    const plain = await loadPage("index.html", { editor: false, storage: { wl_brand: JSON.stringify({ fonts: { serif: "Georgia, serif" } }) } });
    check.equal("a system-font stack is left alone", plain.document.documentElement.style.getPropertyValue("--font-serif").trim(), "Georgia, serif");
    plain.close();

    check.ok("the stylesheet default carries its fallback too", /--font-display:\s*"Old Standard TT", "Old Standard TT Fallback"/.test(css));
  }

  return check;
}
