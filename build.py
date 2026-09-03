#!/usr/bin/env python3
"""Assemble the site.

Reads src/shell.html, src/pages.json and src/sections/*.html and writes one
HTML file per page into the repository root, which GitHub Pages serves.

    python3 build.py

Placeholders in the shell:
  {{title}} {{description}} {{slug}} {{spine}} {{edition}} {{content}}
  {{current:<slug>}}  -> ' aria-current="page"' on the matching nav link
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
SECTIONS = SRC / "sections"


def main() -> int:
    shell = (SRC / "shell.html").read_text(encoding="utf-8")
    config = json.loads((SRC / "pages.json").read_text(encoding="utf-8"))
    edition = config["edition"]
    written = []
    for page in config["pages"]:
        chunks = []
        for name in page["sections"]:
            path = SECTIONS / f"{name}.html"
            if not path.exists():
                print(f"error: missing section src/sections/{name}.html (page {page['slug']})", file=sys.stderr)
                return 1
            chunks.append(path.read_text(encoding="utf-8").rstrip("\n"))
        content = "\n\n  <hr class=\"rule\">\n\n".join(chunks) if page.get("rules", True) else "\n\n".join(chunks)
        html = shell
        html = html.replace("{{title}}", page["title"])
        html = html.replace("{{description}}", page["description"])
        html = html.replace("{{slug}}", page["slug"])
        html = html.replace("{{spine}}", page["spine"])
        html = html.replace("{{edition}}", edition)
        html = html.replace("{{content}}", content)
        html = re.sub(
            r"\{\{current:([a-z0-9-]+)\}\}",
            lambda m: ' aria-current="page"' if m.group(1) == page["slug"] else "",
            html,
        )
        leftover = re.findall(r"\{\{[^}]+\}\}", html)
        if leftover:
            print(f"error: unresolved placeholders in {page['file']}: {leftover}", file=sys.stderr)
            return 1
        (ROOT / page["file"]).write_text(html, encoding="utf-8")
        written.append(f"{page['file']} ({len(html):,} bytes)")
    print("built:", ", ".join(written))
    return 0


if __name__ == "__main__":
    sys.exit(main())
