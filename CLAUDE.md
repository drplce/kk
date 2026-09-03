# kk — the Kobus Kennedy site

A typographic monograph on one name, published at https://drplce.github.io/kk/.
It grows by editions. A weekly routine (see WEEKLY.md) researches one of the
site's own subjects, expands it, changes the look, adds an interactive element,
and redeploys. This file is the standing brief for anyone, human or agent,
working in the repository.

## Layout

    src/shell.html          page template: head, nav, spine, footer, {{content}}
    src/pages.json          the pages, their titles, spines, and section order
    src/sections/*.html     one file per section, plain HTML, no build syntax
    assets/site.css         the bones: tokens, type, layout, every component
    assets/edition.css      the current edition's treatment (palette, face, flourish)
    assets/site.js          reveal, the broadcast player, tabs, the monogram builder
    beat-the-beat-1974.mp3  the SAfm recording the player plays
    build.py                assembles src/ into the root HTML pages
    index.html, name.html, broadcast.html, presenter.html, editions.html
                            GENERATED. Never edit by hand; edit src/ and rebuild.
    EDITIONS.md             the edition log and the pool of open questions
    WEEKLY.md               the weekly expansion procedure

## Build and deploy

    python3 build.py        # writes the root pages
    git push origin main    # GitHub Pages deploys from main within a minute

Pages is configured as "Deploy from a branch: main". The workflow in
.github/workflows/pages.yml also runs and is harmless. Both must be green.

Verify before pushing: build, then open each page with the headless Chromium at
/opt/pw-browsers (Playwright is preinstalled; see WEEKLY.md for the snippet) and
check that nothing is clipped, the player loads (readyState 4) and the console
has no page errors. Fonts will not load in the sandbox; that is expected.

## Standing authorisation

The owner has asked for weekly, automatic, unattended editions. Pushing to
`main` for an edition is authorised. Do not open pull requests for editions.
Do not delete the recording, the source sections, or the editions log.

## Voice and honesty

- Every fact on the site is either sourced, heard on the tape, or supplied by
  the family. When something cannot be verified, the page says so in a
  "what was checked" or "not found" row. Never invent a date, a name, a quote,
  or a programme title. Unclear audio is labelled unclear.
- Use they/them for anyone whose pronouns are not stated. Rafe Lavine is
  referred to as he in his own press coverage; that is fine.
- Copy is plain, specific, and a little dry. Sentences carry a verb. No
  em-dashes. Chapter and edition numbers are Roman numerals.
- Structure encodes meaning: numbered lists only for true sequences or ranked
  lists (the career timeline, Lavine's ten records, the editions).

## Design bones

- Bodoni Moda for display, Newsreader for text, Karla for labels, all from
  Google Fonts. Tokens in site.css: --bg, --bg-2, --ink, --ink-2, --muted,
  --rule, --accent, --accent-soft, --lamp, --wave. Light is default; dark is
  under `:root[data-theme="dark"]`.
- Hairline rules, not cards. One accent, used sparingly. The KK monogram
  (two K's, the second mirrored) is the mark and must survive every edition.
- Each edition may change edition.css freely and add components to site.css.
  Do not remove components other pages still use.
