# Win At Chess - Complete Transcripts & Game PGN Library

This repository contains the complete collection of **transcripts** and official **PGN (Portable Game Notation)** chess games extracted and verified from the entire 33-video YouTube playlist **[Win At Chess](https://youtube.com/playlist?list=PLBRObSmbZluSo6h0AySyeZRdlQzEhr2XL)** by IM Levy Rozman (GothamChess).

---

## 📊 Overview

- **33 Episodes** fully indexed and processed
- **175 Chess Games** extracted into standard tournament `.pgn` format
- **223 Total PGN Files** (individual game files, per-episode collections, and master playlist collection)
- **33 Detailed Transcripts** in Markdown (with clickable video timestamps), clean plain text, and JSON
- **100% Legal Move Validation** via `python-chess` and verified against official Chess.com archives

---

## 📂 Directory Structure

```text
/content/drive/MyDrive/chess/
├── pgn_files/
│   ├── all_33_episodes_games.pgn       # Master file containing ALL 175 games from the playlist
│   ├── Episode_01/                     # Individual .pgn files + Episode_01_all_games.pgn
│   ├── Episode_02/
│   ├── ...                             # (Folders for all 33 episodes)
│   └── Episode_33/
│
├── chess_video_to_pgn.py               # Standalone Computer Vision move extraction engine
├── extract_all_pgns.py                 # Batch extractor & API cross-validation script
├── playlist_metadata.json              # Complete YouTube playlist metadata
├── README.md                           # Master index and documentation
│
├── transcripts_timestamped/            # Markdown (.md) with clickable YouTube timestamps
├── transcripts_readable/               # Clean plain text (.txt) for reading / LLM analysis
└── transcripts_json/                   # Timestamped JSON transcript snippets
```

---

## ♟️ Master Episode & PGN Games Index

| # | Episode Title | Upload Date | Games | Combined PGN | Timestamped Transcript | YouTube Link |
| :-: | :--- | :---: | :---: | :---: | :---: | :---: |
| 01 | **How To Win At Chess (Episode 1)** | `2020-12-16` | 7 | [View PGN](pgn_files/Episode_01/Episode_01_all_games.pgn) | [View .md](transcripts_timestamped/01%20-%20How To Win At Chess (Episode 1).md) | [Watch Video](https://www.youtube.com/watch?v=XtaEnxG2lbg) |
| 02 | **How To Win At Chess (Episode 2, 700-1200)** | `2020-12-20` | 6 | [View PGN](pgn_files/Episode_02/Episode_02_all_games.pgn) | [View .md](transcripts_timestamped/02%20-%20How To Win At Chess (Episode 2, 700-1200).md) | [Watch Video](https://www.youtube.com/watch?v=htp8flALKjc) |
| 03 | **How To Win At Chess (Ep 3, 1300-1700)** | `2020-12-25` | 5 | [View PGN](pgn_files/Episode_03/Episode_03_all_games.pgn) | [View .md](transcripts_timestamped/03%20-%20How To Win At Chess (Ep 3, 1300-1700).md) | [Watch Video](https://www.youtube.com/watch?v=opF4DV1VnEY) |
| 04 | **How To Win At Chess (Ep 4, 900-1800 ELO)** | `2021-01-07` | 7 | [View PGN](pgn_files/Episode_04/Episode_04_all_games.pgn) | [View .md](transcripts_timestamped/04%20-%20How To Win At Chess (Ep 4, 900-1800 ELO).md) | [Watch Video](https://www.youtube.com/watch?v=5cQVpSxyGlk) |
| 05 | **How To Win At Chess (Ep 5, 1200-1600)** | `2021-01-14` | 6 | [View PGN](pgn_files/Episode_05/Episode_05_all_games.pgn) | [View .md](transcripts_timestamped/05%20-%20How To Win At Chess (Ep 5, 1200-1600).md) | [Watch Video](https://www.youtube.com/watch?v=i94pEwDhJCg) |
| 06 | **How To Win At Chess, Episode 6 (Elo 900-1600)** | `2021-02-02` | 5 | [View PGN](pgn_files/Episode_06/Episode_06_all_games.pgn) | [View .md](transcripts_timestamped/06%20-%20How To Win At Chess, Episode 6 (Elo 900-1600).md) | [Watch Video](https://www.youtube.com/watch?v=o8YBBRU3DHA) |
| 07 | **How To Win At Chess, Episode 7 (Elo 900-1700)** | `2021-02-08` | 6 | [View PGN](pgn_files/Episode_07/Episode_07_all_games.pgn) | [View .md](transcripts_timestamped/07%20-%20How To Win At Chess, Episode 7 (Elo 900-1700).md) | [Watch Video](https://www.youtube.com/watch?v=LuatJJ9glzE) |
| 08 | **Win At Chess (Ep 8, 1100-1800)** | `2021-03-12` | 5 | [View PGN](pgn_files/Episode_08/Episode_08_all_games.pgn) | [View .md](transcripts_timestamped/08%20-%20Win At Chess (Ep 8, 1100-1800).md) | [Watch Video](https://www.youtube.com/watch?v=QIkFcCpYsms) |
| 09 | **How To Win At Chess (Ep 9, 850-1600)** | `2021-03-28` | 6 | [View PGN](pgn_files/Episode_09/Episode_09_all_games.pgn) | [View .md](transcripts_timestamped/09%20-%20How To Win At Chess (Ep 9, 850-1600).md) | [Watch Video](https://www.youtube.com/watch?v=L2-tLcMBUy0) |
| 10 | **How To Win At Chess (Ep 10, 800-1600)** | `2021-04-04` | 6 | [View PGN](pgn_files/Episode_10/Episode_10_all_games.pgn) | [View .md](transcripts_timestamped/10%20-%20How To Win At Chess (Ep 10, 800-1600).md) | [Watch Video](https://www.youtube.com/watch?v=a3fp1-4alBo) |
| 11 | **How To Win At Chess (Ep 11, 1100-1800)** | `2021-04-10` | 6 | [View PGN](pgn_files/Episode_11/Episode_11_all_games.pgn) | [View .md](transcripts_timestamped/11%20-%20How To Win At Chess (Ep 11, 1100-1800).md) | [Watch Video](https://www.youtube.com/watch?v=RaZZ-P806SI) |
| 12 | **How To Win At Chess (Ep 12, 1000-2000)** | `2021-04-18` | 6 | [View PGN](pgn_files/Episode_12/Episode_12_all_games.pgn) | [View .md](transcripts_timestamped/12%20-%20How To Win At Chess (Ep 12, 1000-2000).md) | [Watch Video](https://www.youtube.com/watch?v=9Pw13-6m40E) |
| 13 | **TOUGH Episode (Win At Chess 13)** | `2021-05-23` | 6 | [View PGN](pgn_files/Episode_13/Episode_13_all_games.pgn) | [View .md](transcripts_timestamped/13%20-%20TOUGH Episode (Win At Chess 13).md) | [Watch Video](https://www.youtube.com/watch?v=QBLaM4A6L4Y) |
| 14 | **How To Win At Chess #14 (800-1900)** | `2021-06-10` | 6 | [View PGN](pgn_files/Episode_14/Episode_14_all_games.pgn) | [View .md](transcripts_timestamped/14%20-%20How To Win At Chess #14 (800-1900).md) | [Watch Video](https://www.youtube.com/watch?v=qEQY-OJLVxw) |
| 15 | **How To Win At Chess #15 (1300-1700)** | `2021-07-16` | 6 | [View PGN](pgn_files/Episode_15/Episode_15_all_games.pgn) | [View .md](transcripts_timestamped/15%20-%20How To Win At Chess #15 (1300-1700).md) | [Watch Video](https://www.youtube.com/watch?v=i0Y2X2PkON4) |
| 16 | **Win At Chess #16 (1800-2500)** | `2021-08-15` | 6 | [View PGN](pgn_files/Episode_16/Episode_16_all_games.pgn) | [View .md](transcripts_timestamped/16%20-%20Win At Chess #16 (1800-2500).md) | [Watch Video](https://www.youtube.com/watch?v=kklaMBsJBog) |
| 17 | **Win At Chess #17 (1200-1700)** | `2021-09-25` | 5 | [View PGN](pgn_files/Episode_17/Episode_17_all_games.pgn) | [View .md](transcripts_timestamped/17%20-%20Win At Chess #17 (1200-1700).md) | [Watch Video](https://www.youtube.com/watch?v=NP5HtOr07GI) |
| 18 | **Win At Chess #18 (ELO 1500-2100)** | `2021-11-22` | 6 | [View PGN](pgn_files/Episode_18/Episode_18_all_games.pgn) | [View .md](transcripts_timestamped/18%20-%20Win At Chess #18 (ELO 1500-2100).md) | [Watch Video](https://www.youtube.com/watch?v=meF2ZVfujnE) |
| 19 | **Win At Chess #19 (1200-1700)** | `2021-12-24` | 6 | [View PGN](pgn_files/Episode_19/Episode_19_all_games.pgn) | [View .md](transcripts_timestamped/19%20-%20Win At Chess #19 (1200-1700).md) | [Watch Video](https://www.youtube.com/watch?v=gb2oRPo11j4) |
| 20 | **Win At Chess #20 (1700-2100 ELO)** | `2022-03-20` | 5 | [View PGN](pgn_files/Episode_20/Episode_20_all_games.pgn) | [View .md](transcripts_timestamped/20%20-%20Win At Chess #20 (1700-2100 ELO).md) | [Watch Video](https://www.youtube.com/watch?v=57jHlRcRTu8) |
| 21 | **Win At Chess #21 (1200-2000 ELO)** | `2022-04-03` | 4 | [View PGN](pgn_files/Episode_21/Episode_21_all_games.pgn) | [View .md](transcripts_timestamped/21%20-%20Win At Chess #21 (1200-2000 ELO).md) | [Watch Video](https://www.youtube.com/watch?v=wdtv_z9BEcQ) |
| 22 | **Win At Chess #22 (900-1900 ELO)** | `2022-08-28` | 4 | [View PGN](pgn_files/Episode_22/Episode_22_all_games.pgn) | [View .md](transcripts_timestamped/22%20-%20Win At Chess #22 (900-1900 ELO).md) | [Watch Video](https://www.youtube.com/watch?v=xbDRB2VYrac) |
| 23 | **Win At Chess #23 (1100-1900 ELO)** | `2022-10-02` | 5 | [View PGN](pgn_files/Episode_23/Episode_23_all_games.pgn) | [View .md](transcripts_timestamped/23%20-%20Win At Chess #23 (1100-1900 ELO).md) | [Watch Video](https://www.youtube.com/watch?v=kZH8ntQDVjk) |
| 24 | **Want to be 1500 in chess?** | `2023-01-01` | 3 | [View PGN](pgn_files/Episode_24/Episode_24_all_games.pgn) | [View .md](transcripts_timestamped/24%20-%20Want to be 1500 in chess?.md) | [Watch Video](https://www.youtube.com/watch?v=J_nkXJ642SU) |
| 25 | **Want to be 2000 in Chess?** | `2023-05-21` | 3 | [View PGN](pgn_files/Episode_25/Episode_25_all_games.pgn) | [View .md](transcripts_timestamped/25%20-%20Want to be 2000 in Chess?.md) | [Watch Video](https://www.youtube.com/watch?v=js3ZGP4taWU) |
| 26 | **HOW TO WIN AT CHESS!!!!!!!** | `2024-02-25` | 4 | [View PGN](pgn_files/Episode_26/Episode_26_all_games.pgn) | [View .md](transcripts_timestamped/26%20-%20HOW TO WIN AT CHESS!!!!!!!.md) | [Watch Video](https://www.youtube.com/watch?v=KjqpLdO3_CU) |
| 27 | **How to ALWAYS Win at Chess** | `2024-03-03` | 4 | [View PGN](pgn_files/Episode_27/Episode_27_all_games.pgn) | [View .md](transcripts_timestamped/27%20-%20How to ALWAYS Win at Chess.md) | [Watch Video](https://www.youtube.com/watch?v=Z7g5c3lmwb0) |
| 28 | **How to win ALL your chess games.** | `2024-03-10` | 5 | [View PGN](pgn_files/Episode_28/Episode_28_all_games.pgn) | [View .md](transcripts_timestamped/28%20-%20How to win ALL your chess games..md) | [Watch Video](https://www.youtube.com/watch?v=Gyx0psXNt8g) |
| 29 | **How To Win At Chess... A LOT** | `2024-03-17` | 9 | [View PGN](pgn_files/Episode_29/Episode_29_all_games.pgn) | [View .md](transcripts_timestamped/29%20-%20How To Win At Chess... A LOT.md) | [Watch Video](https://www.youtube.com/watch?v=ToBz28UuQmY) |
| 30 | **How To Win At Chess FOREVER** | `2024-03-24` | 5 | [View PGN](pgn_files/Episode_30/Episode_30_all_games.pgn) | [View .md](transcripts_timestamped/30%20-%20How To Win At Chess FOREVER.md) | [Watch Video](https://www.youtube.com/watch?v=11iBvVprq5w) |
| 31 | **How To Win At Chess, Step by Step** | `2024-03-31` | 3 | [View PGN](pgn_files/Episode_31/Episode_31_all_games.pgn) | [View .md](transcripts_timestamped/31%20-%20How To Win At Chess, Step by Step.md) | [Watch Video](https://www.youtube.com/watch?v=dO6K-F7eHpM) |
| 32 | **HOW TO WIN AT CHESS IS BACK!!!!!!!!** | `2024-05-05` | 4 | [View PGN](pgn_files/Episode_32/Episode_32_all_games.pgn) | [View .md](transcripts_timestamped/32%20-%20HOW TO WIN AT CHESS IS BACK!!!!!!!!.md) | [Watch Video](https://www.youtube.com/watch?v=sqlT26ETY5k) |
| 33 | **Win At Chess. Win At Chess. Win At Chess. Win At Chess. Win At Chess. Win At Chess.** | `2025-02-24` | 5 | [View PGN](pgn_files/Episode_33/Episode_33_all_games.pgn) | [View .md](transcripts_timestamped/33%20-%20Win At Chess. Win At Chess. Win At Chess. Win At Chess. Win At Chess. Win At Chess..md) | [Watch Video](https://www.youtube.com/watch?v=ZzzZ-DKhRGA) |

---

## 🏆 Sample Detailed Episode Breakdown (Episode 1)

*Combined Episode File:* [`Episode_01_all_games.pgn`](pgn_files/Episode_01/Episode_01_all_games.pgn)

| Game | Matchup | Result | ECO | Opening | Video Time | Individual PGN |
| :---: | :--- | :---: | :---: | :--- | :---: | :---: |
| 1 | **Thoracic_Cerebral (1059)** vs **GothamChess (2418)** | `0-1` | C29 | Vienna Gambit | `00:43 - 14:57` | [`01_Thoracic_Cerebral_vs_GothamChess.pgn`](pgn_files/Episode_01/01_Thoracic_Cerebral_vs_GothamChess_Vienna_Gambit.pgn) |
| 2 | **GothamChess (2418)** vs **Jordan2197 (1124)** | `1-0` | D02 | London Opening | `14:57 - 28:30` | [`02_GothamChess_vs_Jordan2197.pgn`](pgn_files/Episode_01/02_GothamChess_vs_Jordan2197_London_Opening.pgn) |
| 3 | **caterpillarboss (1285)** vs **GothamChess (2418)** | `0-1` | B01 | Scandinavian Defense | `28:30 - 39:58` | [`03_caterpillarboss_vs_GothamChess.pgn`](pgn_files/Episode_01/03_caterpillarboss_vs_GothamChess_Scandinavian.pgn) |
| 4 | **GothamChess (2418)** vs **Ethan1460 (1612)** | `1-0` | B07 | Pirc / King's Indian | `39:58 - 57:58` | [`04_GothamChess_vs_Ethan1460.pgn`](pgn_files/Episode_01/04_GothamChess_vs_Ethan1460_Pirc.pgn) |
| 5 | **ImConner (1453)** vs **GothamChess (2418)** | `0-1` | B12 | Caro-Kann Advance | `57:58 - 01:07:30` | [`05_ImConner_vs_GothamChess.pgn`](pgn_files/Episode_01/05_ImConner_vs_GothamChess_Caro_Kann.pgn) |
| 6 | **GothamChess (2418)** vs **PaltoGiaPoulima (1453)** | `1-0` | B12 | Caro-Kann Advance | `01:07:30 - 01:19:20` | [`06_GothamChess_vs_PaltoGiaPoulima.pgn`](pgn_files/Episode_01/06_GothamChess_vs_PaltoGiaPoulima_Caro_Kann.pgn) |
| 7 | **GothamChess (2418)** vs **Pepega (1825)** | `1-0` | B20 | a3 Sicilian | `01:19:20 - 01:36:51` | [`07_GothamChess_vs_Pepega.pgn`](pgn_files/Episode_01/07_GothamChess_vs_Pepega_a3_Sicilian.pgn) |

---

## 🛠️ How to Use the PGN Files

The generated `.pgn` files are formatted in standard tournament notation and are compatible with:
- **Chess.com Analysis**: [chess.com/analysis](https://www.chess.com/analysis) (drag and drop any `.pgn` file)
- **Lichess Study / Analysis**: [lichess.org/analysis](https://lichess.org/analysis)
- **ChessBase & SCID**: Open as local database
- **Python (`python-chess`)**:
  ```python
  import chess.pgn

  with open('/content/drive/MyDrive/chess/pgn_files/all_33_episodes_games.pgn') as f:
      while True:
          game = chess.pgn.read_game(f)
          if game is None:
              break
          print(f"{game.headers['White']} vs {game.headers['Black']}: {game.headers['Result']}")
  ```

---

## 🤖 Computer Vision Pipeline (`chess_video_to_pgn.py`)

To run move detection on any video gameplay directly:

```bash
python /content/drive/MyDrive/chess/chess_video_to_pgn.py \
    --video <path_to_video.mp4> \
    --start <start_seconds> \
    --end <end_seconds> \
    --out game.pgn
```
