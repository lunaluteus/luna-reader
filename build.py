from hashlib import sha256
from pathlib import Path
import re
import struct
import zlib

site = Path("_site")
web = site / "web"
for file in ("app.js", "dark.css"):
    (web / file).write_bytes(Path(file).read_bytes())
(site / "manifest.json").write_bytes(Path("manifest.json").read_bytes())

html = (web / "viewer.html").read_text()
html, n = re.subn(
    r'(<meta\b[^>]*http-equiv="Content-Security-Policy"[^>]*content=")default-src \x27none\x27;',
    r"\1default-src 'none'; manifest-src 'self';",
    html,
    count=1,
)
if n != 1:
    raise RuntimeError("PDF.js viewer CSP changed")

html = html.replace("<title>PDF.js viewer</title>", "<title>Luna Reader</title>")
css_hash = sha256(Path("dark.css").read_bytes()).hexdigest()[:12]
js_hash = sha256(Path("app.js").read_bytes()).hexdigest()[:12]
html = html.replace(
    "</head>",
    f'<link rel="manifest" href="../manifest.json">\n'
    f'<link rel="stylesheet" href="dark.css?v={css_hash}">\n'
    f'<script src="app.js?v={js_hash}"></script>\n</head>',
    1,
)
(web / "viewer.html").write_text(html)

(site / "index.html").write_text(
    '<!doctype html><html><head><meta charset="utf-8">'
    '<title>Luna Reader</title><link rel="manifest" href="manifest.json">'
    '<meta http-equiv="refresh" content="0;url=web/viewer.html?file=">'
    '</head><body><a href="web/viewer.html?file=">Open Luna Reader</a>'
    '</body></html>\n'
)
(site / ".nojekyll").touch()

def chunk(name, data):
    return (struct.pack(">I", len(data)) + name + data
            + struct.pack(">I", zlib.crc32(name + data) & 0xFFFFFFFF))

icons = web / "icons"
icons.mkdir(exist_ok=True)
for size in (192, 512):
    pixels = bytearray()
    for y in range(size):
        pixels.append(0)
        for x in range(size):
            u, v = x / size, y / size
            color = (52, 54, 59)
            if .23 <= u <= .77 and .13 <= v <= .87:
                color = (189, 193, 200)
                if .31 <= u <= .66 and any(a <= v <= a + .025 for a in (.39, .49, .59, .69)):
                    color = (72, 77, 89)
            pixels.extend(color)
    png = (b"\x89PNG\r\n\x1a\n"
           + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0))
           + chunk(b"IDAT", zlib.compress(pixels, 9))
           + chunk(b"IEND", b""))
    (icons / f"app-{size}.png").write_bytes(png)
