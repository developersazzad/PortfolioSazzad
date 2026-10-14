# ============================================================
# SystemEasy marketing posters — 2x 1920x1080 + 2x 1080x1440 (3:4)
# Composed with Pillow: brand gradient, 3D-framed real screenshots,
# feature chips, metrics and full credit/URL footer.
# NOTE: PIL Draw() replaces pixels (no alpha blend), so all
# "glass" fills are pre-blended solid colours.
# Author: Sazzad Hossain (@developersazzad)
# ============================================================
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os

BASE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(BASE, "assets", "img")
OUT = os.path.join(BASE, "assets", "posters")
os.makedirs(OUT, exist_ok=True)

FB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

def F(size, bold=True):
    return ImageFont.truetype(FB if bold else FR, size)

V1, V2 = (27, 15, 58), (58, 12, 110)
ORANGE = (255, 90, 31)
GREEN = (0, 166, 81)
VIOLET = (124, 58, 237)
VIOLET_L = (168, 85, 247)
CYAN = (34, 211, 238)
GOLD = (251, 191, 36)
RED = (239, 59, 87)
WHITE = (255, 255, 255)
MUTED = (205, 193, 235)
DARK = (13, 6, 32)
GLASS = (66, 44, 106)          # ~10% white over violet bg
GLASS_LINE = (118, 98, 158)    # ~25% white outline
GLASS_DARK = (24, 12, 44)      # dark chip glass

def bg(w, h, c1=V1, c2=V2):
    im = Image.new("RGB", (w, h), c1)
    d = ImageDraw.Draw(im)
    for y in range(h):
        t = y / max(1, h - 1)
        d.line([(0, y), (w, y)], fill=tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3)))
    ov = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    for x in range(0, w, 64):
        od.line([(x, 0), (x, h)], fill=(255, 255, 255, 9), width=1)
    for y in range(0, h, 64):
        od.line([(0, y), (w, y)], fill=(255, 255, 255, 9), width=1)
    return Image.alpha_composite(im.convert("RGBA"), ov)

def glow(im, cx, cy, rx, ry, color, alpha=90):
    ov = Image.new("RGBA", im.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    od.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=color + (alpha,))
    ov = ov.filter(ImageFilter.GaussianBlur(140))
    return Image.alpha_composite(im, ov)

def rrect(d, box, r, fill=None, outline=None, width=1):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)

def shadow_paste(base, layer, box, offset=(0, 18), blur=28, alpha=160):
    sh = Image.new("RGBA", base.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    x0, y0 = box[0] + offset[0], box[1] + offset[1]
    sd.rounded_rectangle([x0, y0, x0 + layer.width, y0 + layer.height], radius=24, fill=(0, 0, 0, alpha))
    sh = sh.filter(ImageFilter.GaussianBlur(blur))
    base = Image.alpha_composite(base, sh)
    base.alpha_composite(layer, box[:2])
    return base

def frame_shot(path, width, angle=0.0, radius=22, border=6):
    im = Image.open(path).convert("RGB")
    ratio = width / im.width
    im = im.resize((width, int(im.height * ratio)), Image.LANCZOS)
    card = Image.new("RGB", (im.width + border * 2, im.height + border * 2), (240, 238, 250))
    card.paste(im, (border, border))
    mask = Image.new("L", card.size, 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle([0, 0, card.width - 1, card.height - 1], radius=radius, fill=255)
    card = card.convert("RGBA")
    card.putalpha(mask)
    if angle:
        card = card.rotate(angle, expand=True, resample=Image.BICUBIC)
    return card

def text_w(d, s, f):
    b = d.textbbox((0, 0), s, font=f)
    return b[2] - b[0]

def draw_text(d, xy, s, f, fill=WHITE, anchor="la"):
    d.text(xy, s, font=f, fill=fill, anchor=anchor)

def wrap(d, s, f, maxw):
    words, lines, cur = s.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if text_w(d, t, f) <= maxw:
            cur = t
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

def logo(d, x, y, s=64):
    rrect(d, [x, y, x + s, y + s], 16, fill=VIOLET)
    rrect(d, [x + 4, y + 4, x + s - 4, y + s - 4], 13, outline=(170, 128, 245), width=2)
    draw_text(d, (x + s / 2, y + s / 2 + 2), "SE", F(int(s * 0.42)), WHITE, "mm")
    d.ellipse([x + s - 8, y + s - 8, x + s + 4, y + s + 4], fill=GREEN)

def mono_tile(d, x, y, s, code, color):
    rrect(d, [x, y, x + s, y + s], 14, fill=color)
    rrect(d, [x + 3, y + 3, x + s - 3, y + s - 3], 11,
          outline=tuple(min(255, c + 70) for c in color), width=2)
    draw_text(d, (x + s / 2, y + s / 2 + 1), code, F(int(s * 0.30)), WHITE, "mm")

def footer_bar(im, left, right):
    d = ImageDraw.Draw(im)
    w, h = im.size
    d.rectangle([0, h - 84, w, h], fill=DARK)
    d.line([(0, h - 84), (w, h - 84)], fill=ORANGE, width=3)
    draw_text(d, (40, h - 42), left, F(26), WHITE, "lm")
    draw_text(d, (w - 40, h - 42), right, F(26), MUTED, "rm")
    return im

def play_badge(d, cx, cy, r):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 0, 0))
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(255, 130, 120), width=4)
    p = r * 0.42
    d.polygon([(cx - p * 0.65, cy - p), (cx - p * 0.65, cy + p), (cx + p * 0.95, cy)], fill=WHITE)

# ============================================================
# POSTER 1 — 1920x1080 hero promo
# ============================================================
W, H = 1920, 1080
im = bg(W, H)
im = glow(im, 1500, 260, 620, 420, VIOLET_L, 70)
im = glow(im, 240, 900, 500, 340, ORANGE, 42)
d = ImageDraw.Draw(im)

rrect(d, [W - 470, 54, W - 70, 122], 34, fill=ORANGE)
draw_text(d, ((W - 470 + W - 70) / 2, 88), "FREE POS SYSTEM", F(30), WHITE, "mm")

logo(d, 90, 74, 78)
draw_text(d, (190, 96), "SystemEasy", F(58), WHITE)
draw_text(d, (190, 156), "by Sazzad Hossain  ·  @developersazzad", F(26), MUTED)

draw_text(d, (90, 248), "Complete Shop, Business", F(58), WHITE)
draw_text(d, (90, 318), "& Inventory Management", F(58), WHITE)
draw_text(d, (90, 388), "System — on Laravel.", F(58), ORANGE)
draw_text(d, (90, 470), "Multi-tenant POS · double-entry accounting · FIFO", F(26), MUTED)
draw_text(d, (90, 504), "inventory · restaurant suite · RBAC · 141 currencies.", F(26), MUTED)

chips = [("POS", "POS Terminal", ORANGE), ("INV", "Multi-Location Stock", GREEN),
         ("ACC", "Double-Entry Books", VIOLET), ("PUR", "Purchase & Supply", CYAN),
         ("RES", "Restaurant + KOT", RED), ("ACL", "RBAC & Audit Log", GOLD),
         ("SMS", "Currency / Tax / SMS", VIOLET_L)]
cx, cy = 90, 560
for code, label, color in chips:
    lw = text_w(d, label, F(22)) + 88
    if cx + lw > 1000:
        cx, cy = 90, cy + 52
    rrect(d, [cx, cy, cx + lw, cy + 40], 13, fill=GLASS, outline=GLASS_LINE, width=2)
    mono_tile(d, cx, cy, 40, code, color)
    draw_text(d, (cx + 54, cy + 20), label, F(22), WHITE, "lm")
    cx += lw + 12

metrics = [("69", "DB Tables"), ("141", "Currencies"), ("81", "Permissions"), ("<50ms", "Checkout")]
for i, (n, lab) in enumerate(metrics):
    x = 90 + i * 232
    rrect(d, [x, 856, x + 212, 962], 18, fill=GLASS, outline=GLASS_LINE, width=2)
    draw_text(d, (x + 106, 896), n, F(44), ORANGE if i == 3 else WHITE, "mm")
    draw_text(d, (x + 106, 938), lab.upper(), F(19), MUTED, "mm")

shot = frame_shot(os.path.join(IMG, "screen-dashboard.png"), 850, angle=-3)
im = shadow_paste(im, shot, (1010, 330))
d = ImageDraw.Draw(im)
rrect(d, [1080, 262, 1520, 318], 28, fill=GREEN)
draw_text(d, (1300, 290), "100% STOCK ACCURACY", F(26), WHITE, "mm")

footer_bar(im, "se.wedevspro.com   ·   demo login: admin / admin123",
           "youtube.com/@sazzadhossain01   ·   wa.me/8801877856951")
im.convert("RGB").save(os.path.join(OUT, "poster-1-1920x1080.png"), optimize=True)

# ============================================================
# POSTER 2 — 1920x1080 modules + screens
# ============================================================
im = bg(W, H, (20, 9, 44), (66, 10, 96))
im = glow(im, 960, 120, 800, 300, VIOLET_L, 60)
d = ImageDraw.Draw(im)
logo(d, 90, 60, 64)
draw_text(d, (176, 76), "SystemEasy", F(44), WHITE)
draw_text(d, (W - 90, 92), "FREE POS MANAGEMENT SYSTEM", F(26), ORANGE, "rm")

draw_text(d, (90, 176), "One Platform. Seven Power Modules.", F(64), WHITE)
draw_text(d, (90, 258), "Everything a retail chain, wholesale hub or restaurant needs — in a single Laravel codebase.", F(27), MUTED)

mods = [("POS", "High-Speed POS Terminal", "Split pay · shifts · barcode · thermal print", ORANGE),
        ("INV", "Multi-Location Inventory", "Variants · combos · batch & expiry · racks", GREEN),
        ("ACC", "Double-Entry Accounting", "Auto ledger · balance sheet · P&L · cash flow", VIOLET),
        ("PUR", "Purchase & Supply Chain", "PO · GRN · returns · supplier dues · FIFO", CYAN),
        ("RES", "Restaurant Suite", "Tables · KOT · delivery & service charges", RED),
        ("ACL", "RBAC & Audit Trail", "81+ permissions · roles · activity log", GOLD),
        ("CUR", "Currency, Tax & SMS", "141 currencies · VAT/GST · Twilio/Nexmo", VIOLET_L)]
tw, th, gap = 420, 190, 18
x0, y0 = 90, 322
for i, (code, name, desc, color) in enumerate(mods):
    r, c = divmod(i, 4)
    x, y = x0 + c * (tw + gap), y0 + r * (th + gap)
    rrect(d, [x, y, x + tw, y + th], 20, fill=GLASS, outline=GLASS_LINE, width=2)
    mono_tile(d, x + 22, y + 22, 56, code, color)
    for j, ln in enumerate(wrap(d, name, F(24), tw - 118)[:2]):
        draw_text(d, (x + 96, y + 28 + j * 30), ln, F(24), WHITE)
    for j, ln in enumerate(wrap(d, desc, F(20), tw - 50)):
        draw_text(d, (x + 24, y + 102 + j * 26), ln, F(20), MUTED)
x, y = x0 + 3 * (tw + gap), y0 + (th + gap)
rrect(d, [x, y, x + tw, y + th], 20, fill=ORANGE)
draw_text(d, (x + 30, y + 46), "69 tables · 141 currencies", F(26), WHITE)
draw_text(d, (x + 30, y + 86), "81 permissions · <50ms", F(26), WHITE)
draw_text(d, (x + 30, y + 126), "100% uptime · free", F(26), WHITE)

shots = ["screen-pos.png", "screen-profit.png", "screen-login.png"]
sx = 90
for p in shots:
    s = frame_shot(os.path.join(IMG, p), 480, angle=0, border=5)
    im = shadow_paste(im, s, (sx, 752), offset=(0, 12), blur=18, alpha=140)
    sx += 600
d = ImageDraw.Draw(im)
footer_bar(im, "SystemEasy — developed by Sazzad Hossain (@developersazzad)",
           "se.wedevspro.com   ·   full playlist on YouTube")
im.convert("RGB").save(os.path.join(OUT, "poster-2-1920x1080.png"), optimize=True)

# ============================================================
# POSTER 3 — 1080x1440 (3:4) vertical marketing
# ============================================================
W, H = 1080, 1440
im = bg(W, H, (23, 10, 50), (70, 12, 104))
im = glow(im, 880, 200, 500, 360, VIOLET_L, 70)
im = glow(im, 150, 1250, 420, 300, ORANGE, 46)
d = ImageDraw.Draw(im)
logo(d, 70, 70, 66)
draw_text(d, (156, 88), "SystemEasy", F(46), WHITE)
draw_text(d, (W - 70, 103), "FREE POS", F(28), ORANGE, "rm")

draw_text(d, (70, 200), "Run Your Entire", F(74), WHITE)
draw_text(d, (70, 284), "Business From", F(74), WHITE)
draw_text(d, (70, 368), "One Counter.", F(74), ORANGE)

shot = frame_shot(os.path.join(IMG, "screen-pos.png"), 940, angle=2)
im = shadow_paste(im, shot, (70, 486))
d = ImageDraw.Draw(im)

bullets = ["High-speed POS with split payment & thermal print",
           "Multi-location inventory with FIFO batch costing",
           "True double-entry accounting — audit-ready books",
           "Restaurant tables, KOT & delivery service charges",
           "81-permission RBAC with full audit trail",
           "141 currencies, VAT/GST taxes & SMS invoices"]
by = 1000
for b in bullets:
    d.ellipse([74, by + 4, 96, by + 26], fill=GREEN)
    draw_text(d, (85, by + 15), "✓", F(15), WHITE, "mm")
    draw_text(d, (114, by + 15), b, F(26), WHITE, "lm")
    by += 48

rrect(d, [70, 1316, 560, 1388], 18, fill=ORANGE)
draw_text(d, (315, 1352), "LIVE DEMO  ·  se.wedevspro.com", F(25), WHITE, "mm")
rrect(d, [586, 1316, 1010, 1388], 18, fill=GLASS, outline=GLASS_LINE, width=2)
draw_text(d, (798, 1352), "@developersazzad", F(25), WHITE, "mm")
d.line([(0, 1416), (W, 1416)], fill=ORANGE, width=3)
draw_text(d, (70, 1428), "Developed by Sazzad Hossain — Chattogram, Bangladesh", F(22), MUTED, "lm")
im.convert("RGB").save(os.path.join(OUT, "poster-3-1080x1440.png"), optimize=True)

# ============================================================
# POSTER 4 — 1080x1440 (3:4) tutorial playlist
# ============================================================
im = bg(W, H, (16, 7, 36), (52, 10, 88))
im = glow(im, 200, 180, 460, 320, RED, 55)
im = glow(im, 900, 1300, 460, 320, VIOLET_L, 60)
d = ImageDraw.Draw(im)

rrect(d, [70, 66, 268, 134], 18, fill=(255, 0, 0))
play_badge(d, 116, 100, 24)
draw_text(d, (156, 100), "PLAYLIST", F(29), WHITE, "lm")
draw_text(d, (W - 70, 100), "SystemEasy", F(36), WHITE, "rm")

draw_text(d, (70, 184), "Learn SystemEasy", F(66), WHITE)
draw_text(d, (70, 262), "End-to-End on", F(66), WHITE)
draw_text(d, (70, 340), "YouTube.", F(66), ORANGE)
draw_text(d, (70, 436), "Official tutorial playlist — installation to daily operation,", F(26), MUTED)
draw_text(d, (70, 470), "every module, straight from the developer.", F(26), MUTED)

covers = [("screen-dashboard.png", "Ep.01 · Introduction & dashboard tour"),
          ("screen-pos.png", "Ep.06 · Sales & POS payments"),
          ("screen-login.png", "Ep.05 · User Management & roles")]
cy = 540
for idx, (p, cap) in enumerate(covers):
    s = frame_shot(os.path.join(IMG, p), 760, angle=0, border=5)
    im = shadow_paste(im, s, (160, cy), offset=(0, 12), blur=18, alpha=150)
    d = ImageDraw.Draw(im)
    cw = text_w(d, cap, F(23)) + 40
    rrect(d, [176, cy + 16, 176 + cw, cy + 62], 12, fill=GLASS_DARK, outline=GLASS_LINE, width=2)
    draw_text(d, (196, cy + 39), cap, F(23), WHITE, "lm")
    if idx == len(covers) - 1:
        play_badge(d, 160 + s.width / 2, cy + s.height / 2 + 20, 46)
    cy += 210

rrect(d, [70, 1330, 1010, 1396], 18, fill=ORANGE)
draw_text(d, (540, 1363), "WATCH NOW  ·  youtube.com/@sazzadhossain01", F(26), WHITE, "mm")
d.line([(0, 1416), (W, 1416)], fill=ORANGE, width=3)
draw_text(d, (70, 1428), "Sazzad Hossain · @developersazzad · wa.me/8801877856951", F(22), MUTED, "lm")
im.convert("RGB").save(os.path.join(OUT, "poster-4-1080x1440.png"), optimize=True)

for f in sorted(os.listdir(OUT)):
    p = os.path.join(OUT, f)
    print(f, Image.open(p).size, os.path.getsize(p) // 1024, "KB")
