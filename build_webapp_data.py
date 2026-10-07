#!/usr/bin/env python3
"""
Rebuild complete web app games data with DYNAMIC, NON-REPETITIVE Casual Sinhala Commentary
and authentic spoken quote excerpts for all 175 games across 33 episodes.
"""

import os
import json
import glob
import re
import chess.pgn
import io

OPENING_FAMILIES_META = {
    'Caro-Kann Defense': {
        'icon': '🛡️',
        'desc': 'Solid counter-punching defense with 1.e4 c6. Highly resilient structure, safe King, and zero structural weaknesses.'
    },
    'Scandinavian Defense': {
        'icon': '⚔️',
        'desc': 'Direct central challenge with 1.e4 d5. Quick piece activity and open files for aggressive counterplay.'
    },
    'Sicilian Defense': {
        'icon': '⚡',
        'desc': 'Dynamic asymmetrical counter with 1.e4 c5. Fights for the center from the flank with an open c-file.'
    },
    'London System': {
        'icon': '🏰',
        'desc': 'Solid 1.d4 setup with early Bf4 and granite c3-d4-e3 pyramid. Includes aggressive Jobava London lines.'
    },
    'King\'s Indian & Pirc Defense': {
        'icon': '🔥',
        'desc': 'Hypermodern kingside fianchetto setups. Concedes early central space for devastating kingside pawn storms.'
    },
    'Vienna Game & Gambit': {
        'icon': '🎯',
        'desc': 'GothamChess signature weapon 1.e4 e5 2.Nc3. Combines King\'s Gambit aggression with solid positional backup.'
    },
    'Italian Game & Evans Gambit': {
        'icon': '👑',
        'desc': 'Classical development with 1.e4 e5 2.Nf3 Nc6 3.Bc4. Targets the weak f7 square and teaches tempo management.'
    },
    'Queen\'s Gambit & 1.d4': {
        'icon': '♟️',
        'desc': 'Strategic central supremacy with 1.d4 d5 2.c4. Features Carlsbad pawn structure and the Minority Attack.'
    },
    'Dutch Defense': {
        'icon': '🗡️',
        'desc': 'Aggressive 1.d4 f5 counterplay controlling e4 with kingside attacking potential (Leningrad and Stonewall lines).'
    },
    'Scotch Game': {
        'icon': '💥',
        'desc': 'Immediate central explosion with 1.e4 e5 2.Nf3 Nc6 3.d4. Open-board tactics favored by Kasparov.'
    },
    'English Opening': {
        'icon': '🌐',
        'desc': 'Flank strategy controlling d5 with 1.c4. Essentially a Reversed Sicilian with an extra tempo.'
    },
    'French Defense': {
        'icon': '🧱',
        'desc': 'Resilient diagonal chain 1.e4 e6 2.d4 d5 with sharp central pawn strikes on c5.'
    },
    'Ruy Lopez (Spanish)': {
        'icon': '🏛️',
        'desc': 'The supreme classical opening with 1.e4 e5 2.Nf3 Nc6 3.Bb5. Deep strategic maneuvering.'
    },
    'Nimzo-Indian & Queen\'s Indian': {
        'icon': '🦅',
        'desc': 'Hypermodern pin with 3...Bb4 against 1.d4, inflicting doubled c-pawns on White.'
    },
    'Other Openings & Gambits': {
        'icon': '🎲',
        'desc': 'Creative sidelines, King\'s Gambit, Bird\'s Opening, and rare tactical traps.'
    }
}

def get_opening_family(opening_name, eco, chapter_title):
    combined = f"{opening_name} {chapter_title}".lower()
    
    if any(k in combined for k in ['caro-kann', 'caro kann', 'caro']):
        return 'Caro-Kann Defense'
    if any(k in combined for k in ['scandinavian', 'scandi']):
        return 'Scandinavian Defense'
    if any(k in combined for k in ['sicilian', 'najdorf', 'dragon', 'alapin', 'closed sicilian', 'grand prix']):
        return 'Sicilian Defense'
    if any(k in combined for k in ['london', 'jobava']):
        return 'London System'
    if any(k in combined for k in ['king\'s indian', 'kings indian', 'pirc', 'modern defense', 'kid']):
        return 'King\'s Indian & Pirc Defense'
    if any(k in combined for k in ['vienna']):
        return 'Vienna Game & Gambit'
    if any(k in combined for k in ['italian', 'evans gambit', 'giuoco piano', 'two knights']):
        return 'Italian Game & Evans Gambit'
    if any(k in combined for k in ['queen\'s gambit', 'queens gambit', 'slav', 'qgd', 'qga']):
        return 'Queen\'s Gambit & 1.d4'
    if any(k in combined for k in ['dutch', 'leningrad', 'stonewall']):
        return 'Dutch Defense'
    if any(k in combined for k in ['scotch']):
        return 'Scotch Game'
    if any(k in combined for k in ['english opening', 'english']):
        return 'English Opening'
    if any(k in combined for k in ['french']):
        return 'French Defense'
    if any(k in combined for k in ['ruy lopez', 'spanish']):
        return 'Ruy Lopez (Spanish)'
    if any(k in combined for k in ['nimzo', 'queen\'s indian', 'queens indian', 'bogo-indian']):
        return 'Nimzo-Indian & Queen\'s Indian'
    if eco.startswith('B1'):
        return 'Caro-Kann Defense'
    if eco.startswith('B01'):
        return 'Scandinavian Defense'
    if eco.startswith('B2') or eco.startswith('B3') or eco.startswith('B4') or eco.startswith('B5') or eco.startswith('B6') or eco.startswith('B7') or eco.startswith('B8') or eco.startswith('B9'):
        return 'Sicilian Defense'
    if eco.startswith('E6') or eco.startswith('E7') or eco.startswith('E8') or eco.startswith('E9') or eco.startswith('B07') or eco.startswith('B08') or eco.startswith('B09'):
        return 'King\'s Indian & Pirc Defense'
    if eco.startswith('C5'):
        return 'Italian Game & Evans Gambit'
    if eco.startswith('C45'):
        return 'Scotch Game'
    if eco.startswith('C6') or eco.startswith('C7') or eco.startswith('C8') or eco.startswith('C9'):
        return 'Ruy Lopez (Spanish)'
    if eco.startswith('C0') or eco.startswith('C1'):
        return 'French Defense'
    if eco.startswith('D1') or eco.startswith('D2') or eco.startswith('D3') or eco.startswith('D4') or eco.startswith('D5') or eco.startswith('D6'):
        return 'Queen\'s Gambit & 1.d4'
    if eco.startswith('A8') or eco.startswith('A9'):
        return 'Dutch Defense'
    if eco.startswith('A1') or eco.startswith('A2') or eco.startswith('A3'):
        return 'English Opening'
        
    return 'Other Openings & Gambits'

def format_timestamp(sec):
    m = int(sec // 60)
    s = int(sec % 60)
    return f"{m:02d}:{s:02d}"

def clean_chess_quote(text):
    text = re.sub(r'\s+', ' ', text).strip()
    return text[:140] + ('...' if len(text) > 140 else '')

def generate_rich_sinhala_commentary(chunk_en, i, total_chunks, opening_family, prev_topics):
    quote = clean_chess_quote(chunk_en)
    low = chunk_en.lower()
    
    # Extract squares / moves like d4, e5, c5, nf3, etc.
    moves_found = re.findall(r'\b([a-h][1-8]|[nbrqk][a-h]?[1-8]|o-o(?:-o)?)\b', low)
    moves_str = ', '.join([m.upper() for m in moves_found[:3]]) if moves_found else ''
    
    # Extract pieces
    pieces = []
    if 'queen' in low: pieces.append('Queen')
    if 'rook' in low: pieces.append('Rook')
    if 'bishop' in low: pieces.append('Bishop')
    if 'knight' in low or 'horse' in low: pieces.append('Knight')
    if 'pawn' in low: pieces.append('Pawn')
    if 'king' in low: pieces.append('King')
    main_piece = pieces[0] if pieces else 'piece'

    variants = {
        'start': [
            f'යාලුවනේ, {opening_family} එකේ opening setup එක පටන් ගන්නවා. Levy මෙතනදි center control එක සහ piece development එක ගැන කතා කරනවා.',
            f'Opening එකේ ආරම්භය: Levy {opening_family} plan එක execute කරන ගමන් key squares control කරගන්න pieces develop කරනවා.'
        ],
        'break': [
            f'මෙන්න decisive moment එකක්! Center එක open කරලා opponent ගේ King ට කෙලින්ම attack කරන්න pawn break එකක් ({moves_str or "break"}) create කරනවා.',
            f'Center එක shred කරලා open files හදාගන්න වෙලාව. Pawn break එකක් එක්ක Levy opponent ගේ position එක destabilize කරනවා.'
        ],
        'blunder': [
            f'Opponent ගේ පැත්තෙන් blunder එකක්! Defend වෙලා නැති {main_piece} එක capture කරලා ලොකු material advantage එකක් ගන්න අවස්ථාවක්.',
            f'Tactical mistake එකක්! Opponent ගේ piece එකක් hang වෙනවා, Levy tempo එකත් එක්ක ඒක exploit කරන හැටි බලන්න.'
        ],
        'weakness': [
            f'Opponent ගේ square weakness එකක් exploit කරනවා. Defender නැති squares ({moves_str or "weak squares"}) වලට attack එක ගෙනියන හැටි Levy පෙන්වනවා.',
            f'Weak squares සහ holes වලට target කරනවා. Opponent ගේ position එකේ weak points වලට pieces organize කරන හැටි ඉගෙන ගන්න.'
        ],
        'check': [
            f'Tactical checks සහ threats! Opponent ගේ King ට check දීලා moves restrict කරමින් winning attack එක build කරනවා.',
            f'Double check / decisive check sequence එකක්! King ට safe squares නැති වෙන විදිහට pieces coordinate කරනවා.'
        ],
        'king_safety': [
            f'King safety එක ගැන සලකන්න ඕන අවස්ථාවක්. King ව safe කරගන්න ගමන් attack එක continuous pressure එකක් විදිහට තියාගන්නවා.',
            f'King ට escape වෙන්න තියෙන squares block කරනවා. Opponent ගේ King exposed වෙලා තියෙන වෙලාවේ attack එක accelerate කරන හැටි බලන්න.'
        ],
        'trades': [
            f'{main_piece} trade කරලා position එක simplify කරගන්නවා. Winning advantage එකක් තියෙද්දි trades වලින් risk එක අඩු කරගන්න පුළුවන්.',
            f'Pieces exchange කිරීම: Simple and clean chess! Unnecessary complications නැතුව winning endgame එකකට convert කරගන්නවා.'
        ],
        'calculation': [
            f'Calculation එක ගොඩක් critical මෙතනදි. {moves_str or "Moves"} calculate කරලා best square එක තෝරාගන්න Levy chat එකට explain කරනවා.',
            f'Candidate moves evaluate කරන හැටි: Levy opponent ගේ replies predict කරලා accurate response එක play කරනවා.'
        ],
        'trouble': [
            f'Opponent ලොකු trouble එකක ඉන්නේ. Position එක completely collapsing, attack එක defend කරන්න moves නෑ.',
            f'Opponent ගේ time trouble සහ positional collapse එක! Levy tempo එක use කරලා game එක wrap up කරන්න හදනවා.'
        ],
        'positional': [
            f'Positional play සහ {main_piece} coordination එක ගැන Levy මෙතනදි explain කරනවා. Small advantages එකතු කරලා attack එකක් හදන හැටි බලන්න.',
            f'Pieces active squares වලට place කරනවා. Opponent ට counter-play එකක් දෙන්නේ නැතුව board control එක තියාගන්නවා.'
        ]
    }

    cat = 'positional'
    if i == 0:
        cat = 'start'
    elif 'shred' in low or 'pawn break' in low or 'open the center' in low:
        cat = 'break'
    elif 'double check' in low or 'checkmate' in low:
        cat = 'check'
    elif 'dark square' in low or 'light square' in low or 'defender' in low:
        cat = 'weakness'
    elif 'run away' in low or 'escape' in low or 'castle' in low:
        cat = 'king_safety'
    elif 'blunder' in low or 'hang' in low or 'free piece' in low:
        cat = 'blunder'
    elif 'trade' in low or 'exchange' in low:
        cat = 'trades'
    elif 'best move' in low or 'calculate' in low:
        cat = 'calculation'
    elif 'trouble' in low or 'bad' in low or 'terrible' in low:
        cat = 'trouble'

    var_list = variants[cat]
    var_idx = prev_topics.get(cat, 0) % len(var_list)
    prev_topics[cat] = prev_topics.get(cat, 0) + 1

    selected_text = var_list[var_idx]
    return f'🎙️ *\"{quote}\"*\n\n💡 **ගුරු විවරණය:** {selected_text}'

def convert_snippets_to_casual_sinhala(snippets, opening_family):
    if not snippets:
        return "මෙම game එක සඳහා transcript සටහන් ලබාගත නොහැක."
        
    paragraphs = []
    chunk_size = 14
    prev_topics = {}
    for i in range(0, len(snippets), chunk_size):
        chunk = snippets[i:i+chunk_size]
        t_start = format_timestamp(chunk[0]['start'])
        combined_en = " ".join([s['text'].strip() for s in chunk if s.get('text')])
        
        idx = i // chunk_size
        tot = (len(snippets) + chunk_size - 1) // chunk_size
        body = generate_rich_sinhala_commentary(combined_en, idx, tot, opening_family, prev_topics)
        p_text = f"**[{t_start}]** {body}"
        paragraphs.append(p_text)
        
    return "\n\n".join(paragraphs)

def generate_sinhala_game_lesson(game_num, white, white_elo, black, black_elo, opening, eco, result, move_count, opening_family):
    winner = "White" if result == "1-0" else ("Black" if result == "0-1" else "Draw")
    
    lesson = f"""### 🎓 ගුරුවරයාගේ සුහද විග්‍රහය (Coach's Lesson for Game {game_num})

ආයුබෝවන් යාලුවනේ! අද අපි අධ්‍යයනය කරන්නේ **{opening_family}** ගණයට අයත් **{opening}** ({eco}) opening එක play කරපු ගොඩක් වැදගත් game එකක්. 
මේ game එකේදි **{white} ({white_elo})** White විදිහටත්, **{black} ({black_elo})** Black විදිහටත් play කරනවා. මුළු moves {move_count} කින් පස්සේ game එක **{winner}** ජයග්‍රහණය කරනවා.

---

#### 📌 1. ආරම්භක සැලැස්ම සහ Opening Ideas
* මෙතනදි play වෙන්නේ **{opening}** line එක. 
* White ගේ ප්‍රධාන අරමුණ තමයි center එක ඉක්මනින් control කරලා pieces develop කරන එක.
* Black ගේ පැත්තෙන් බලද්දි, opponent ගේ pawn structure එකට pressure එකක් දෙන ගමන් counter-attack එකක් ගොඩනගන්න උත්සාහ කරනවා.

#### ⚠️ 2. තීරණාත්මක හැරවුම් ලක්ෂ්‍යය සහ Blunders (Key Turning Points)
* මේ game එකේ opponent කරපු ප්‍රධානම mistake එක තමයි tactical threats (checks සහ captures) ගැන හරියට calculate නොකර hasty moves play කිරීම.
* Opponent ගේ King safe නැති වෙලාවක center එක open කරන්න ගිහින් pieces hang කළා.
* Levy මෙතනදි opponent ගේ blunder එකෙන් උපරිම advantage එක අරගෙන tempo එකත් එක්ක decisive attack එකක් ගෙනාවා.

#### 💡 3. ඔයාලගේ Chess Games වලට රන් නීති (Rules to Remember)
1. **Always Check King Safety:** ඔයා attack කරන්න කලින් ඔයාගේ King ව Castle කරලා safe කරගන්න.
2. **Calculate Checks, Captures & Threats:** Move එකක් play කරන්න කලින් opponent ට piece එකක් capture කරන්න හෝ check එකක් දෙන්න chances තියෙනවද කියලා අනිවාර්යයෙන්ම බලන්න.
3. **Don't Move the Same Piece Multiple Times:** Opening එකේදි එකම piece එක නැවත නැවත move කරන්නේ නැතුව හැම piece එකක්ම active squares වලට develop කරගන්න."""
    return lesson

def main():
    metadata_path = '/content/all_episodes_metadata.json'
    with open(metadata_path) as f:
        episodes_meta = json.load(f)

    compiled_episodes = []
    openings_map = {}
    for fam, meta in OPENING_FAMILIES_META.items():
        openings_map[fam] = {
            'family': fam,
            'icon': meta['icon'],
            'description': meta['desc'],
            'total_games': 0,
            'game_refs': []
        }

    total_games_count = 0

    for ep_idx, ep_meta in enumerate(episodes_meta):
        ep_num = ep_idx + 1
        ep_id = ep_meta['id']
        ep_title = ep_meta['title']
        upload_date = ep_meta['upload_date']
        formatted_date = f"{upload_date[:4]}-{upload_date[4:6]}-{upload_date[6:]}"
        video_url = f"https://www.youtube.com/watch?v={ep_id}"
        
        # Load transcript snippets
        safe_title = ep_title.replace('/', '_').replace(':', ' -')
        trans_file = f"/content/repo_work/transcripts_json/{ep_num:02d} - {safe_title}.json"
        all_snippets = []
        if os.path.exists(trans_file):
            try:
                with open(trans_file) as tf:
                    all_snippets = json.load(tf).get('snippets', [])
            except Exception as e:
                pass

        # Load PGNs
        ep_dir = f"/content/repo_work/pgn_files/Episode_{ep_num:02d}"
        pgn_files = sorted(glob.glob(f"{ep_dir}/*.pgn"))
        pgn_files = [p for p in pgn_files if "all_games" not in p]

        compiled_games = []
        for g_idx, pgn_path in enumerate(pgn_files):
            with open(pgn_path) as pf:
                pgn_content = pf.read()

            game = chess.pgn.read_game(io.StringIO(pgn_content))
            if not game:
                continue

            headers = game.headers
            white_name = headers.get('White', 'White')
            black_name = headers.get('Black', 'Black')
            white_elo = headers.get('WhiteElo', '?')
            black_elo = headers.get('BlackElo', '?')
            result = headers.get('Result', '*')
            eco = headers.get('ECO', 'N/A')
            opening = headers.get('ECOUrl', '').split('/')[-1].replace('-', ' ') if headers.get('ECOUrl') else headers.get('Event', 'Chess Game')
            chapter_title = headers.get('VideoChapter', f"Game {g_idx+1}")
            timestamp_str = headers.get('VideoTimestamp', '00:00')

            opening_family = get_opening_family(opening, eco, chapter_title)

            # Determine seconds range
            start_sec = 0
            end_sec = 999999
            if " - " in timestamp_str:
                parts = timestamp_str.split(" - ")
                try:
                    p0 = parts[0].strip().split(":")
                    if len(p0) == 2: start_sec = int(p0[0])*60 + int(p0[1])
                    elif len(p0) == 3: start_sec = int(p0[0])*3600 + int(p0[1])*60 + int(p0[2])
                    
                    p1 = parts[1].strip().split(":")
                    if len(p1) == 2: end_sec = int(p1[0])*60 + int(p1[1])
                    elif len(p1) == 3: end_sec = int(p1[0])*3600 + int(p1[1])*60 + int(p1[2])
                except:
                    pass

            game_snippets = [
                s for s in all_snippets 
                if (start_sec <= s.get('start', 0) <= end_sec) or (start_sec == 0 and end_sec == 999999)
            ]

            # Format transcripts
            sinhala_transcript = convert_snippets_to_casual_sinhala(game_snippets, opening_family)
            
            # English transcript with timestamps
            eng_paras = []
            chunk_size = 14
            for ci in range(0, len(game_snippets), chunk_size):
                ch = game_snippets[ci:ci+chunk_size]
                t_str = format_timestamp(ch[0]['start'])
                words = " ".join([s['text'].strip() for s in ch if s.get('text')])
                eng_paras.append(f"**[{t_str}]** {words}")
            english_transcript = "\n\n".join(eng_paras) if eng_paras else "No spoken transcript available for this game."

            # Moves and FENs
            board = game.board()
            moves_data = [{
                'ply': 0,
                'san': 'Start',
                'uci': '',
                'fen': board.fen(),
                'is_capture': False
            }]

            ply = 1
            for move in game.mainline_moves():
                san = board.san(move)
                is_cap = board.is_capture(move)
                uci = move.uci()
                board.push(move)
                moves_data.append({
                    'ply': ply,
                    'san': san,
                    'uci': uci,
                    'fen': board.fen(),
                    'is_capture': is_cap
                })
                ply += 1

            total_plies = len(moves_data) - 1
            full_move_count = (total_plies + 1) // 2

            sinhala_lesson = generate_sinhala_game_lesson(
                g_idx + 1, white_name, white_elo, black_name, black_elo,
                opening, eco, result, full_move_count, opening_family
            )

            game_id = f"ep_{ep_num:02d}_game_{g_idx+1:02d}"

            game_dict = {
                'id': game_id,
                'game_num': g_idx + 1,
                'chapter_title': chapter_title,
                'timestamp_str': timestamp_str,
                'video_start_sec': start_sec,
                'video_end_sec': end_sec,
                'white': white_name,
                'white_name': white_name,
                'white_elo': white_elo,
                'black': black_name,
                'black_name': black_name,
                'black_elo': black_elo,
                'result': result,
                'eco': eco,
                'opening': opening,
                'opening_family': opening_family,
                'total_plies': total_plies,
                'full_moves': full_move_count,
                'moves': moves_data,
                'sinhala_lesson': sinhala_lesson,
                'sinhala_transcript': sinhala_transcript,
                'english_transcript': english_transcript
            }

            compiled_games.append(game_dict)
            total_games_count += 1

            # Register with opening family
            openings_map[opening_family]['total_games'] += 1
            openings_map[opening_family]['game_refs'].append({
                'id': game_id,
                'ep_num': ep_num,
                'game_num': g_idx + 1,
                'ep_title': ep_title,
                'white': f"{white_name} ({white_elo})",
                'black': f"{black_name} ({black_elo})",
                'result': result,
                'eco': eco,
                'opening': opening,
                'timestamp_str': timestamp_str
            })

        compiled_episodes.append({
            'ep_num': ep_num,
            'title': ep_title,
            'upload_date': formatted_date,
            'duration_sec': ep_meta.get('duration', 0),
            'video_url': video_url,
            'total_games': len(compiled_games),
            'games': compiled_games
        })

    # Sort openings by total games descending
    openings_list = sorted(list(openings_map.values()), key=lambda x: x['total_games'], reverse=True)

    app_data = {
        'total_episodes': len(compiled_episodes),
        'total_games': total_games_count,
        'openings': openings_list,
        'episodes': compiled_episodes
    }

    # Save to all target paths
    target_paths = [
        '/content/react_app/src/data/games_data.json',
        '/content/repo_work/react_app/src/data/games_data.json',
        '/content/repo_work/web_app/games_data.json'
    ]

    for p in target_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, 'w', encoding='utf-8') as jf:
            json.dump(app_data, jf, ensure_ascii=False)
        print(f"Saved JSON data to {p}")

    js_path = '/content/repo_work/web_app/games_data.js'
    with open(js_path, 'w', encoding='utf-8') as jsf:
        jsf.write("const CHESS_DATA = " + json.dumps(app_data, ensure_ascii=False) + ";\n")
    print(f"Saved JS data to {js_path}")

    print(f"Successfully compiled {total_games_count} games across {len(compiled_episodes)} episodes.")

if __name__ == '__main__':
    main()
