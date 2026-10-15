// A WordPress archive becomes First Edition content without losing anything a
// reader would notice.
//
// "We'd lose our archive" is the objection that ends most switches, so the
// importer is held to what an editor would check by hand: every published
// story is there, under the right section, with its byline, date, standfirst,
// paragraphs, tags and photo; nothing unpublished leaks; and the file it
// writes loads into the real editor dashboard, not just into a test.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadPage, Check } from "../harness.mjs";
import {
  parseWxr, buildBundle, convertBody, wpDate, slugify, decodeEntities, defaultSections, FORMAT, VERSION,
} from "../../setup/import-wxr.mjs";

const FIXTURE = path.resolve(fileURLToPath(import.meta.url), "../../fixtures/wordpress-export.xml");

export async function run() {
  const check = new Check();
  const xml = fs.readFileSync(FIXTURE, "utf8");

  // ===== Reading the export =====
  {
    const p = parseWxr(xml);
    check.equal("the paper's name is read from the channel", p.siteTitle, "The Riverside Register");
    check.equal("authors are read with display names", p.authors.map(a => a.name).join("|"), "Jordan Lee|Maya Patel");
    check.equal("posts, pages and media are told apart", `${p.posts.length}/${p.other.length}/${p.attachments.length}`, "4/1/1");
    check.ok("a file that is not a WordPress export is refused",
      (() => { try { parseWxr("<html></html>"); return false; } catch { return true; } })());
  }

  // ===== Field conversion =====
  {
    check.equal("WordPress dates take the site's written form", wpDate("2026-04-14 11:02:11"), "April 14, 2026");
    check.equal("a missing date becomes empty rather than Invalid Date", wpDate(""), "");
    check.equal("slugs are safe ids", slugify("Spring Musical Review: “Into the Woods”"), "spring-musical-review-into-the-woods");
    check.equal("numeric and named entities decode", decodeEntities("5&#8211;2 &amp; &#x27;go&#x27; &rsquo;"), "5–2 & 'go' ’");

    const classic = convertBody("Line one.\n\nLine <a href='x'>two</a>.\n\n\n");
    check.equal("classic blank-line paragraphs split", classic.length, 2);
    check.equal("tags inside a paragraph are stripped", classic[1], "Line two.");

    const blocks = convertBody("<!-- wp:paragraph -->\n<p>One &#8217; two</p>\n<!-- /wp:paragraph --><h2>Head</h2><p>A<br>B</p>");
    check.equal("Gutenberg comments vanish and blocks split", blocks.join(" | "), "One ’ two | Head | A B");
  }

  // ===== Building the bundle =====
  const sections = defaultSections();
  check.ok("the shipped section list is read from sections-store.js", sections.some(s => s.name === "Op-Ed"));

  const { bundle, report } = buildBundle(parseWxr(xml), { sections });
  const stories = bundle.data.wl_articles_custom;
  {
    check.equal("bundle format matches what the editor loads", `${bundle.format}@${bundle.version}`, `${FORMAT}@${VERSION}`);
    check.equal("only published posts are imported", report.imported, 3);
    check.equal("the draft is counted, not imported", report.skipped.notPublished, 1);
    check.ok("the page is not imported as a story", !Object.values(stories).some(a => a.title === "About Us"));

    const turf = stories["turf-field"];
    check.ok("the post's slug is the story id", !!turf);
    check.equal("the headline decodes entities", turf.title, "Board Approves New Turf Field & Track");
    check.equal("the excerpt becomes the deck", turf.deck, "A 5–2 vote ends a three-year debate.");
    check.equal("the byline is the author's display name", turf.byline, "Jordan Lee");
    check.equal("the date is written out", turf.date, "April 14, 2026");
    check.equal("a matching category becomes that section", turf.section, "News");
    check.equal("the section's page comes along", turf.sectionPage, "news.html");
    check.equal("post tags become tags", (turf.tags || []).join(","), "Athletics,School Board");
    check.equal("the featured image resolves to the attachment URL", turf.photo,
      "https://riversideregister.example/wp-content/uploads/2026/04/turf-field-rendering.jpg");
    check.equal("the body is paragraphs, links flattened", turf.body.length, 3);
    check.equal("the body decodes entities", turf.body[0], "The school board voted 5–2 on Monday to replace the grass field.");

    const op = stories["later-start"];
    check.equal("Opinion is recognised as the Op-Ed section", op.section, "Op-Ed");
    check.equal("an empty excerpt leaves an empty deck", op.deck, "");
    check.equal("Gutenberg content is split into paragraphs", op.body.length, 3);
    check.ok("no photo field when there is no featured image", !("photo" in op));

    const review = stories["spring-musical-review-into-the-woods"];
    check.ok("a post with no slug gets one from its title", !!review);
    check.equal("an unknown author login still gives a byline", review.byline, "ghost");
    check.equal("Uncategorized is ignored in favour of a real category", review.section, "Arts");
    check.equal("an unknown category becomes a new section", report.sectionsCreated.join(","), "Arts");
    check.ok("the new section routes to the generic section page", review.sectionPage.startsWith("section.html?name="));
    check.ok("the bundle carries the section list when sections were created",
      Array.isArray(bundle.data.wl_sections) && bundle.data.wl_sections.some(s => s.name === "Arts"));
    check.ok("the shipped sections are kept ahead of the new one",
      bundle.data.wl_sections.findIndex(s => s.name === "News") < bundle.data.wl_sections.findIndex(s => s.name === "Arts"));
  }

  // ===== Options =====
  {
    const mapped = buildBundle(parseWxr(xml), { sections, sectionMap: { Arts: "Features" } });
    check.equal("--map sends a category to a chosen section", mapped.bundle.data.wl_articles_custom["spring-musical-review-into-the-woods"].section, "Features");
    check.ok("no sections are created when every category maps", !("wl_sections" in mapped.bundle.data));

    const flat = buildBundle(parseWxr(xml), { sections, addSections: false, defaultSection: "Features" });
    check.equal("--no-new-sections falls back to the default section", flat.bundle.data.wl_articles_custom["spring-musical-review-into-the-woods"].section, "Features");
    check.equal("…and reports the category it could not place", flat.report.sectionsUnmatched.join(","), "Arts");
  }

  // ===== The file loads into the real editor =====
  {
    const ctx = await loadPage("editor-content.html");
    const { WLBundle, WLArticles, WLSections } = ctx.window;
    const ok = WLBundle.load(JSON.parse(JSON.stringify(bundle)));
    check.ok("the editor accepts the bundle", ok !== false);
    const all = WLArticles.getAll();
    check.ok("the imported stories are in the article store", !!all["turf-field"] && !!all["later-start"]);
    check.ok("the new section exists in the section store", !!WLSections.find("Arts"));
    check.equal("the imported story is filed under its section in the editor",
      WLArticles.bySection("Arts").map(a => a.id).join(","), "spring-musical-review-into-the-woods");
    check.clean("the editor page stayed clean while loading", ctx);
    ctx.close();
  }

  return check;
}
