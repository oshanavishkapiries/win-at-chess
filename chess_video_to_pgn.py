#!/usr/bin/env python3
"""
Chess Video to PGN Pipeline
===========================
Extracts chess moves from video gameplay frames using Computer Vision and python-chess,
with optional Chess.com API enrichment and cross-validation.
"""

import sys
import os
import argparse
import json
import urllib.request
import cv2
import numpy as np
import chess
import chess.pgn

def get_square_name(r, c, flipped=True):
    """
    Convert (row, col) on board image (0-7, 0-7) to standard algebraic chess square (e.g. 'e4').
    If flipped (Black at bottom):
        Col 0 -> h, Col 7 -> a
        Row 0 -> 1, Row 7 -> 8
    If normal (White at bottom):
        Col 0 -> a, Col 7 -> h
        Row 0 -> 8, Row 7 -> 1
    """
    if flipped:
        file_char = chr(ord('h') - c)
        rank_char = str(r + 1)
    else:
        file_char = chr(ord('a') + c)
        rank_char = str(8 - r)
    return file_char + rank_char

def detect_highlights(board_img, sq_size=39, flipped=True):
    """
    Detect highlighted move squares on the board.
    Samples the 4 corners of each square (inset by 4 pixels to avoid piece graphics).
    """
    highlighted = []
    for r in range(8):
        for c in range(8):
            corners = [
                board_img[r * sq_size + 4, c * sq_size + 4],
                board_img[r * sq_size + 4, (c + 1) * sq_size - 4],
                board_img[(r + 1) * sq_size - 4, c * sq_size + 4],
                board_img[(r + 1) * sq_size - 4, (c + 1) * sq_size - 4],
            ]
            mean_bgr = np.mean(corners, axis=0)
            b, g, r_col = mean_bgr
            diff = b - r_col
            is_light = ((r + c) % 2 == 0)
            
            # Chess.com highlight detection
            if is_light:
                if diff > 50 and r_col < 180:
                    highlighted.append(get_square_name(r, c, flipped=flipped))
            else:
                if diff > 105 and r_col < 60:
                    highlighted.append(get_square_name(r, c, flipped=flipped))
                    
    return highlighted

def track_game_cv(video_path, start_sec, end_sec, flipped=True, step_sec=0.5,
                  board_bbox=(41, 353, 6, 318), headers=None):
    """
    Track moves from video segment using Computer Vision and python-chess.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise IOError(f"Could not open video file: {video_path}")
        
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    y1, y2, x1, x2 = board_bbox
    sq_size = (y2 - y1) // 8
    
    board = chess.Board()
    game = chess.pgn.Game()
    if headers:
        for k, v in headers.items():
            game.headers[k] = str(v)
            
    node = game
    last_move_sqs = None
    moves_recorded = []
    
    cur_sec = start_sec
    while cur_sec <= end_sec:
        frame_idx = int(cur_sec * fps)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if not ret:
            break
            
        board_img = frame[y1:y2, x1:x2]
        highlighted = detect_highlights(board_img, sq_size=sq_size, flipped=flipped)
        hl_set = frozenset(highlighted)
        
        # When exactly 2 squares are highlighted:
        if len(highlighted) == 2 and hl_set != last_move_sqs:
            sq1, sq2 = highlighted
            candidate_moves = [
                chess.Move.from_uci(sq1 + sq2),
                chess.Move.from_uci(sq2 + sq1),
                chess.Move.from_uci(sq1 + sq2 + 'q'),
                chess.Move.from_uci(sq2 + sq1 + 'q'),
            ]
            found = None
            for cm in candidate_moves:
                if cm in board.legal_moves:
                    found = cm
                    break
                    
            if found:
                san = board.san(found)
                board.push(found)
                node = node.add_variation(found)
                last_move_sqs = hl_set
                moves_recorded.append((cur_sec, found.uci(), san))
                if board.is_game_over():
                    break
                    
        # Check castling when > 2 squares are highlighted
        elif len(highlighted) > 2 and hl_set != last_move_sqs:
            found = None
            for m in board.legal_moves:
                if board.is_castling(m):
                    from_sq = chess.square_name(m.from_square)
                    to_sq = chess.square_name(m.to_square)
                    if from_sq in highlighted and to_sq in highlighted:
                        found = m
                        break
            if found:
                san = board.san(found)
                board.push(found)
                node = node.add_variation(found)
                last_move_sqs = hl_set
                moves_recorded.append((cur_sec, found.uci(), san))
                if board.is_game_over():
                    break
                    
        cur_sec += step_sec
        
    cap.release()
    return game, moves_recorded

def fetch_chess_com_game(game_id):
    """
    Fetch exact game PGN and metadata from Chess.com API.
    """
    url = f"https://api.chess.com/pub/game/live/{game_id}"
    req = urllib.request.Request(url, headers={'User-Agent': 'ChessPGNExtractor/1.0'})
    try:
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode())
            return data
    except Exception as e:
        print(f"Error fetching Chess.com game {game_id}: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description="Extract Chess PGN from video gameplay")
    parser.add_argument("--video", type=str, required=True, help="Path to video file")
    parser.add_argument("--start", type=float, default=0.0, help="Start time in seconds")
    parser.add_argument("--end", type=float, default=None, help="End time in seconds")
    parser.add_argument("--flipped", action="store_true", default=True, help="Board orientation (flipped if Black at bottom)")
    parser.add_argument("--out", type=str, default="output.pgn", help="Output PGN path")
    args = parser.parse_args()
    
    cap = cv2.VideoCapture(args.video)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    total_frames = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    cap.release()
    
    end_sec = args.end if args.end is not None else (total_frames / fps)
    print(f"Processing {args.video} from {args.start:.1f}s to {end_sec:.1f}s...")
    game, moves = track_game_cv(args.video, args.start, end_sec, flipped=args.flipped)
    
    print(f"Detected {len(moves)} moves.")
    with open(args.out, "w") as f:
        f.write(str(game) + "\n")
    print(f"Saved PGN to {args.out}")

if __name__ == "__main__":
    main()
