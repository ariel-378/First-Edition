// Sports data: teams, records, past games, upcoming schedule, and brackets.
// Editors update these from the Sports tab, or a CMS emits the same shape.
//
// Sample data for the demo site — East High School and every opponent, coach
// and result below are invented. Set both objects to {} to start clean.
window.WL_TEAMS = {
  "girls-soccer": {
    name: "Girls' Soccer",
    sport: "Soccer",
    season: "Spring 2026",
    coach: "Devin Marsh",
    league: "Northern Conference",
    record: { w: 14, l: 3, t: 2 },
    games: [
      { date: "May 14, 2026", opponent: "Northgate", result: "W", score: "2-1", home: false, note: "Conference Final — Restrepo 78'" },
      { date: "May 9, 2026",  opponent: "Riverside", result: "W", score: "3-1", home: true,  note: "Semifinal" },
      { date: "May 2, 2026",  opponent: "Carver",    result: "W", score: "4-0", home: true },
      { date: "April 27, 2026", opponent: "Northgate", result: "L", score: "1-2", home: false },
      { date: "April 21, 2026", opponent: "Jefferson", result: "W", score: "2-0", home: true },
      { date: "April 15, 2026", opponent: "Edison",  result: "T", score: "1-1", home: false }
    ],
    upcoming: [
      { date: "May 23, 2026", opponent: "TBD", time: "2:00 PM", home: true, note: "Regional First Round", theme: "Whiteout" },
      { date: "May 28, 2026", opponent: "TBD", time: "5:30 PM", home: false, note: "If advance — Regional Semifinal" }
    ]
  },

  "swimming": {
    name: "Swimming & Diving",
    sport: "Swimming",
    season: "Winter 2026",
    coach: "Melissa Ngo",
    league: "Northern Conference",
    record: { w: 11, l: 2, t: 0 },
    games: [
      { date: "April 18, 2026", opponent: "Conference Championship", result: "W", score: "2nd of 9", home: false, note: "3 school records" },
      { date: "April 4, 2026",  opponent: "Riverside", result: "W", score: "104-82", home: true },
      { date: "March 28, 2026", opponent: "Northgate", result: "L", score: "88-98", home: false },
      { date: "March 21, 2026", opponent: "Carver",    result: "W", score: "121-65", home: true }
    ],
    upcoming: [
      { date: "September 12, 2026", opponent: "Time trials", time: "4:00 PM", home: true, note: "Season opener" }
    ]
  },

  "boys-basketball": {
    name: "Boys' Basketball",
    sport: "Basketball",
    season: "Winter 2026",
    coach: "Ray Okonjo",
    league: "Northern Conference",
    record: { w: 8, l: 12, t: 0 },
    games: [
      { date: "March 6, 2026",  opponent: "Edison",    result: "L", score: "58-71", home: false, note: "First round" },
      { date: "February 28, 2026", opponent: "Carver", result: "W", score: "66-61", home: true },
      { date: "February 21, 2026", opponent: "Northgate", result: "L", score: "49-77", home: false },
      { date: "February 14, 2026", opponent: "Jefferson", result: "W", score: "72-70", home: true, note: "OT" }
    ],
    upcoming: [
      { date: "November 20, 2026", opponent: "Riverside", time: "7:00 PM", home: true, note: "Season opener" }
    ]
  }
};

// Brackets — one per sport currently in playoffs. Each bracket has rounds
// (array of arrays). Each matchup has team1, team2, and optionally a result.
window.WL_BRACKETS = {
  "girls-soccer-spring-2026": {
    title: "Girls' Soccer — Conference Playoffs",
    sport: "Soccer",
    season: "Spring 2026",
    rounds: [
      {
        name: "Quarterfinals",
        matches: [
          { team1: "East High", team2: "Hillcrest", result: { winner: "East High", score: "3-0" } },
          { team1: "Riverside", team2: "Potomac",   result: { winner: "Riverside", score: "2-1" } },
          { team1: "Northgate", team2: "Edison",    result: { winner: "Northgate", score: "5-1" } },
          { team1: "Jefferson", team2: "Carver",    result: { winner: "Jefferson", score: "1-0" } }
        ]
      },
      {
        name: "Semifinals",
        matches: [
          { team1: "East High", team2: "Riverside", result: { winner: "East High", score: "3-1" } },
          { team1: "Northgate", team2: "Jefferson", result: { winner: "Northgate", score: "2-0" } }
        ]
      },
      {
        name: "Final",
        matches: [
          { team1: "East High", team2: "Northgate", result: { winner: "East High", score: "2-1" } }
        ]
      }
    ]
  },

  "boys-basketball-winter-2026": {
    title: "Boys' Basketball — Conference Playoffs",
    sport: "Basketball",
    season: "Winter 2026",
    rounds: [
      {
        name: "First Round",
        matches: [
          { team1: "East High", team2: "Edison",    result: { winner: "Edison",    score: "71-58" } },
          { team1: "Riverside", team2: "Hillcrest", result: { winner: "Riverside", score: "80-64" } }
        ]
      },
      {
        name: "Final",
        matches: [
          { team1: "Edison", team2: "Riverside", result: { winner: "Riverside", score: "68-66" } }
        ]
      }
    ]
  }
};
