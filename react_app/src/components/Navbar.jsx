import React from 'react';

export function Navbar({ currentView, onViewChange, language, onLanguageChange }) {
  return (
    <header className="app-header">
      <div className="brand-section" onClick={() => onViewChange('openings')}>
        <div className="brand-icon">♟</div>
        <div className="brand-text">
          <h1>
            Win At Chess <span className="brand-badge">33 Episodes • 175 Games</span>
          </h1>
        </div>
      </div>

      <nav className="header-nav">
        <button
          className={`nav-pill-btn ${currentView === 'openings' ? 'active' : ''}`}
          onClick={() => onViewChange('openings')}
        >
          <span>♟️</span>
          <span className="nav-label">Openings</span>
        </button>
        <button
          className={`nav-pill-btn ${currentView === 'player' ? 'active' : ''}`}
          onClick={() => onViewChange('player')}
        >
          <span>🎮</span>
          <span className="nav-label">Game Player</span>
        </button>
      </nav>

      <div className="header-right">
        <div className="lang-toggle-group">
          <button
            className={`lang-toggle-btn ${language === 'si' ? 'active' : ''}`}
            onClick={() => onLanguageChange('si')}
            title="සිංහල ගුරු-සිසු ශෛලිය"
          >
            සිංහල
          </button>
          <button
            className={`lang-toggle-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => onLanguageChange('en')}
            title="English transcript"
          >
            English
          </button>
        </div>
      </div>
    </header>
  );
}
