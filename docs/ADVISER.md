# First Edition for advisers

A plain-language guide for the journalism teacher or newspaper adviser whose
students want to run their paper on First Edition. There is no code in this
page. If you want to see the thing itself first, open the live demo:

**https://ariel-378.github.io/First-Edition/**

Click **Editor preview** at the top right to try the editor. Whatever you
change there stays in your own browser and nobody else sees it; **Reset all demo
data** in the dashboard puts everything back.

## What it is

First Edition is a complete website for a student newspaper: a home page,
section pages, article pages, sports with brackets, a video page, puzzles and
games, a staff page, and search. Behind that sits an editor dashboard where
students write stories, manage sections, schedule an edition ahead of time, and
set the paper's name and colors, without touching code.

It was built by a student editor rebuilding her own school paper's site, and
it is released free for any school to use.

## What it costs

Nothing. The software is free and open source under the MIT licence, which
means your school may use it, rename it, and change it without asking anyone
or paying anyone.

Hosting is also free if you use GitHub Pages, which is included and set up by
the one-time steps below. If your school already pays for a website platform,
First Edition can run inside it instead; see the note on platforms at the end.

## What you need

- **A GitHub account** for the school or the paper. GitHub is a free website
  where the files live and where the paper is published from. A student or a
  tech-office colleague can create it in a few minutes.
- **One person willing to click "publish."** Day to day, stories are written in
  the editor dashboard. Putting them in front of readers takes one extra step,
  described below, that any editor can learn in an afternoon.
- **Optionally, your school's website platform.** If your school uses a
  platform such as Finalsite, First Edition can sit behind its login so
  students sign in with their school accounts. That needs the platform's
  administrator for a one-time setup, and it is not required to get started.

## Setting it up, once

Someone comfortable following written steps does this one time. It takes
about fifteen minutes.

1. Open the First Edition page on GitHub and click **Use this template** to
   make your school's own copy.
2. In that copy, go to **Settings**, then **Pages**, and set the source to
   **GitHub Actions**. Within a minute or two the paper is live at a web address
   GitHub gives you.
3. Open the live site, click **Editor preview**, go to the **Brand design**
   tab, and enter the paper's name, the school's name, and the school color.
   The tab hands you a small settings file to pass to whoever manages the copy
   on GitHub; once it is added, every reader sees your branding.

The sample newsroom that ships with the site, "The Wildcat Times" of "East High
School," is entirely invented. Clearing it out so your paper starts empty is
part of the same handoff.

## Bringing your archive

If the paper already lives on WordPress or SNO, the archive is not lost.
WordPress can export every story as one file, and First Edition includes a
tool that turns that file into content the editor dashboard loads in one
click. Headlines, bylines, dates, the text of every published story, its tags,
and its lead photo all come across. Someone technical runs the tool once; the
developer guide explains it.

## How editors sign in

**Running on GitHub Pages on its own,** there is no sign-in. Editors open the
site and click **Editor preview** to reach the dashboard. The dashboard lives in
each editor's own browser, so the published site is never changed by accident:
nothing reaches readers until someone takes the publish step below.

**Running inside your school's platform,** the platform handles sign-in.
Students log in the way they already do for school, and anyone the platform
marks as newspaper staff sees the editor tools. Everyone else sees the paper.

## Adding a section and publishing a story

Everything below happens in the editor dashboard.

**To add a section** such as *Arts* or *Opinion*, open the **Content** tab and
choose **Add section**. The new section appears in the navigation, gets its own
page, and can be chosen to fill a slot on the home page. Sections can be
renamed, reordered, and removed from the same place.

**To write a story,** click **+ Add new content** under the section it belongs in, and write.
Every story has a publish date and time, so an edition can be prepared during
the week and go out on Friday morning on its own. The **Schedule** tab shows
everything that is planned, in the order it will appear.

**To put it in front of readers,** click **Download to publish** on the Content
tab. That saves one file containing everything the editors have published.
Adding that file to the school's copy on GitHub updates the live site for
everyone. In practice one editor or the adviser does this, and it becomes
routine quickly.

If the paper would rather skip that last step, there is an optional add-on that
lets every editor see the same content and publishes automatically. It needs a
free account with a web-services company and about twenty minutes of setup by
someone technical; the developer guides explain it.

## Sharing stories

When a story's link is pasted into a group chat or a social post, the preview
shows the headline, a summary, and the photo, the way links from a professional
newsroom do. This works automatically for every published story a minute or
two after it goes live.

## If your school uses a website platform

First Edition was designed from the start to run inside a school's existing
website platform, with Finalsite as the first target. In that arrangement the
platform provides the login and decides who is an editor, and the paper
appears as part of the school's site. The platform's administrator will want
the technical guides in this folder, in particular the Finalsite and
integration guides.

## Getting help

Open an issue on the First Edition GitHub page and describe your school, your
paper, and where you are stuck. Schools setting up for the first time are
welcome to ask for a hand.
