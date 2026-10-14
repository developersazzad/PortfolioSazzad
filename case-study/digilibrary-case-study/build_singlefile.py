#!/usr/bin/env python3
"""Build a portable SINGLE-FILE version of the Digilibrary case study.
Inlines css/style.css, js/main.js, data/project.json and every screenshot
(base64 data-URI) into one HTML file that runs anywhere (even offline)."""
import base64, json, pathlib, re, sys

ROOT = pathlib.Path(__file__).parent
html = (ROOT / "index.html").read_text(encoding="utf-8")
css  = (ROOT / "css/style.css").read_text(encoding="utf-8")
js   = (ROOT / "js/main.js").read_text(encoding="utf-8")
data = json.loads((ROOT / "data/project.json").read_text(encoding="utf-8"))

# base64 map of every image used by the gallery / figures
img_map = {}
for p in sorted((ROOT / "assets/img").glob("*.jpg")):
    b64 = base64.b64encode(p.read_bytes()).decode()
    img_map[p.stem] = f"data:image/jpeg;base64,{b64}"

# 1) inline stylesheet
html = html.replace('<link rel="stylesheet" href="css/style.css">',
                    "<style>\n" + css + "\n</style>")

# 2) rewrite static <img src="assets/img/..."> to data URIs
def repl(m):
    key = m.group(1)
    return f'src="{img_map.get(key, m.group(0))}"'
html = re.sub(r'src="assets/img/([0-9a-z\-]+)\.jpg"', repl, html)

# 3) inject embedded data + image map, then inline the script
payload = ("<script>\nwindow.PROJECT_DATA = " + json.dumps(data, separators=(",", ":"))
           + ";\nwindow.IMG_MAP = " + json.dumps(img_map, separators=(",", ":"))
           + ";\n</script>\n<script>\n" + js + "\n</script>")
html = html.replace('<script src="js/main.js"></script>', payload)

out = ROOT / "Digilibrary-Case-Study.html"
out.write_text(html, encoding="utf-8")
print("built", out, f"{out.stat().st_size/1024:.0f} KB")
