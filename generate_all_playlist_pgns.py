#!/usr/bin/env python3
"""
Full Automated PGN Generator for GothamChess "How To Win At Chess" Playlist
=============================================================================
Processes all 33 episodes in the playlist, matches each video chapter game
against the complete game archives, generates individual and combined standard
PGN files, and outputs them to Google Drive.
"""

import json
import re
import glob
import datetime
import os

def parse_date(date_str):
    return datetime.date(int(date_str[:4]), int(date_str[4:6]), int(date_str[6:8]))

def clean_filename(text):
    text = re.sub(r'[^a-zA-Z0-9_-]', '_', text)
    return re.sub(r'_+', '_', text).strip('_')

def format_pgn(g, video_url, chapter_title, timestamp_str):
    raw_pgn = g.get('pgn', '')
    if not raw_pgn:
        # Construct basic PGN if pgn text is missing
        return None
        
    extra_headers = [
        f'[Video "{video_url}"]',
        f'[VideoChapter "{chapter_title}"]',
        f'[VideoTimestamp "{timestamp_str}"]'
    ]
    extra_block = '\n'.join(extra_headers)
    
    parts = raw_pgn.split('\n\n', 1)
    if len(parts) == 2:
        return parts[0].strip() + '\n' + extra_block + '\n\n' + parts[1].strip() + '\n'
    else:
        return raw_pgn.strip() + '\n' + extra_block + '\n'

def main():
    metadata_path = '/content/all_episodes_metadata.json'
    if not os.path.exists(metadata_path):
        print(f"Error: {metadata_path} not found.")
        return

    with open(metadata_path) as f:
        episodes = json.load(f)

    # Load all cached games
    all_games = []
    for p in sorted(glob.glob('/content/gotham_games_cache/*.json')):
        with open(p) as fp:
            all_games.extend(json.load(fp))

    print(f"Total available games in archive: {len(all_games)}")

    out_root = '/content/drive/MyDrive/chess/pgn_files'
    os.makedirs(out_root, exist_ok=True)

    master_all_pgns = []
    episode_summaries = []

    for ep_idx, ep in enumerate(episodes):
        ep_num = ep_idx + 1
        u_date = parse_date(ep['upload_date'])
        title = ep['title']
        vid_id = ep['id']
        video_url = f"https://www.youtube.com/watch?v={vid_id}"
        chapters = ep.get('chapters', [])
        
        ep_dir = os.path.join(out_root, f"Episode_{ep_num:02d}")
        os.makedirs(ep_dir, exist_ok=True)

        # Candidate games within 45 days prior to upload and 1 day after
        cand_games = []
        for g in all_games:
            t = g.get('end_time')
            if t:
                g_date = datetime.date.fromtimestamp(t)
                diff = (u_date - g_date).days
                if -1 <= diff <= 45:
                    cand_games.append((diff, g))
        cand_games.sort(key=lambda x: x[1]['end_time'])

        # Filter chapters representing games
        game_chs = [
            ch for ch in chapters
            if any(k in ch['title'].lower() for k in ['game', 'vs', 'match', 'defense', 'gambit', 'opening', 'attack', 'rating', 'boss', 'analysis'])
            and not any(k in ch['title'].lower() for k in ['intro', 'setup', 'breakdown', 'post-game', 'recap', 'conclusion', 'product', 'sale'])
        ]

        # Deduplicate multiple analysis chapters of the same game
        dedup_chs = []
        seen_nums = set()
        for ch in game_chs:
            m_num = re.search(r'(?:game|match)\s*(\d+)', ch['title'], re.IGNORECASE)
            if m_num:
                g_num = m_num.group(1)
                if g_num in seen_nums:
                    continue
                seen_nums.add(g_num)
            dedup_chs.append(ch)

        # In case no chapters were detected as games, fallback to all non-intro chapters
        if not dedup_chs and chapters:
            dedup_chs = [ch for ch in chapters if not any(k in ch['title'].lower() for k in ['intro', 'setup', 'product', 'sale'])]

        used_urls = set()
        ep_pgns = []
        ep_game_records = []

        for ch_idx, ch in enumerate(dedup_chs):
            ch_title = ch['title']
            v_start = ch['start_time']
            v_end = ch['end_time']
            time_str = f"{v_start//60:02d}:{v_start%60:02d} - {v_end//60:02d}:{v_end%60:02d}"

            # Rating
            ratings = re.findall(r'\b(\d{3,4})\b', ch_title)
            target_r = int(ratings[0]) if ratings else None

            # Opponent name in title
            m_opp = re.search(r'vs\.?\s*([a-zA-Z0-9_-]+)', ch_title, re.IGNORECASE)
            opp_name = m_opp.group(1).lower() if m_opp and not ratings else None

            best_g = None

            # 1. Match by rating
            if target_r:
                for diff, g in sorted(cand_games, key=lambda x: x[0]):
                    if g['url'] in used_urls:
                        continue
                    if g['white']['rating'] == target_r or g['black']['rating'] == target_r:
                        best_g = g
                        break

            # 2. Match by opponent username
            if not best_g and opp_name:
                for diff, g in sorted(cand_games, key=lambda x: x[0]):
                    if g['url'] in used_urls:
                        continue
                    if opp_name in g['white']['username'].lower() or opp_name in g['black']['username'].lower():
                        best_g = g
                        break

            # 3. Match by batch subscriber games
            if not best_g:
                sub_candidates = [
                    g for diff, g in sorted(cand_games, key=lambda x: x[0])
                    if g['url'] not in used_urls and (g['white']['rating'] < 2400 or g['black']['rating'] < 2400)
                ]
                if ch_idx < len(sub_candidates):
                    best_g = sub_candidates[ch_idx]

            if best_g:
                used_urls.add(best_g['url'])
                formatted = format_pgn(best_g, video_url, ch_title, time_str)
                if formatted:
                    w = best_g['white']['username']
                    b = best_g['black']['username']
                    w_elo = best_g['white']['rating']
                    b_elo = best_g['black']['rating']
                    res = best_g.get('pgn', '').split('[Result "')[1].split('"]')[0] if '[Result "' in best_g.get('pgn', '') else '*'
                    eco = best_g.get('pgn', '').split('[ECO "')[1].split('"]')[0] if '[ECO "' in best_g.get('pgn', '') else 'N/A'
                    
                    filename = f"{ch_idx+1:02d}_{clean_filename(w)}_vs_{clean_filename(b)}.pgn"
                    filepath = os.path.join(ep_dir, filename)
                    with open(filepath, 'w') as f:
                        f.write(formatted)
                        
                    ep_pgns.append(formatted.strip())
                    master_all_pgns.append(formatted.strip())
                    
                    ep_game_records.append({
                        'idx': ch_idx + 1,
                        'chapter': ch_title,
                        'time': time_str,
                        'white': f"{w} ({w_elo})",
                        'black': f"{b} ({b_elo})",
                        'result': res,
                        'eco': eco,
                        'file': filename
                    })

        # Write episode combined PGN
        if ep_pgns:
            comb_path = os.path.join(ep_dir, f"Episode_{ep_num:02d}_all_games.pgn")
            with open(comb_path, 'w') as f:
                f.write('\n\n'.join(ep_pgns) + '\n')

        episode_summaries.append({
            'ep_num': ep_num,
            'title': title,
            'url': video_url,
            'upload_date': ep['upload_date'],
            'games': ep_game_records
        })

        print(f"Generated Episode {ep_num:02d}: {len(ep_pgns)} games saved in {ep_dir}")

    # Write Master Combined PGN for the entire playlist
    master_path = os.path.join(out_root, "all_33_episodes_games.pgn")
    with open(master_path, 'w') as f:
        f.write('\n\n'.join(master_all_pgns) + '\n')
    print(f"\nSaved MASTER combined PGN with {len(master_all_pgns)} total games to {master_path}")

    # Save summary metadata JSON for README generator
    with open('/content/pgn_generation_summary.json', 'w') as f:
        json.dump(episode_summaries, f, indent=2)

if __name__ == '__main__':
    main()
