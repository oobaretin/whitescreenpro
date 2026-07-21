#!/usr/bin/env python3
"""Generate PWA icons (192 and 512) using only the Python standard library."""

import struct
import zlib
from pathlib import Path

PUBLIC = Path(__file__).resolve().parent.parent / "public"
BG = (255, 255, 255)
FRAME = (26, 26, 26)
ACCENT = (37, 99, 235)


def _chunk(tag: bytes, data: bytes) -> bytes:
    crc = zlib.crc32(tag + data) & 0xFFFFFFFF
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", crc)


def _write_png(path: Path, size: int) -> None:
    pixels = bytearray()
    margin = max(4, size // 16)
    inner = size - margin * 2
    cx = cy = size // 2
    r = inner // 4

    for y in range(size):
        row = bytearray([0])
        for x in range(size):
            color = BG
            if margin <= x < size - margin and margin <= y < size - margin:
                color = FRAME
            # Inner white "screen"
            im = margin + max(2, size // 32)
            if im <= x < size - im and im <= y < size - im:
                color = BG
            # Blue accent dot (bottom-right of inner screen)
            dot_cx = size - im - r
            dot_cy = size - im - r
            if (x - dot_cx) ** 2 + (y - dot_cy) ** 2 <= r * r:
                color = ACCENT
            row.extend(color)
        pixels.extend(row)

    compressed = zlib.compress(bytes(pixels), 9)
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0)

    with path.open("wb") as f:
        f.write(b"\x89PNG\r\n\x1a\n")
        f.write(_chunk(b"IHDR", ihdr))
        f.write(_chunk(b"IDAT", compressed))
        f.write(_chunk(b"IEND", b""))


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    for size, name in ((192, "icon-192.png"), (512, "icon-512.png")):
        out = PUBLIC / name
        _write_png(out, size)
        print(f"Wrote {out} ({size}x{size})")


if __name__ == "__main__":
    main()
