import React, { useState, useMemo, useRef } from 'react';

export function OpeningsView({ openings = [], episodes = [], onLaunchGame }) {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedFamily, setSelectedFamily] = useState(null);
  const drawerRef = useRef(null);

  const filteredOpenings = useMemo(() => {
    if (!searchFilter.trim()) return openings;
    const q = searchFilter.toLowerCase();
    return openings.filter((op) => {
      const familyMatch = op.family.toLowerCase().includes(q);
      const descMatch = op.description.toLowerCase().includes(q);
      const gameMatch = op.game_refs?.some(
        (g) => g.white.toLowerCase().includes(q) || g.black.toLowerCase().includes(q) || g.opening.toLowerCase().includes(q)
      );
      return familyMatch || descMatch || gameMatch;
    });
  }, [openings, searchFilter]);

  const activeOpeningObj = useMemo(() => {
    return openings.find((o) => o.family === selectedFamily);
  }, [openings, selectedFamily]);

  const handleSelectFamily = (family) => {
    if (selectedFamily === family) {
      setSelectedFamily(null);
    } else {
      setSelectedFamily(family);
      setTimeout(() => {
        if (drawerRef.current) {
          drawerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handlePlayGame = (ref) => {
    // Find episode index and game index
    const epIdx = ref.ep_num - 1;
    const ep = episodes[epIdx];
    if (ep) {
      const gameIdx = ep.games.findIndex((g) => g.id === ref.id);
      if (gameIdx !== -1) {
        onLaunchGame(epIdx, gameIdx);
      }
    }
  };

  return (
    <div className="openings-view-container">
      {/* Hero Banner */}
      <div className="openings-hero-banner">
        <div className="openings-hero-text">
          <h2>
            <span>♟️</span> Chess Openings Collection
          </h2>
          <p>
            Explore all 175 games played across 33 episodes, organized into 15 classical and modern opening families.
          </p>
        </div>
        <div className="search-box-wrapper">
          <span className="search-icon-inside">🔍</span>
          <input
            type="text"
            className="sharp-search-input"
            placeholder="Search openings, players, ECO..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Grid of Opening Cards */}
      <div className="openings-grid">
        {filteredOpenings.map((op) => {
          const isSelected = selectedFamily === op.family;
          return (
            <div
              key={op.family}
              className={`opening-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelectFamily(op.family)}
            >
              <div>
                <div className="opening-card-top">
                  <div className="opening-title-row">
                    <span className="opening-emoji-icon">{op.icon}</span>
                    <h3 className="opening-card-title">{op.family}</h3>
                  </div>
                  <span className="opening-games-tag">{op.total_games} Games</span>
                </div>
                <p className="opening-card-desc">{op.description}</p>
              </div>
              <div className="opening-card-footer">
                <span>{isSelected ? 'Viewing matches below' : 'Click to view matches'}</span>
                <span>{isSelected ? '▼' : '➔'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Opening Drawer / Matches Table */}
      {activeOpeningObj && (
        <div ref={drawerRef} className="opening-drawer-container">
          <div className="opening-drawer-header">
            <h3 className="opening-drawer-title">
              <span>{activeOpeningObj.icon}</span>
              <span>{activeOpeningObj.family}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                ({activeOpeningObj.total_games} matches)
              </span>
            </h3>
            <button
              className="ctrl-btn-sharp"
              onClick={() => setSelectedFamily(null)}
              style={{ height: '32px', fontSize: '0.78rem' }}
            >
              ✕ Close
            </button>
          </div>

          <div className="table-responsive-wrapper">
            <table className="sharp-table">
              <thead>
                <tr>
                  <th>Episode</th>
                  <th>Matchup</th>
                  <th>ECO</th>
                  <th>Opening Variation</th>
                  <th>Result</th>
                  <th>Video Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeOpeningObj.game_refs?.map((ref) => {
                  const resultColor =
                    ref.result === '1-0'
                      ? 'var(--chesscom-green-hover)'
                      : ref.result === '0-1'
                      ? 'var(--accent-red)'
                      : 'var(--text-muted)';

                  return (
                    <tr key={ref.id}>
                      <td>
                        <strong>Ep {ref.ep_num < 10 ? `0${ref.ep_num}` : ref.ep_num}</strong>
                      </td>
                      <td>
                        <strong style={{ color: '#fff' }}>{ref.white}</strong> vs{' '}
                        <strong style={{ color: '#fff' }}>{ref.black}</strong>
                      </td>
                      <td>
                        <span className="brand-badge">{ref.eco}</span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{ref.opening}</td>
                      <td>
                        <strong style={{ color: resultColor }}>{ref.result}</strong>
                      </td>
                      <td style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {ref.timestamp_str}
                      </td>
                      <td>
                        <button
                          className="btn-play-game-action"
                          onClick={() => handlePlayGame(ref)}
                        >
                          ▶ Play Game
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
