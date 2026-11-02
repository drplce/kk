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

## Batch 5, 2026-11-02 16:21 UTC

| Task | State | Note |
|------|-------|------|
| T10 | likely | 22 December 1961, Brixton, Johannesburg: a contemporary Canadian Royal Commission report (archive.org 31761120610035; quote checked locally against the full text). Christmas Day 1961 is given for the first transmissions of English, Afrikaans, Springbok, South Sotho and Zulu (oldradio.com). 1 January 1962 is Radio Bantu's formal start. 1960 is the announcement and the start of tower work. 1 September 1961 rests on oldradio.com alone; the tower was not finished until December, and WRTH 1962 lists no FM. |
| T11 | partly | Radio Metro: settled, 1 September 1986 (The Star, 9 August 1986, via a US government translation on archive.org, DTIC_ADA349961, quote checked; a Durban column of mid-September already has it on air). English Service to Radio South Africa: likely effective 1 January 1986, announced 1985. Radio South Africa to SAfm: open, leaning 1996 (ESAT says 1995; the SABC relaunched its radio portfolio on 28 September 1996). Radio 5 to 5FM: "early 1980s" refuted (Rand Daily Mail January 1985 and WRTH 1985 still say Radio 5); 1992 rests on Wikipedia alone. |
| T12 | settled | 702 left medium wave on 28 June 2007 (Bizcommunity; DX Listening Digest, 30 June 2007). A transmitter fire put it on 540 kHz in February and March 2006 (the station's own archived pages). "702 Talk Radio" was the station's own name in 1998 and "Talk Radio 702" by March 2004, so the change falls between September 2002 and March 2004, not in 2007. |
| T13 | partly | East Coast Radio: the SABC sold its six regionals in September 1996 (Africultures; Mail & Guardian, August 1996). ECR's own page says 1 July 1994, which may mark the rename rather than the sale: open. Kfm's predecessor is Radio Kontrei, started by Radio Good Hope (Bizcommunity), not Good Hope itself; Kfm's launch year is open. |
| T14 | partly | Highveld in Johannesburg was on 87.60 MHz from WRTH 1965 to at least 1985, and on 94.7 by December 1998 (its own archived site); the changeover year is open. Radio Pulpit began in August 1981 (The Media Online); it was on 540 kHz at Hebron in 1985 (WRTH) and on 657 kHz by March 2005 (DX Listening Digest); the move date is open. |

Blocked for T10 to T14: polity.org.za IBA press releases (403, no Wayback copy), Google Books (captcha, not bypassed), WRTH 1986 to 2003 (lending-only). Three ICASA PDFs may settle the Pulpit, ECR and Highveld dates; local will read them next.

## Batch 6, 2026-11-02 16:24 UTC

| Task | State | Note |
|------|-------|------|
| T3 | done | T3-iba-icasa.tsv (148 rows): the IBA medium-wave plan (Government Notice 2329, Gazette 20553, 15 October 1999, Annexure C, read from its Wayback capture) with on-air dates, the IBA's own archived press releases 1996 to 2001 (1997 licence awards, the 1998 Capital Radio sale, Radio Today's FM 106.3 grant of 1996-07-23) and the IBA community-station list. T3-icasa-mw-2013.tsv (63 rows): ICASA's Q1 2013 frequency annex, Annexure C, every medium-wave assignment with its printed on-air date (read locally from the PDF, which was then deleted). Status codes OPE and SPA are kept as printed; neither document defines them. polity.org.za itself is behind a Cloudflare 403. |
| T4 | done | T4-histories.tsv (166 rows): oldradio.com (2012 capture; the live page is 404), radioheritage.com (story387, a 1953 dial table with no named source, rated low), the SABC Media Libraries blog (a service-rename timeline, the Springbok Radio series) and ESAT. Rows from gov.za come from page summaries, not verbatim text: medium, no extract. |

### Medium-wave on-air dates, the two regulators side by side

| Assignment | IBA plan 1999 | ICASA annex 2013 |
|---|---|---|
| Radio Islam, Lenasia 1548 | 1997-01-06 | 1997-01-06 |
| Chinese Radio / Arrowline Chinese, Midrand 1269 | 1996-10-11 | 1996-10-11 |
| Ligwalagwala, Welgedacht 1287 | 1978-11-23 | 1978-11-23 |
| Institute of Islamic Services, Pretoria 1584 | 1996-07-01 | 1996-07-05 |
| Radio Today 1485 | Johannesburg, 1996-06-14 | Marks Park, 1997-04-01 |
| New Panhellenic Voice | Johannesburg 1458, 1995-06-05 | Bedfordview 1422, 1997-12-19 |
| Radio Pulpit, Meyerton 657 | 1978-11-23 | 1993-01-01 |
| CapeTalk, Klipheuwel 567 | listed, see T3 | 1997-10-14 |
| Radio 702, Ga-Rankuwa 702 | 1980-06-15 | spare, no programme (702 left AM in 2007, see T12) |

The Pulpit conflict is real: the 1999 table prints 23-Nov-78 against Meyerton 657 (checked locally against the
captured HTML). Pulpit began in August 1981 (T14) and WRTH 1985 has it on 540 kHz at Hebron, so both dates
probably belong to the transmitter assignment rather than to Pulpit's use of it, but no source says so.
Please show it as open.

Other disagreements kept as separate rows: Jozi Radio (4 March 1997 release) vs Kaya FM (1 August 1997 release);
Springbok Radio launch 1 May vs 31 May 1950; the plan's community frequencies vs the IBA community list
(Chinese Radio 1269 vs 835.5, Radio Islam 1548 vs 835, Panhellenic 1458 vs 828; the 835/828 figures may be
wavelength-style typos, not checked); first SA broadcast 1923-12-29 (oldradio) vs 1923-12-18 (radioheritage);
Heart FM 2006 vs 2004 (ESAT).

Leads not read: ICASA's Final Terrestrial Broadcast Frequency Plan 2008 and the 2004 draft (PDFs, FM
assignments by site), and the IBA FM annexure fmplan1.xls (no Wayback capture).
