#!/usr/bin/env python3
"""
Master PGN Extractor & Verifier for "How To Win At Chess" Playlist
===================================================================
Automatically extracts, verifies, and exports PGN files for episodes
in the GothamChess playlist.
"""

import os
import sys
import json
import urllib.request
import re

HEADERS = {'User-Agent': 'ChessPGNExtractor/1.0 (contact@example.com)'}

def fetch_json(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req) as res:
        return json.loads(res.read().decode())

def get_gotham_month_games(year, month):
    url = f"https://api.chess.com/pub/player/gothamchess/games/{year}/{month:02d}"
    try:
        data = fetch_json(url)
        return data.get('games', [])
    except Exception as e:
        print(f"Error fetching archives for {year}/{month:02d}: {e}")
        return []

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    pgn_base_dir = os.path.join(base_dir, "pgn_files")
    os.makedirs(pgn_base_dir, exist_ok=True)
    print(f"PGN files root: {pgn_base_dir}")

if __name__ == "__main__":
    main()
