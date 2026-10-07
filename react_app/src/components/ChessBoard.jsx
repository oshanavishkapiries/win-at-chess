import React, { useMemo } from 'react';
import { ChessPiece } from './ChessPiece';

export function ChessBoard({ fen, lastUci = '', isFlipped = false }) {
  const { squares, srcSq, dstSq } = useMemo(() => {
    let src = '';
    let dst = '';
    if (lastUci && lastUci.length >= 4) {
      src = lastUci.substring(0, 2);
      dst = lastUci.substring(2, 4);
    }

    const [position] = (fen || '8/8/8/8/8/8/8/8').split(' ');
    const ranks = position.split('/');

    const grid = [];
    const rankIndices = isFlipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];
    const fileIndices = isFlipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];

    rankIndices.forEach((r, rowIdx) => {
      const rankStr = ranks[r] || '8';
      const piecesInRank = [];
      for (const char of rankStr) {
        if (char >= '1' && char <= '8') {
          const empties = parseInt(char, 10);
          for (let k = 0; k < empties; k++) piecesInRank.push('');
        } else {
          piecesInRank.push(char);
        }
      }

      fileIndices.forEach((c, colIdx) => {
        const piece = piecesInRank[c] || '';
        const sqName = `${String.fromCharCode(97 + c)}${8 - r}`;
        const isLight = (r + c) % 2 === 0;

        grid.push({
          key: sqName,
          sqName,
          piece,
          isLight,
          isSrc: sqName === src,
          isDst: sqName === dst,
          showRank: colIdx === 0 ? 8 - r : null,
          showFile: rowIdx === 7 ? String.fromCharCode(97 + c) : null
        });
      });
    });

    return { squares: grid, srcSq: src, dstSq: dst };
  }, [fen, lastUci, isFlipped]);

  return (
    <div className="board-wrapper">
      <div className="board-grid-sharp">
        {squares.map((sq) => {
          let squareClass = `square-sharp ${sq.isLight ? 'light' : 'dark'}`;
          if (sq.isSrc) squareClass += ' last-move-src';
          if (sq.isDst) squareClass += ' last-move-dst';

          return (
            <div key={sq.key} className={squareClass} data-square={sq.sqName}>
              {sq.showRank !== null && (
                <span className="coord-rank">{sq.showRank}</span>
              )}
              {sq.showFile !== null && (
                <span className="coord-file">{sq.showFile}</span>
              )}
              {sq.piece && <ChessPiece piece={sq.piece} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
