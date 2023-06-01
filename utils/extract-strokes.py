#!/usr/bin/env python3

# e.g.
# cat exports/f03-03-wall.svg | utils/extract-strokes.py > exports/f03-03-wall-strokes.csv

import sys

color_map = {
  "black": "black",
  "#ad272a": "red",
  "#5f8fd3": "aqua",
  "#b2db1e": "yellow",
}

def main(str):
  for match in str.split('stroke="'):
    color = color_map.get(match.split('"')[0])
    if (color):
      print(color)

main(sys.stdin.read())
