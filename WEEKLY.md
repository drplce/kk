# The weekly edition

Run once a week, unattended, by a scheduled Claude Code session. The owner's
brief, verbatim: "find one thing or topic or song or item on the website today
that is worth a deeper dive, then launch deep research agents to dig deep and
far, and then build out next or new sections of the page. Each week the website
should be completely rebuilt using the bones and elements but with refinement or
expansion, and visually different, or with a potentially interesting interactive
component."

Budget the session generously. A good edition takes a few hours of agent time.

## 1. Read

- CLAUDE.md, this file, EDITIONS.md (the log and the open-question pool).
- Every page in src/sections/. Read them properly; the subject pool is the site.
- `git log --oneline -20` to see what the last edition did.

## 2. Choose one subject

Pick exactly one. Prefer, in order:

1. An open question in EDITIONS.md that research can plausibly answer.
2. A person, record, place or word already on the site with more to give.
3. A formal or typographic idea the site has only touched (a face, a letter, a
   sound, a number).

Do not repeat a subject from the last four editions. Record the choice and the
reason in EDITIONS.md before researching, so a failed run still leaves a trace.

## 3. Research deep and far

Launch three to five research agents in parallel (the Agent tool,
general-purpose), each with a distinct angle on the subject, each told to:

- search widely (web search; fetch what the proxy allows; many South African
  news sites are blocked, so lean on search-result extracts and quote them as
  extracts, never as full articles you read),
- return dated facts with a URL for each, a list of what could not be found, and
  any direct quotations with their source,
- flag disagreements between sources rather than resolving them silently.

Then reconcile. Anything two agents disagree on goes in a "what was checked"
row as open, not into the running text as fact.

## 4. Build

- Write the new material as one or more new files in src/sections/ (or expand an
  existing one). A new section gets the next Roman chapter numeral if it belongs
  to a volume, or becomes a new volume if it stands alone; add it to
  src/pages.json.
- Every research section ends with two lists: "what was checked" (ticks and
  open marks) and "sources consulted" (links), in the existing .verify and
  .sources styles.
- Change the visual treatment in assets/edition.css: palette shift, a new
  display face (add its Google Fonts link in src/shell.html), or a new
  signature flourish. The change must be visible on first load of every page.
  Keep both themes legible. Keep the KK monogram.
- Add ONE new interactive component that belongs to the subject (a player, a
  slider, a map, a timeline scrubber, a sortable table, a generator). Plain
  JS in assets/site.js, guarded so it no-ops on pages without its markup.
  Remove or retire last edition's instrument only if the new one replaces it in
  kind; otherwise keep it.
- Update: the hero masthead in src/sections/hero.html (edition numeral and
  name), the "edition" string in src/pages.json, src/sections/latest.html, the
  log in src/sections/editions.html (move "Next" down, add the new entry), and
  EDITIONS.md.

## 5. Verify

    python3 build.py
    NODE_PATH=$(npm root -g) node - <<'EOF'
    const { chromium } = require('playwright');
    (async () => {
      const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
      for (const f of ['index','name','broadcast','presenter','editions']) {
        const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
        p.on('pageerror', e => console.log(f, 'pageerror:', e.message));
        await p.goto('file:///home/user/kk/' + f + '.html'); await p.waitForTimeout(600);
        await p.screenshot({ path: '/tmp/' + f + '.png', fullPage: true });
        console.log(f, 'ok', await p.evaluate(() => document.body.scrollWidth <= window.innerWidth ? 'no horizontal scroll' : 'HORIZONTAL SCROLL'));
        await p.close();
      }
      await b.close();
    })();
    EOF

(If the headless shell path differs, `ls /opt/pw-browsers`. If playwright is
missing, `npm i -g playwright@1.47.0`.) Look at the screenshots. Fix anything
clipped, overlapping, or unreadable. No page errors.

## 6. Ship

    git add -A
    git commit -m "Edition <N>: <name> — <subject in a few words>"
    git push origin main

If the session is pinned to a claude/* branch and a push to main is refused or
forbidden, push to that branch instead. .github/workflows/publish-edition.yml
fast-forwards main to any pushed claude/* branch and triggers the Pages deploy,
so the edition still publishes automatically. The owner wants every weekly
edition published; never leave one sitting unmerged on a branch.

The scheduled session has no GitHub MCP tools and the proxy blocks github.io,
so confirm the push landed with `git ls-remote origin main` matching your HEAD,
and trust Pages to deploy it (it has for every edition so far; both runs take
under a minute). Finish with a short note of what the edition did, what it
found, and what it could not find.

Publish path verified end to end on 2026-10-03: a push to a claude/* branch fast-forwarded main and deployed Pages.
