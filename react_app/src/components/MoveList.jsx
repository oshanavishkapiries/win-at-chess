import React, { useEffect, useRef } from 'react';

export function MoveList({ moves, currentPly, onGoToPly }) {
  const activePillRef = useRef(null);

  useEffect(() => {
    if (activePillRef.current) {
      activePillRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [currentPly]);

  if (!moves || moves.length === 0) return null;

  const totalFullMoves = Math.ceil((moves.length - 1) / 2);
  const rows = [];

  // Start position row
  rows.push(
    <tr key="start">
      <td className="move-num-cell">0.</td>
      <td colSpan={2}>
        <span
          ref={currentPly === 0 ? activePillRef : null}
          className={`move-cell-pill ${currentPly === 0 ? 'active' : ''}`}
          onClick={() => onGoToPly(0)}
        >
          Start Position
        </span>
      </td>
    </tr>
  );

  for (let i = 1; i <= totalFullMoves; i++) {
    const whiteIdx = (i - 1) * 2 + 1;
    const blackIdx = (i - 1) * 2 + 2;
    const wMove = moves[whiteIdx];
    const bMove = moves[blackIdx];

    rows.push(
      <tr key={i}>
        <td className="move-num-cell">{i}.</td>
        <td>
          {wMove ? (
            <span
              ref={currentPly === whiteIdx ? activePillRef : null}
              className={`move-cell-pill ${currentPly === whiteIdx ? 'active' : ''}`}
              onClick={() => onGoToPly(whiteIdx)}
            >
              {wMove.san}
            </span>
          ) : null}
        </td>
        <td>
          {bMove ? (
            <span
              ref={currentPly === blackIdx ? activePillRef : null}
              className={`move-cell-pill ${currentPly === blackIdx ? 'active' : ''}`}
              onClick={() => onGoToPly(blackIdx)}
            >
              {bMove.san}
            </span>
          ) : null}
        </td>
      </tr>
    );
  }

  return (
    <div className="moves-container-sharp">
      <table className="moves-table-sharp">
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
