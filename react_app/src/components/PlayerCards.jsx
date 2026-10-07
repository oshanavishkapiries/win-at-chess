import React, { useMemo } from 'react';

// Piece unicode glyphs for captured pieces row
const PIECE_GLYPHS = {
  'p': '♟', 'n': '♞', 'b': '♝', 'r': '♜', 'q': '♛',
  'P': '♙', 'N': '♘', 'B': '♗', 'R': '♖', 'Q': '♕'
};

const PIECE_VALUES = {
  'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0,
  'P': 1, 'N': 3, 'B': 3, 'R': 5, 'Q': 9, 'K': 0
};

export function PlayerCard({ name, elo, isWhite, fen }) {
  // Calculate captured pieces by comparing starting pieces with current FEN
  const { captured, advantage } = useMemo(() => {
    if (!fen) return { captured: [], advantage: 0 };
    const startingPieces = {
      white: { P: 8, N: 2, B: 2, R: 2, Q: 1 },
      black: { p: 8, n: 2, b: 2, r: 2, q: 1 }
    };

    const currentCounts = { P: 0, N: 0, B: 0, R: 0, Q: 0, p: 0, n: 0, b: 0, r: 0, q: 0 };
    const [boardPart] = fen.split(' ');
    for (const ch of boardPart) {
      if (currentCounts[ch] !== undefined) currentCounts[ch]++;
    }

    const whiteCaptured = []; // pieces White has captured (i.e. black pieces taken)
    let whiteScore = 0;
    for (const [piece, maxCount] of Object.entries(startingPieces.black)) {
      const missing = maxCount - (currentCounts[piece] || 0);
      for (let i = 0; i < missing; i++) {
        whiteCaptured.push(piece);
        whiteScore += PIECE_VALUES[piece];
      }
    }

    const blackCaptured = []; // pieces Black has captured (i.e. white pieces taken)
    let blackScore = 0;
    for (const [piece, maxCount] of Object.entries(startingPieces.white)) {
      const missing = maxCount - (currentCounts[piece] || 0);
      for (let i = 0; i < missing; i++) {
        blackCaptured.push(piece);
        blackScore += PIECE_VALUES[piece];
      }
    }

    if (isWhite) {
      return {
        captured: whiteCaptured,
        advantage: whiteScore - blackScore
      };
    } else {
      return {
        captured: blackCaptured,
        advantage: blackScore - whiteScore
      };
    }
  }, [fen, isWhite]);

  return (
    <div className="player-card-sharp">
      <div className="player-info-sharp">
        <div className="player-avatar-box">
          {isWhite ? '♔' : '♚'}
        </div>
        <div>
          <span className="player-name-text">{name || (isWhite ? 'White' : 'Black')}</span>
          {elo && <span className="player-rating-badge">({elo})</span>}
        </div>
      </div>
      <div className="captured-pieces-row">
        {captured.map((p, i) => (
          <span key={i} title={p}>{PIECE_GLYPHS[p] || p}</span>
        ))}
        {advantage > 0 && (
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-secondary)', marginLeft: 4 }}>
            +{advantage}
          </span>
        )}
      </div>
    </div>
  );
}
