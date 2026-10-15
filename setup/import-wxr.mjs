#!/usr/bin/env node
// Turn a WordPress export into First Edition content.
//
//   node setup/import-wxr.mjs export.xml
//   node setup/import-wxr.mjs export.xml --out content-bundle.json
//   node setup/import-wxr.mjs export.xml --map "Campus Life=Features" --map "Reviews=Style"
//   node setup/import-wxr.mjs export.xml --no-new-sections --default-section News
//
// "We'd lose our archive" is the objection that ends most switches, so this
// reads the file WordPress (and SNO, which is WordPress underneath) exports
// from Tools → Export, and writes a content bundle the editor dashboard loads
// in one click: open the Content tab, click *Load bundle…*, pick the file.
// Publish as usual afterwards.
//
// What comes across: every published post — headline, standfirst (the
// excerpt), byline, date, body paragraphs, tags, and the featured image as a
// link to wherever WordPress hosts it. Categories become sections: ones that
// match a section the paper already has are used as-is, the rest are created.
// Drafts, pages, menus and media library entries are skipped and counted.
//
// No dependencies. The export is XML, but a regular, flat kind of XML, and a
// few careful regular expressions read it without pulling in a parser.
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const SITE = path.resolve(fileURLToPath(import.meta.url), "../../site");

export const FORMAT = "newspaper-content-bundle";
export const VERSION = 1;

// Names a WordPress category often has for a section First Edition ships with.
const SECTION_ALIASES = {
  "opinion": "Op-Ed", "opinions": "Op-Ed", "editorial": "Op-Ed", "editorials": "Op-Ed",
  "op-ed": "Op-Ed", "oped": "Op-Ed", "feature": "Features", "features": "Features",
  "sport": "Sports", "sports": "Sports", "athletics": "Sports", "news": "News",
  "fashion": "Style", "style": "Style", "a&e": "Features", "arts & entertainment": "Features",
};
const GENERIC_CATEGORIES = new Set(["uncategorized", "uncategorised", "blog", "posts"]);

// ===== Reading the XML =====

const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…",
  mdash: "—", ndash: "–", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
};

export function decodeEntities(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED_ENTITIES[name.toLowerCase()] ?? m);
}

function unwrapCdata(s) {
  const m = /^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/.exec(s);
  return m ? m[1] : decodeEntities(s);
}

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

/** Inner text of every <tag>…</tag> in `xml`, in order. */
export function blocks(xml, tag) {
  const re = new RegExp(`<${escapeRe(tag)}(?:\\s[^>]*)?>([\\s\\S]*?)</${escapeRe(tag)}>`, "g");
  const out = [];
  let m;
  while ((m = re.exec(xml))) out.push(m[1]);
  return out;
}

/** The first <tag>…</tag> inside `xml`, with CDATA unwrapped, or "". */
export function text(xml, tag) {
  const [first] = blocks(xml, tag);
  return first === undefined ? "" : unwrapCdata(first).trim();
}

function categories(item, domain) {
  const re = /<category([^>]*)>([\s\S]*?)<\/category>/g;
  const out = [];
  let m;
  while ((m = re.exec(item))) {
    const d = (/domain="([^"]*)"/.exec(m[1]) || [])[1];
    if (d === domain) out.push(unwrapCdata(m[2]).trim());
  }
  return out;
}

function postMeta(item, key) {
  return blocks(item, "wp:postmeta")
    .filter(b => text(b, "wp:meta_key") === key)
    .map(b => text(b, "wp:meta_value"))[0] || "";
}

function readItem(item) {
  return {
    title: text(item, "title"),
    slug: text(item, "wp:post_name"),
    postId: text(item, "wp:post_id"),
    type: text(item, "wp:post_type"),
    status: text(item, "wp:status"),
    date: text(item, "wp:post_date"),
    creator: text(item, "dc:creator"),
    content: text(item, "content:encoded"),
    excerpt: text(item, "excerpt:encoded"),
    categories: categories(item, "category"),
    tags: categories(item, "post_tag"),
    thumbnailId: postMeta(item, "_thumbnail_id"),
    attachmentUrl: text(item, "wp:attachment_url"),
  };
}

function readAuthor(block) {
  return {
    login: text(block, "wp:author_login"),
    name: text(block, "wp:author_display_name") || text(block, "wp:author_login"),
  };
}

/** The parts of a WXR file this importer cares about. */
export function parseWxr(xml) {
  if (!/<rss[\s>]/.test(xml) || !/xmlns:wp=/.test(xml)) {
    throw new Error("This does not look like a WordPress export (no <rss> with the wp: namespace).");
  }
  const channel = blocks(xml, "channel")[0] || xml;
  const items = blocks(channel, "item").map(readItem);
  return {
    siteTitle: text(channel.split("<item")[0], "title"),
    authors: blocks(channel, "wp:author").map(readAuthor),
    posts: items.filter(i => i.type === "post"),
    attachments: items.filter(i => i.type === "attachment"),
    other: items.filter(i => i.type !== "post" && i.type !== "attachment"),
  };
}

// ===== Turning WordPress fields into story fields =====

/** "2026-05-06 14:30:00" → "May 6, 2026", the form the site's dates take. */
export function wpDate(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || "");
  if (!m) return "";
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function slugify(s) {
  return String(s).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

/** Post HTML (classic or Gutenberg) → an array of plain-text paragraphs. */
export function convertBody(html) {
  const BLOCK_END = /<\/(p|h[1-6]|li|blockquote|div|figure|figcaption|pre|tr)>/gi;
  return String(html)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(BLOCK_END, "\n\n")
    .replace(/<[^>]+>/g, "")
    .split(/\n\s*\n/)
    .map(p => decodeEntities(p).replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function pickSection(cats, ctx) {
  const { sectionMap, sections } = ctx;
  for (const c of cats) {
    const mapped = sectionMap[c.toLowerCase()];
    if (mapped) return { name: mapped, source: c };
  }
  for (const c of cats) {
    const key = c.toLowerCase();
    if (GENERIC_CATEGORIES.has(key)) continue;
    const existing = sections.find(s => s.name.toLowerCase() === key)
      || sections.find(s => s.name === SECTION_ALIASES[key]);
    if (existing) return { name: existing.name, source: c };
  }
  const fresh = cats.find(c => !GENERIC_CATEGORIES.has(c.toLowerCase()));
  return fresh ? { name: null, source: fresh } : { name: null, source: null };
}

function uniqueId(base, taken) {
  const root = base || "story";
  if (!taken.has(root)) return root;
  let n = 2;
  while (taken.has(`${root}-${n}`)) n += 1;
  return `${root}-${n}`;
}

// ===== The sections the paper already has =====

/**
 * Reads the shipped section list by running sections-store.js in a sandbox,
 * so this script never carries its own copy of that list to drift from.
 */
export function defaultSections(site = SITE) {
  const src = fs.readFileSync(path.join(site, "sections-store.js"), "utf8");
  const storage = new Map();
  const sandbox = {
    localStorage: {
      getItem: k => (storage.has(k) ? storage.get(k) : null),
      setItem: (k, v) => storage.set(k, String(v)),
      removeItem: k => storage.delete(k),
    },
    document: { dispatchEvent() {}, addEventListener() {} },
    CustomEvent: class { constructor(type) { this.type = type; } },
    console,
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: "sections-store.js" });
  return sandbox.WLSections.list().map(s => ({ ...s }));
}

function newSection(name) {
  return {
    name, page: "section.html?name=" + encodeURIComponent(name),
    nav: true, locked: false, contentTypes: ["Articles"],
  };
}

// ===== Building the bundle =====

export function buildBundle(parsed, opts = {}) {
  const sections = (opts.sections || defaultSections()).map(s => ({ ...s }));
  const sectionMap = Object.fromEntries(
    Object.entries(opts.sectionMap || {}).map(([k, v]) => [k.toLowerCase(), v]));
  const addSections = opts.addSections !== false;
  const defaultSection = opts.defaultSection || "News";
  const authors = new Map(parsed.authors.map(a => [a.login, a.name]));
  const attachments = new Map(parsed.attachments.map(a => [a.postId, a.attachmentUrl]));

  const created = [];
  const unmatched = new Set();
  const articles = {};
  const taken = new Set();
  const skipped = { notPublished: 0, empty: 0 };

  for (const post of parsed.posts) {
    if (post.status !== "publish") { skipped.notPublished += 1; continue; }
    const body = convertBody(post.content);
    if (!post.title && !body.length) { skipped.empty += 1; continue; }

    const picked = pickSection(post.categories, { sectionMap, sections: [...sections, ...created] });
    let sectionName = picked.name;
    if (!sectionName && picked.source && addSections) {
      const fresh = newSection(picked.source);
      created.push(fresh);
      sectionName = fresh.name;
    }
    if (!sectionName) {
      if (picked.source) unmatched.add(picked.source);
      sectionName = defaultSection;
    }
    const section = [...sections, ...created].find(s => s.name === sectionName) || newSection(sectionName);

    const id = uniqueId(post.slug || slugify(post.title), taken);
    taken.add(id);
    const photo = attachments.get(post.thumbnailId) || "";
    const deck = convertBody(post.excerpt)[0] || "";
    articles[id] = {
      title: decodeEntities(post.title),
      deck,
      section: section.name,
      sectionPage: section.page,
      byline: authors.get(post.creator) || post.creator || "Staff",
      date: wpDate(post.date),
      ...(post.tags.length ? { tags: post.tags } : {}),
      ...(photo ? { photo } : {}),
      body,
    };
  }

  const data = { wl_articles_custom: articles };
  if (created.length) data.wl_sections = [...sections, ...created];

  return {
    bundle: { format: FORMAT, version: VERSION, data },
    report: {
      imported: Object.keys(articles).length,
      skipped: { ...skipped, pagesAndOther: parsed.other.length, attachments: parsed.attachments.length },
      sectionsCreated: created.map(s => s.name),
      sectionsUnmatched: [...unmatched],
      withPhoto: Object.values(articles).filter(a => a.photo).length,
    },
  };
}

// ===== Command line =====

function parseArgs(argv) {
  const opts = { out: "content-bundle.json", sectionMap: {}, addSections: true, defaultSection: "News" };
  const rest = [];
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--out") opts.out = argv[++i];
    else if (a === "--map") {
      const [from, to] = String(argv[++i] || "").split("=");
      if (!from || !to) throw new Error('--map expects "WordPress category=Section"');
      opts.sectionMap[from.trim()] = to.trim();
    }
    else if (a === "--no-new-sections") opts.addSections = false;
    else if (a === "--default-section") opts.defaultSection = argv[++i];
    else if (a.startsWith("--")) throw new Error(`Unknown option ${a}`);
    else rest.push(a);
  }
  return { ...opts, file: rest[0] };
}

function printReport(r, out) {
  const lines = [
    `Imported ${r.imported} published stor${r.imported === 1 ? "y" : "ies"} → ${out}`,
    `  with a featured image: ${r.withPhoto}`,
    `  skipped: ${r.skipped.notPublished} unpublished, ${r.skipped.pagesAndOther} pages/other, ${r.skipped.attachments} media entries`,
  ];
  if (r.sectionsCreated.length) lines.push(`  sections created: ${r.sectionsCreated.join(", ")}`);
  if (r.sectionsUnmatched.length) lines.push(`  categories sent to the default section: ${r.sectionsUnmatched.join(", ")}`);
  lines.push("", "Next: open the editor's Content tab, click Load bundle…, pick that file, then publish.");
  console.log(lines.join("\n"));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const opts = parseArgs(process.argv.slice(2));
    if (!opts.file) throw new Error("Usage: node setup/import-wxr.mjs <wordpress-export.xml> [--out file] [--map \"Category=Section\"]…");
    const xml = fs.readFileSync(opts.file, "utf8");
    const { bundle, report } = buildBundle(parseWxr(xml), opts);
    fs.writeFileSync(opts.out, JSON.stringify(bundle, null, 2) + "\n", "utf8");
    printReport(report, opts.out);
  } catch (err) {
    console.error(`import-wxr: ${err.message}`);
    process.exit(1);
  }
}
