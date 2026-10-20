# How to deliver results

One file per task, named `from-local/T<number>-<short-name>.tsv` (tab-separated, UTF-8, header row).

Frequencies and facts (tasks 1 to 4, 10 to 15) use these columns:
station, place, band (AM kHz / FM MHz / SW kHz), frequency as printed, year_from, year_to, event
(launch, rename, frequency change, format change, closure, ownership change, listing), note,
source_url, page_or_section, extract (40 words at most, in quotation marks), fetched_on (date), confidence.

Schedules (tasks 5 to 8) use these columns:
station, years_from, years_to, days (Mon-Fri / Sat / Sun), start (HH:MM, 24-hour), end (HH:MM),
programme, presenter, note, source_url, extract, fetched_on, confidence.

Confidence: high = a primary or printed listing, or two independent sources; medium = one secondary
source; low = a weak or unsourced page. Say where sources disagree rather than choosing.

Also keep `from-local/STATUS.md` (one line per task: done / partly / blocked, with the time) and
`from-local/QUESTIONS.md`. Images go in `from-local/images/` only with a licence note.
