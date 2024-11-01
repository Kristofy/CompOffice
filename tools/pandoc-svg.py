#! /usr/bin/env python
"""
Pandoc filter to convert svg files to pdf as suggested at:
https://github.com/jgm/pandoc/issues/265#issuecomment-27317316
"""

__author__ = "Jerome Robert"

import mimetypes
import subprocess
import os
import sys
from pandocfilters import toJSONFilter, Str, Para, Image

fmt_to_option = {
    "latex": ("--export-filename", "pdf"),
    "beamer": ("--export-filename", "pdf"),
    # use PNG because EMF and WMF break transparency
    "docx": ("--export-filename", "png"),
    # because of IE
    "html": ("--export-filename", "png")
}


def svg_to_any(key, value, fmt, meta):
    if key == 'Image':
        if len(value) == 2:
            # before pandoc 1.16
            alt, [src, title] = value
            attrs = None
        else:
            attrs, alt, [src, title] = value
        mimet, _ = mimetypes.guess_type(src)
        option = fmt_to_option.get(fmt)
        if mimet == 'image/svg+xml' and option:
            base_name, _ = os.path.splitext(src)
            eps_name = base_name + "." + option[1]
            try:
                mtime = os.path.getmtime(eps_name)
            except OSError:
                mtime = -1
            if mtime < os.path.getmtime(src):
                cmd_line = ['inkscape', '-d', '192', option[0], eps_name, src]
                sys.stderr.write("Running %s\n" % " ".join(cmd_line))
                subprocess.call(cmd_line, stdout=sys.stderr.fileno())
            if attrs:
                return Image(attrs, alt, [eps_name, title])
            else:
                return Image(alt, [eps_name, title])


if __name__ == "__main__":
    toJSONFilter(svg_to_any)
