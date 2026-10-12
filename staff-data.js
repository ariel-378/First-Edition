// Default masthead/staff for the site. Editors manage this from the dashboard
// (Staff tab); their changes are stored in localStorage and override these
// defaults. "Reset staff to defaults" restores this list.
//
// SAMPLE CONTENT. Every person below is invented, as are the bylines in
// articles.js they match. To start clean, set WL_STAFF to [] and keep or
// rename the groups.
//
// `slug` links a card to that person's writer page (the articles under their
// byline). Leave it blank for anyone who does not write.
window.WL_STAFF_GROUPS = [
  "Leadership",
  "Section Editors",
  "Writers & Contributors",
  "Photography & Design",
  "Faculty Adviser"
];

window.WL_STAFF = [
  // ── Leadership ──────────────────────────────────────────────────────────
  {
    id: "editor-in-chief",
    name: "Priya Raghunathan",
    role: "Editor-in-Chief",
    year: "Class of 2026",
    group: "Leadership",
    email: "editor@example.org",
    slug: "priya-raghunathan",
    photo: ""
  },
  {
    id: "managing-editor",
    name: "Jonah Whitfield",
    role: "Managing Editor",
    year: "Class of 2026",
    group: "Leadership",
    email: "managing@example.org",
    slug: "jonah-whitfield",
    photo: ""
  },
  {
    id: "online-editor",
    name: "Camille Ashford",
    role: "Online Editor",
    year: "Class of 2027",
    group: "Leadership",
    email: "",
    slug: "camille-ashford",
    photo: ""
  },

  // ── Section Editors ─────────────────────────────────────────────────────
  {
    id: "news-editor",
    name: "Devon Ackerley",
    role: "News Editor",
    year: "Class of 2027",
    group: "Section Editors",
    email: "",
    slug: "devon-ackerley",
    photo: ""
  },
  {
    id: "features-editor",
    name: "Hana Kobayashi",
    role: "Features Editor",
    year: "Class of 2027",
    group: "Section Editors",
    email: "",
    slug: "hana-kobayashi",
    photo: ""
  },
  {
    id: "opinion-editor",
    name: "Theo Brennan",
    role: "Opinion Editor",
    year: "Class of 2026",
    group: "Section Editors",
    email: "",
    slug: "theo-brennan",
    photo: ""
  },
  {
    id: "sports-editor",
    name: "Owen Marchetti",
    role: "Sports Editor",
    year: "Class of 2028",
    group: "Section Editors",
    email: "",
    slug: "owen-marchetti",
    photo: ""
  },

  // ── Writers & Contributors ──────────────────────────────────────────────
  {
    id: "writer-marisol-vega",
    name: "Marisol Vega",
    role: "Staff Writer",
    year: "Class of 2028",
    group: "Writers & Contributors",
    email: "",
    slug: "",
    photo: ""
  },
  {
    id: "writer-elias-thornbury",
    name: "Elias Thornbury",
    role: "Staff Writer",
    year: "Class of 2029",
    group: "Writers & Contributors",
    email: "",
    slug: "",
    photo: ""
  },
  {
    id: "writer-nadia-okafor",
    name: "Nadia Okafor",
    role: "Contributing Writer",
    year: "Class of 2027",
    group: "Writers & Contributors",
    email: "",
    slug: "",
    photo: ""
  },

  // ── Photography & Design ────────────────────────────────────────────────
  {
    id: "photo-editor",
    name: "Ruben Castellanos",
    role: "Photo Editor",
    year: "Class of 2027",
    group: "Photography & Design",
    email: "",
    slug: "",
    photo: ""
  },
  {
    id: "design-editor",
    name: "Ingrid Solberg",
    role: "Design Editor",
    year: "Class of 2028",
    group: "Photography & Design",
    email: "",
    slug: "",
    photo: ""
  },
  {
    id: "illustrator",
    name: "Tomas Lindqvist",
    role: "Staff Illustrator",
    year: "Class of 2029",
    group: "Photography & Design",
    email: "",
    slug: "",
    photo: ""
  },

  // ── Faculty Adviser ─────────────────────────────────────────────────────
  {
    id: "faculty-adviser",
    name: "Lorraine Petrakis",
    role: "Faculty Adviser",
    year: "",
    group: "Faculty Adviser",
    email: "adviser@example.org",
    slug: "",
    photo: ""
  }
];
