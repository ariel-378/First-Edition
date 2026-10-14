// ============================================================================
//  CENTERSPREAD CONTENT — the centerspread pieces shown on centerspread.html.
//  Editors manage these from the "Centerspread" tab in the editor dashboard;
//  this file is just the shipped starting content (like articles.js).
//
//  Piece types: "poem" (stanzas), "prose" (paragraphs), "image" (a painting or
//  photo, not tied to an article). Any piece may carry an optional
//  `reveal: { summary, answer }` — a "reveal the answer" toggle.
//  For poem/prose `body`: a blank line separates stanzas/paragraphs; a single
//  newline separates lines within a stanza.
//
//  Sample content for the demo site: invented pieces from the invented East
//  High School. Set `pieces: []` to start clean, or replace them one at a time
//  from the Centerspread tab.
// ============================================================================
window.WL_CENTERSPREAD = {
  pieces: [
    {
      id: "last-bell-poem",
      type: "poem",
      kicker: "Poem",
      title: "Last Bell, Late May",
      byline: "By Ines Delacroix",
      body:
        "The hallway holds its breath for one more hour,\n" +
        "the lockers half-emptied, half-believing\n" +
        "we will be back on Monday, and the Monday after that.\n" +
        "\n" +
        "Someone has written a name in the fogged glass\n" +
        "of the door to the stairwell. It will be gone\n" +
        "by the time the janitor comes through at six.\n" +
        "\n" +
        "Outside, the buses idle in their long yellow sentence.\n" +
        "Inside, a clock that has been wrong since October\n" +
        "is finally, briefly, right.",
    },
    {
      id: "guess-the-teacher",
      type: "prose",
      kicker: "Guess Who",
      title: "A Day in the Life of a Mystery Teacher",
      byline: "By The Editors",
      body:
        "They arrive at 6:50 a.m., which is earlier than the building wants anyone to arrive, and they make the coffee that the rest of the department pretends not to depend on. Their classroom has forty-one plants. They have named eleven of them.\n" +
        "\n" +
        "They have taught here for nine years. Before that they were a park ranger, which explains the plants and possibly the whistle. Students report that they have never once raised their voice, and that this is somehow more effective than if they had.\n" +
        "\n" +
        "Their most-used phrase, by an enormous margin, is “say more about that.”",
      reveal: {
        summary: "Reveal the answer",
        answer: "Ms. Odom, biology — who would like everyone to know that there are forty-three plants now.",
      },
    },
    {
      id: "courtyard-linocut",
      type: "image",
      kicker: "Centerspread Art",
      title: "Courtyard, 7:15 p.m.",
      byline: "By The Art Staff",
      intro:
        "An image piece carries a painting, a photo, or a scanned drawing on its own — no article attached.",
      image: "media/art-centerspread-print.svg",
      alt: "A print-style illustration of the school courtyard at dusk, with the science wing, a tree, and an empty bike rack",
    },
  ],

  // Which interactive puzzles appear below the centerspread pieces. true shows,
  // false hides. Editors toggle these from the Centerspread tab.
  puzzles: {
    crossword: true,
    spellingbee: true,
    connections: true,
    wordsearch: true,
  },
};
