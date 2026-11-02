# Status

Times are UTC. Newest batch last.

## Batch 0, 2026-10-23 00:40 UTC: started

| Task | State | Note |
|------|-------|------|
| T1 | in progress | Wireless World "Guide to Broadcasting Stations" (17 editions, 1948 to 1998, worldradiohistory.com): no use. For South Africa they list shortwave only; their MW and FM tables cover Europe. The WRTH itself is not on worldradiohistory.com, but archive.org has open OCR text of every edition 1947 to 1970 (except 1954), and of 1975, 1977, 1985, 2005, 2009 and 2014. Each has a South Africa section with MW (and from the 1960s FM) tables by site and service. Being transcribed now, with a kHz-by-metres check on every OCR'd frequency. 1980, 1990, 1995 and 2000 editions are lending-only on archive.org. |
| T2 | in progress | |
| T3 | in progress | |
| T4 | in progress | |
| T5 | in progress | |
| T6 | in progress | |
| T7 | in progress | |
| T8 | in progress | |
| T9 | in progress | No image will be committed unless its licence allows reuse. |
| T10 to T14 | in progress | |
| T15 | in progress | |

## Batch 1, 2026-10-23 01:10 UTC

| Task | State | Note |
|------|-------|------|
| T2 | done | T2-wikipedia.tsv, 323 rows from the raw wikitext of each page; the footnote behind each date is in the note. Not on Wikipedia at all: Radio in South Africa, History of broadcasting in South Africa, Radio Highveld, Radio Good Hope, Radio Port Natal, Radio Bop, Radio Today (SA), Mix 93.8. No page gives a frequency for Springbok Radio, Radio Orion, Radio 5's medium wave or Radio Highveld at launch. Capital Radio 604 transmitted on 603 kHz. Disagreements kept as separate rows (FM start 1961-09-01 vs 1961-12-22; YFM 1995 vs 1997; Radio Bop 1976 vs 1983; Radio Suid-Afrika 1985 vs 1986). |
| All others | in progress | |

## Batch 2, 2026-10-23 01:20 UTC

| Task | State | Note |
|------|-------|------|
| T5 | done | T5-springbok-schedules.tsv (105 rows) and T5-quiz-names.tsv (15 rows). The weekday block pattern (breakfast 05:00 to 08:30, news 19:00 to 19:15) is on Wikipedia only, unfootnoted and undated, so years are blank; OTRCAT gives breakfast 05:00 to 08:00 (kept as a disagreement). From 1985-07-01 Springbok ran 05:00 to 18:30 (ESAT). Squad Cars, Taxi!, Challenge of Space and The Avengers placed by day and time; Pick a Box has no time in any reliable source. Essay names: "21" exists (as "Twenty-One", sponsored by Drive and later Skip detergent) and "Venture" exists (1967 to June 1985, quizmaster Kim Shippey, host Neville Dawson). Shippey also co-hosted the original Pick a Box. Not found anywhere: "Just the Job", "Find the Job", "Skip show 22", Mik Boaty, Le'vil Causson, O'Bryne (nearest: the actor Paddy O'Byrne, no quiz role), and a producer surnamed Fat called Pigman. A "Surf Show 21" appears only in a search snippet from a forum page that returns 403 and has no Wayback copy. |

## Batch 3, 2026-11-02 16:02 UTC

Local stopped on 2026-10-23 when its usage limit ran out, and its scratch files were lost; T1, T3, T4 and
T6 to T15 were restarted on 2026-11-02. Tasks 16 to 19 are accepted with one limit set by the owner: published
descriptions of Pigman Fat as a broadcaster only, and no searching for or recording of relatives.

| Task | State | Note |
|------|-------|------|
| T1 | partly | Two of three spans in: T1-wrth-1947-1959.tsv (362 rows) with T1-wrth-hours-1947-1959.tsv (226), and T1-wrth-1985-2014.tsv (1,094 rows) with T1-wrth-hours-1985-2014.tsv (75). The span 1960 to 1977 follows in the next batch. Source: the World Radio (TV) Handbook OCR text on archive.org, each row citing the item page and OCR line. Every MW row with a printed wavelength passed a kHz x metres check (within 1.5%); failures are marked "OCR doubtful", confidence low, value as printed. |
| T2, T5 | done, trimmed | Extracts in T2 and T5 cut so that no source carries more than 40 quoted words across all from-local files (the rule in START-HERE). The facts are unchanged. |

### How to read T1

- Medium-wave tables for South Africa exist from WRTH 1951. 1947 to 1950 list shortwave only. Springbok Radio
  first appears in WRTH 1950-1951 (Johannesburg 971 and 1025, Pretoria 863, Durban 989 kc/s; Bloemfontein and
  Port Elizabeth "Starts Dec. 1950"). No FM in any edition to 1959.
- Column order checked: WRTH 2005 Johannesburg gives SAfm 105.1, Radio 2000 99.7, 5FM 98.0, Metro FM 96.4,
  which match dial-data.js from other sources.
- Change marks: please draw one only where the change is high confidence and holds in at least two
  editions. Single-edition swings are OCR or table noise; WRTH 1956, for one, reverts to older values and is
  flagged "disagrees with WRTH 1955 and 1957".
- WRTH 1951 to 1953 print two unnamed Johannesburg rows; they are mapped to West Rand and East Rand by
  position only (said in each note). 1955 and 1956 rows are medium because the column header is lost.
- No WRTH row records a rename. Gagasi FM (2009) and Heart 104.9 (2009) share the PO Box and phone numbers of
  the 2005 "Radio P4" entries, so they are probably P4 renamed, but the book does not say so; those rows are
  listings with the inference in the note. For a sourced date, use T2 (P4 became Heart 104.9; P4 began July 1997).
- Times in the hours files are as printed, not converted. WRTH 1947 to 1950 state GMT; 1952 to 1959 state no
  basis but continue the GMT series (03.00 weekday starts only fit GMT); 1951's main body runs exactly two
  hours later than its own corrections page, so it looks like local time; 1985 to 2014 are UTC. South Africa
  is UTC+2 with no summer time. Each row's note gives its basis.
- "W." in WRTH means weekdays and appears to include Saturday (WRTH 1954 prints a Saturday exception beside a
  W. entry). It is kept as "Weekdays" in 1947 to 1959 and never mapped to Mon-Fri.
- Table rows carry no extract (the OCR line is the citation); only narrative lines, such as "Starts Dec.
  1950", are quoted.
- WRTH editions 1978 to 1984, 1986 to 2004 (bar 1985), 2006 to 2008 and 2010 to 2013 are lending-only on
  archive.org and were not read.

## Batch 4, 2026-11-02 16:07 UTC

| Task | State | Note |
|------|-------|------|
| T1 | done | Third span in: T1-wrth-1960-1977.tsv (2,388 rows) and T1-wrth-hours-1960-1977.tsv (837). With batch 3, T1 now covers every open edition from 1947 to 1970, then 1975, 1977, 1985, 2005, 2009 and 2014. Check: the 1961 table was read by hand locally and all twelve dial-city cells match the file. |

### How to read the 1960 to 1977 span

- 1960 to 1962: medium wave only, twelve sites, with wavelengths (all checked). First FM in WRTH 1963
  (Johannesburg, Welverdiend, Rustenburg, Pretoria, and the Bantu FM service); WRTH 1963 prints no FM start date.
- Radio Highveld and Radio Good Hope are first named in WRTH 1966, Radio Port Natal in 1968 (the regional
  column reads "Reg. Comm." in 1965 and "(plann.)" at Welverdiend and Durban in 1967). Radio 5 is first named in
  1977, with a medium-wave column and a planned move to shortwave.
- Changes seen in two or more editions: East London MW 1025/1151/908 became 683/791/602 in 1967; Cape Town FM was
  re-planned between 1970 and 1975 (Constantiaberg 89.49/105.32/97.40 to 93.45/97.41/105.32); Pretoria
  Highveld 90.01 became 90.35 by 1975; the MW network shrank from twelve sites to eight by 1977.
- Johannesburg and Pretoria Afrikaans FM: 1963 prints 91.56 and 104.80, 1964 and 1965 print 103.42 and 96.89.
  Kept as medium rows with "disagrees with" notes. Differences of 0.02 MHz or less are print variation.
- Units as printed: kc/s and Mc to 1967, kHz and MHz from 1968.
- Times are GMT as printed (add two hours for South African time). In this span "W." is read as Monday to
  Saturday and split into Mon-Fri and Sat rows, said in each note; the 1947 to 1959 file keeps "Weekdays"
  as printed. Treat both as the same unknown: weekdays, probably including Saturday. "All Night (Sun 04.00)"
  is read as Saturday night running to 04:00 Sunday, an interpretation flagged in the notes.
- Not in the OCR: 1970 programme hours, 1970 Radio Bantu FM table, the 1975 MW table and the 1975 Durban
  (Alverstone) FM row. 147 rows are "OCR doubtful" (confidence low), 29 of them in the three dial cities.
