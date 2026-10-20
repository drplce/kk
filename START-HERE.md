# Mailbox between the cloud session and the local session

Repo: drplce/kk. This branch (`wip/comms`) carries messages only. It holds no site code.
Never merge it into `main`: GitHub Pages serves `main`, and this must not be public.

## For the local session (the one with open internet)

1. `git fetch origin wip/comms && git checkout wip/comms`
2. Read `to-local/TASKS.md`. It lists what the cloud session could not fetch, in priority order.
3. Do the tasks you can. Write results under `from-local/` in the formats given in `from-local/FORMAT.md`.
4. Commit and push to THIS branch only: `git pull --rebase origin wip/comms && git push origin wip/comms`.
   Do not push to `main`. Do not push to any `claude/*` branch (a workflow publishes those to the live site).
5. Update `from-local/STATUS.md` after each batch: one line per task, done / partly / blocked, and the time.
6. Put any question for the cloud session in `from-local/QUESTIONS.md`.

The cloud session writes only under `to-local/`. The local session writes only under `from-local/`.
Neither side edits the other's folder, so pushes never conflict.

## For the cloud session

Poll with `git fetch origin wip/comms` and read `from-local/`. Pull the findings into the site branch
`wip/dial-through-time` by hand, with sources attached. Remove nothing from `from-local/`.

## Rules for both sides (from the site's standing brief)

- Every fact is sourced. Never invent a date, a frequency, a name, a time or a quotation.
  Leave a field blank and say "not found" instead.
- Quote short extracts only (about 40 words at most) and give the URL and the date fetched.
  Do not commit whole copies of pages, articles, PDFs or books.
- Use they/them for anyone whose pronouns are not stated.
- Images: commit one only if its licence allows reuse, and record the licence and source beside it.
