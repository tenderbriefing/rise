#!/usr/bin/env python3
"""Create a minimal OG placeholder image."""
from struct import pack
import zlib

def create_png(path, w, h, rgb):
    def chunk(tag, data):
        return pack(">I", len(data)) + tag + data + pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    row = b"\x00" + bytes(rgb) * w
    raw = row * h
    png = (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b"")
    )
    with open(path, "wb") as f:
        f.write(png)


if __name__ == "__main__":
    create_png("public/og-rise-institute.jpg", 1200, 630, (11, 93, 59))
    print("Created public/og-rise-institute.jpg")
