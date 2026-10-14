"""Builds a fully self-contained single-file version of the case study:
   inlines css/style.css, js/main.js and rewrites every assets/img/*.jpg to a base64 data URI."""
import base64, re, pathlib

ROOT = pathlib.Path(__file__).parent
html = (ROOT / "index.html").read_text(encoding="utf-8")
css  = (ROOT / "css/style.css").read_text(encoding="utf-8")
js   = (ROOT / "js/main.js").read_text(encoding="utf-8")

def data_uri(rel):
    p = ROOT / rel
    b64 = base64.b64encode(p.read_bytes()).decode()
    return f"data:image/jpeg;base64,{b64}"

# 1. images (html src attrs + js string literals)
imgs = sorted(set(re.findall(r"assets/img/[\w\-.]+\.jpg", html + js)))
for rel in imgs:
    uri = data_uri(rel)
    html = html.replace(rel, uri)
    js   = js.replace(rel, uri)

# 2. inline css & js
html = html.replace('<link rel="stylesheet" href="css/style.css">',
                    "<style>\n" + css + "\n</style>")
html = html.replace('<script src="js/main.js"></script>',
                    "<script>\n" + js + "\n</script>")

out = ROOT / "shopable-reel-case-study.html"
out.write_text(html, encoding="utf-8")
print("wrote", out, round(out.stat().st_size / 1e6, 2), "MB · images inlined:", len(imgs))
