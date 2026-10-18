// Article content — sample stories for the demo site.
//
// Everything here is invented: East High School, The Wildcat Times, every
// byline and every person quoted. It exists so a fresh copy of the template
// looks like a working newspaper instead of an empty page. Delete the whole
// object to start clean, or replace stories from the Editor dashboard; nothing
// else in the site depends on this content.
//
// Shape of a story:
//   title        the headline
//   deck         the standfirst under it
//   section      must match a section name (see sections-store.js)
//   sectionPage  the page that section lives on
//   byline       one writer; add `authors: []` as well for a co-written piece
//   date         written out, e.g. "May 6, 2026"
//   photo        optional path under media/
//   body         an array of paragraphs
window.WL_ARTICLES = {
  "later-start-time-approved": {
    photo: "media/art-later-start.svg",
    title: "School Board Approves 8:40 Start Time for the Fall",
    deck: "After two years of student petitions and a sleep-science presentation from the health department, first period moves back 35 minutes.",
    section: "News",
    tags: ["Schedule", "School Board"],
    sectionPage: "news.html",
    byline: "Priya Raghunathan",
    date: "May 12, 2026",
    body: [
      "The East High School Board voted 6–3 on Tuesday night to move the start of the school day from 8:05 a.m. to 8:40 a.m., beginning with the fall semester. The change ends a debate that has run through three school years and two superintendents.",
      "The vote followed a twenty-minute presentation from the district health office, which cited research showing that adolescents' circadian rhythms make early mornings biologically difficult regardless of bedtime. \"We have been asking students to do something their bodies are not built to do,\" said board member Dana Whitfield, who voted in favor.",
      "Student government has petitioned for a later start since 2024. Junior class president Marcus Bell said the turning point was reframing the argument. \"We stopped saying we were tired,\" Bell said. \"We started bringing attendance data. First-period absences were almost double second period. That's the number that moved people.\"",
      "The three dissenting members raised transportation costs and athletics. Buses will now run a compressed morning route, and the district estimates an additional $180,000 annually. Games scheduled before 4:30 p.m. may require early dismissal for traveling teams.",
      "Athletic director Ruth Camacho said her office had been planning for the possibility since March. \"We'll lose some daylight at the end of the day in November,\" she said. \"We're not going to pretend that's nothing. But we can schedule around it.\"",
      "The final bell moves to 3:35 p.m. Late buses will run at 4:45 p.m. and 6:15 p.m., unchanged from this year."
    ]
  },

  "science-wing-opens": {
    photo: "media/art-science-wing.svg",
    title: "Science Wing Opens Two Years and One Flood Later",
    deck: "The building students watched rise from the junior lot finally has students in it — and a hallway the chemistry teachers are still arguing about.",
    section: "News",
    tags: ["Campus", "Science"],
    sectionPage: "news.html",
    authors: ["Priya Raghunathan", "Devon Ackerley"],
    byline: "Priya Raghunathan",
    date: "May 4, 2026",
    body: [
      "The Hollis Science Wing opened to classes on Monday, twenty-six months after groundbreaking and eight months later than the original completion date. A burst supply line flooded the second floor last August, pushing the opening from the fall semester to the spring.",
      "The wing adds six laboratories, a greenhouse on the third-floor terrace, and a shared prep room that the chemistry and biology departments now split. It replaces labs built in 1974.",
      "\"The old fume hoods were older than every teacher using them,\" said chemistry teacher Alan Sosa. \"I could tell you stories. I would rather not, now that I don't have to.\"",
      "Not everything has settled. The central corridor was designed as open collaboration space, with glass walls between the labs and the hallway. Several teachers say it is louder than they expected.",
      "\"It looks beautiful in the photographs,\" said biology teacher Grace Odom. \"On a Tuesday, when there are forty kids in the corridor and I am trying to run a lab practical, it is a fishbowl. We are working on it. There will probably be curtains.\"",
      "Students have been less ambivalent. Sophomore Tessa Lindqvist described the greenhouse as \"the only room in this building where I forget I'm at school,\" and said her environmental science class has already started a tomato project there.",
      "The wing cost $14.2 million, funded by the 2023 facilities bond. The old labs will be demolished over the summer; the district has not announced what replaces them."
    ]
  },

  "student-government-turnout": {
    title: "Student Government Election Draws Record Turnout",
    deck: "Seventy-one percent of the student body voted, nearly double last year — and the winning ticket ran on a single issue.",
    section: "News",
    tags: ["Student Government", "Elections"],
    sectionPage: "news.html",
    byline: "Owen Marchetti",
    date: "April 28, 2026",
    body: [
      "Seventy-one percent of East High students cast a ballot in last week's student government election, the highest participation the school has recorded since it began tracking turnout in 2016. Last year's figure was thirty-eight percent.",
      "The winning ticket — juniors Sana Iqbal and Theo Brennan — ran almost entirely on reforming the club funding process, which currently requires clubs to submit budget requests in September for the entire year.",
      "\"You have to know in September what your club will need in April,\" Iqbal said. \"Nobody knows that. So clubs pad their requests, and then the ones that were honest run out of money in February.\"",
      "Turnout was helped by a change in mechanics as much as by the platform. Voting moved from a paper ballot during lunch to a form open for a full school day, and homeroom teachers were asked to give students five minutes to complete it.",
      "\"I want to be careful about how much credit the platform gets,\" said outgoing president Nadia Fournier. \"We made it take ninety seconds instead of standing in a line. That's most of it. The next council should keep that and not congratulate themselves too much.\"",
      "Iqbal and Brennan take office in September."
    ]
  },

  "cafeteria-staff-profile": {
    title: "The Six People Who Feed Nine Hundred Students a Day",
    deck: "Lunch starts at 10:15 a.m. for the students. It starts at 5:40 a.m. for Yolanda Prieto.",
    section: "Features",
    tags: ["Staff", "Profiles"],
    sectionPage: "features.html",
    byline: "Hana Kobayashi",
    date: "May 8, 2026",
    body: [
      "Yolanda Prieto unlocks the kitchen door at 5:40 a.m. She has done it for nineteen years. By the time the first students arrive, she and five colleagues will have made roughly nine hundred lunches, and she will already be thinking about tomorrow's delivery.",
      "\"People think we push a button,\" Prieto said, laughing, while portioning rice into pans. \"There is no button. There has never been a button.\"",
      "The kitchen runs on a schedule measured in minutes. Bread comes out at 6:20. Hot line assembly starts at 8:00. The salad bar has to be built, broken down, and rebuilt between the two lunch periods, because the district requires cold items to be re-iced.",
      "What has changed most in nineteen years, Prieto said, is not the food but the paperwork. Federal nutrition rules require documentation for every component of every meal.",
      "\"I can tell you the sodium in everything on that line,\" she said. \"I could not do that in 2007. That is better. It is also two hours a week I spend at a computer instead of cooking.\"",
      "The staff know a surprising number of students by name and order. Line cook Marcus Deng estimated he knows about two hundred.",
      "\"You see somebody every day for four years,\" Deng said. \"You notice when they stop coming through. Sometimes you're the one who notices first.\"",
      "Prieto retires in two years. Asked what she wants students to know, she thought for a while. \"That somebody made it,\" she said. \"That's all. Somebody made it, and they were up early, and they hoped you liked it.\""
    ]
  },

  "robotics-build-season": {
    photo: "media/art-robotics.svg",
    title: "Inside the Robotics Team's 3 A.M. Build Season",
    deck: "Six weeks, one competition robot, and a drivetrain the team tore down and rebuilt nine days before the district qualifier.",
    section: "Features",
    tags: ["Clubs", "Robotics"],
    sectionPage: "features.html",
    byline: "Devon Ackerley",
    date: "April 22, 2026",
    body: [
      "The robotics room in the basement of the vocational building has no windows, which the team considers a feature. During build season it is easier not to know what time it is.",
      "Every January, teams receive that year's competition rules and get six weeks to design, build, and program a robot. East High's team of nineteen spent this year's season on a machine they call Brisket, for reasons that four separate members explained four different ways.",
      "Nine days before the district qualifier, Brisket could not drive straight.",
      "\"We had known for about a week that something was wrong,\" said team captain Ines Delacroix. \"We kept treating it as a software problem because software problems are easier to fix at eleven at night. It was not a software problem.\"",
      "The drivetrain — the assembly that turns motor output into motion — had been built around a gearbox that could not handle the robot's final weight. Fixing it meant taking apart most of what sat above it.",
      "The team voted to rebuild. They finished at 3:10 a.m. on a Saturday, and lead builder Sam Oyelaran drove it down the hallway to test it while everyone else sat on the floor and watched.",
      "\"It went straight,\" Oyelaran said. \"That's it. That's the whole story. It went straight and everybody screamed and Ms. Vance told us to keep it down, at three in the morning, in an empty school.\"",
      "Brisket finished fourth at the qualifier, the program's best result. Delacroix, a senior, said the placement is not what she will remember. \"The rebuild is the thing,\" she said. \"Anybody can have a robot that works. We had one that didn't, and we didn't quit, and that's a harder thing to practice.\""
    ]
  },

  "late-bus-editorial": {
    title: "We Need a Real Late Bus, Not a Promise",
    deck: "The district says late transportation exists. Ask anyone who has stood outside the gym at 6:20 p.m. in February.",
    section: "Op-Ed",
    tags: ["Opinion", "Transport"],
    sectionPage: "opinion.html",
    byline: "Theo Brennan",
    date: "May 6, 2026",
    body: [
      "There is a late bus at East High School. It says so on the district transportation page. It is listed at 4:45 p.m. and 6:15 p.m., and if you have never had to take it, you would reasonably assume this is a solved problem.",
      "It is not a solved problem. The 6:15 bus runs one route. That route covers the north side of the district. If you live anywhere south of Kearney Avenue — which is most of us — the 6:15 bus does not go to your house, and nobody tells you that until you are standing outside the gym watching it pull away.",
      "I have watched underclassmen call parents at 6:20 p.m. in February. I have seen a freshman walk home in the rain because his mother works a shift that does not end until eight. This is not a story about inconvenience.",
      "The counterargument is cost, and it is a real one. A second route is not free. But the district found $180,000 for the later start time, and I supported that, and I will support this: transportation that only serves some students is not transportation. It is a listing on a website.",
      "There is a version of this that is cheap. Run the 6:15 as two alternating routes on different days, north one day and south the next, and publish the schedule in September. It is not as good as two buses. It is enormously better than a bus that does not come to your street.",
      "Next year's council should make this its first ask. Not because it is ambitious, but because it is small, and because we have spent three years being told that small things are the ones that get done."
    ]
  },

  "phone-lockers-editorial": {
    title: "The Phone Pouches Solved a Problem We Didn't Have",
    deck: "Nine months in, the policy has changed where students use their phones, not whether.",
    section: "Op-Ed",
    tags: ["Opinion", "Policy"],
    sectionPage: "opinion.html",
    byline: "Camille Ashford",
    date: "April 30, 2026",
    body: [
      "In August, every student at East High received a lockable pouch and instructions to place a phone in it at the start of each class. The stated goal was to improve focus and, in the principal's words at the opening assembly, \"give you your attention back.\"",
      "I want to be fair to the policy, because I think it was made in good faith. Teachers I respect asked for it. Some of them say their classes are better. I believe them.",
      "But nine months in, the honest description of what changed is this: phone use moved. It moved to the hallway between classes, to the bathroom, to lunch, to the ninety seconds before the pouch is closed and the ninety seconds after it opens. Total screen time in this building did not drop. It got compressed and pushed to the edges, where no adult is watching and nobody is teaching anything about it.",
      "That is not nothing — a phone in a pouch is not a phone in a hand during a lecture. But it was sold as attention restored, and what we got was attention relocated.",
      "The version I would rather have had is harder and less satisfying to announce. It looks like teachers deciding, class by class, when a device is useful and when it is not, and saying so, and enforcing that. Some of my teachers already do this. Their classrooms did not need a pouch.",
      "I am not asking for the pouches to disappear tomorrow. I am asking that when the district evaluates this in June, it measures something other than compliance. Compliance is easy to hit and it is not what anyone actually wanted."
    ]
  },

  "spring-style-hallways": {
    photo: "media/art-spring-style.svg",
    title: "Thrifted, Layered, Loud: What the Hallways Look Like This Spring",
    deck: "The dominant look this year is assembled, not bought — and almost nobody is shopping new.",
    section: "Style",
    tags: ["Style", "Spring"],
    sectionPage: "style.html",
    byline: "Camille Ashford",
    date: "May 1, 2026",
    body: [
      "Spend a week watching the second-floor hallway between fourth and fifth period and one thing becomes obvious: the clothes are getting louder and the price tags are getting smaller.",
      "In an informal survey of sixty students, forty-one said most of what they were wearing came secondhand — thrift stores, older siblings, a parent's closet, or resale apps. Eleven said they had not bought a new piece of clothing in over a year.",
      "\"New clothes look like everyone else's,\" said junior Bea Ferreira, wearing a men's work jacket she said cost nine dollars. \"This is a size too big and there's paint on the cuff and nobody else has it. That's the whole appeal.\"",
      "The look tends toward layers: a tee under a button-down under something heavier, regardless of temperature. Several students described taking pieces off through the day as a feature rather than a miscalculation.",
      "Not everyone is convinced it is a real shift. Senior Malik Osei pointed out that thrifting has its own uniform. \"Everybody says they want to look different,\" he said. \"Then you walk down this hallway and there are nine people in the same brown corduroy jacket. We found a different store. We didn't find a different idea.\"",
      "The one item nearly everyone named was footwear, where secondhand loses. Fifty-two of sixty said their shoes were bought new."
    ]
  },

  "lunch-table-playlist": {
    title: "The Lunch Table Playlist, Reviewed by Someone Who Didn't Choose It",
    deck: "Table nine has controlled the cafeteria speaker since October. A dissenting opinion from table eleven.",
    section: "Style",
    tags: ["Music", "Style"],
    sectionPage: "style.html",
    byline: "Owen Marchetti",
    date: "April 24, 2026",
    body: [
      "There is one Bluetooth speaker in the west cafeteria, and it has belonged to table nine since roughly October, by a process nobody can reconstruct and nobody has successfully challenged.",
      "I sit at table eleven. I have listened to this playlist for seven months without consent. I am, I would argue, the most qualified critic in the building, because I have never once been able to skip a track.",
      "The rotation runs about forty songs, of which perhaps nine are load-bearing. The opener is almost always something mid-tempo and agreeable, which I have come to understand as a diplomatic gesture. Nobody objects to the first song. The first song is not the problem.",
      "The problem arrives around 12:20, when the playlist commits. There is a specific track — I will not name it, because the people who chose it are seniors and they are graduating and I want that to be a peaceful occasion — that has played, by my count, on 84 of the last 120 school days.",
      "In fairness, the playlist has range. There is a stretch in the middle that is genuinely good, and on the day of the last snow closure someone queued something slow and the entire west cafeteria briefly went quiet, which I have thought about more than I expected to.",
      "Table nine graduates in June. Table eleven is ready. We have a document."
    ]
  },

  "soccer-conference-drought": {
    photo: "media/art-soccer.svg",
    title: "Wildcats Soccer Ends a Nine-Year Conference Drought",
    deck: "A 2–1 win over Northgate in the conference final gives East High its first title since 2017 — and its first win over Northgate since 2014.",
    section: "Sports",
    tags: ["Sports", "Soccer"],
    sectionPage: "sports.html",
    byline: "Jonah Whitfield",
    date: "May 14, 2026",
    body: [
      "East High won the Northern Conference final 2–1 over Northgate on Saturday, taking the program's first conference title since 2017 and ending a nine-year stretch in which the Wildcats reached the final three times and lost all three.",
      "The winner came in the 78th minute from junior midfielder Ana Restrepo, who had been pushed forward eleven minutes earlier after Northgate equalized.",
      "\"We didn't plan it,\" said head coach Devin Marsh. \"I'd like to say we planned it. Ana had been chasing the game from deep all half and I thought, she is the most dangerous player on this field and she is forty yards from goal. That was the extent of the tactical genius.\"",
      "Northgate had beaten East High in each of the last four meetings, including a 4–0 result in September that Restrepo described as the reason Saturday happened. \"We watched that game back as a team,\" she said. \"All of it. Nobody wanted to. That was the season, honestly. Everything after that was people deciding it wasn't going to happen again.\"",
      "Senior goalkeeper Tomasz Kowalczyk made six saves, including a diving stop in stoppage time that Marsh called \"the actual game-winner, whatever the scoresheet says.\"",
      "The Wildcats finish 14–3–2 and advance to the regional bracket, opening at home against the winner of Riverside and Carver."
    ]
  },

  "swim-freshman-records": {
    title: "The Swim Team's Freshman Class Is Rewriting the Record Board",
    deck: "Three school records have fallen this season. All three now belong, at least in part, to ninth graders.",
    section: "Sports",
    tags: ["Sports", "Swimming"],
    sectionPage: "sports.html",
    byline: "Jonah Whitfield",
    date: "April 26, 2026",
    body: [
      "The record board outside the natatorium has been repainted twice this year, which coach Melissa Ngo says has never happened in her fourteen seasons at East High.",
      "Three school records have fallen since January — the 100 breaststroke, the 200 individual medley, and the 400 freestyle relay. All three now belong, in whole or in part, to members of this year's freshman class.",
      "\"I have had good freshmen,\" Ngo said. \"I have not had six good freshmen at once. That is not coaching. That is a club program two miles away doing excellent work for eight years and then handing me the results.\"",
      "Freshman Yusuf Adeyemi broke the 100 breaststroke record in his fourth high school meet, taking 1.4 seconds off a mark set in 2009. He said he did not know it was a record until his teammates told him in the water.",
      "\"I thought something was wrong,\" Adeyemi said. \"Everyone was yelling and I assumed I'd been disqualified.\"",
      "The upperclassmen have handled it with more grace than Ngo expected. Senior captain Rowan Espinoza, whose own 200 IM record was among those broken, was the one who organized the repainting.",
      "\"It was my record for two years and it was great,\" Espinoza said. \"Now it's his. I'd rather have a fast team than a name on a wall. Ask me again in ten years and maybe I'll say something different.\""
    ]
  }
};
