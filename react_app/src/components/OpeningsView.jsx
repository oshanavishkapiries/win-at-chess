import React, { useState, useMemo, useRef } from 'react';
import { OPENINGS_THEORY } from '../data/openings_theory';

export function OpeningsView({ openings = [], episodes = [], onLaunchGame }) {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [activeTab, setActiveTab] = useState('games'); // 'games' | 'theory'
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

  const activeTheory = useMemo(() => {
    if (!selectedFamily) return null;
    return OPENINGS_THEORY[selectedFamily] || null;
  }, [selectedFamily]);

  const handleSelectFamily = (family) => {
    if (selectedFamily === family) {
      setSelectedFamily(null);
    } else {
      setSelectedFamily(family);
      setActiveTab('games');
      setTimeout(() => {
        if (drawerRef.current) {
          drawerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handlePlayGame = (ref) => {
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
            <span>♟️</span> Chess Openings Collection & Teacher's Guide
          </h2>
          <p>
            Explore all 175 games across 33 episodes, organized into 15 classical and modern opening families with complete opening theories.
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
                <span>{isSelected ? 'Viewing details below' : 'Click to view matches & theory'}</span>
                <span>{isSelected ? '▼' : '➔'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Opening Drawer / Matches & Theory */}
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

            {/* Tab switch inside drawer: Matches vs Theory */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ display: 'flex', background: 'var(--bg-darkest)', borderRadius: '6px', padding: '2px', border: '1px solid var(--border-dark)' }}>
                <button
                  className={`lang-toggle-btn ${activeTab === 'games' ? 'active' : ''}`}
                  onClick={() => setActiveTab('games')}
                >
                  ♟️ Matches ({activeOpeningObj.total_games})
                </button>
                <button
                  className={`lang-toggle-btn ${activeTab === 'theory' ? 'active' : ''}`}
                  onClick={() => setActiveTab('theory')}
                >
                  📖 Opening Theory & Guide
                </button>
              </div>

              <button
                className="ctrl-btn-sharp"
                onClick={() => setSelectedFamily(null)}
                style={{ height: '32px', fontSize: '0.78rem' }}
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* TAB 1: Matched Games Table */}
          {activeTab === 'games' && (
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
          )}

          {/* TAB 2: Opening Theory & Teacher's Guide */}
          {activeTab === 'theory' && activeTheory && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px 0' }}>
              <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <h4 style={{ color: 'var(--chesscom-green-hover)', fontSize: '1rem', marginBottom: '8px' }}>
                  🎯 Core Philosophy & Student Concept
                </h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                  {activeTheory.philosophy}
                </p>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                <h4 style={{ color: 'var(--accent-gold)', fontSize: '1rem', marginBottom: '12px' }}>
                  ⚔️ Key Variations & Move Orders
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {activeTheory.keyLines.map((line, idx) => (
                    <div key={idx} style={{ borderLeft: '3px solid var(--border-light)', paddingLeft: '12px' }}>
                      <strong style={{ color: '#fff', fontSize: '0.88rem' }}>{line.name}</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: '2px', lineHeight: 1.45 }}>
                        {line.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                <div style={{ background: 'var(--bg-card)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                  <h4 style={{ color: 'var(--chesscom-green-hover)', fontSize: '0.92rem', marginBottom: '6px' }}>
                    🧱 Pawn Structure & Critical Breaks
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                    {activeTheory.pawnBreaks}
                  </p>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-dark)' }}>
                  <h4 style={{ color: 'var(--accent-red)', fontSize: '0.92rem', marginBottom: '6px' }}>
                    ⚡ Key Tactical Motifs & Traps
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                    {activeTheory.tactics}
                  </p>
                </div>
              </div>

              <div style={{ background: '#1e2b18', padding: '16px', borderRadius: '8px', border: '1px solid #3d5e2e' }}>
                <h4 style={{ color: '#a7f3d0', fontSize: '0.95rem', marginBottom: '6px' }}>
                  👨‍🏫 Coach's Advice to Student
                </h4>
                <p style={{ color: '#d1fae5', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  "{activeTheory.coachTip}"
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
