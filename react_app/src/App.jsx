import React, { useState } from 'react';
import chessData from './data/games_data.json';
import { Navbar } from './components/Navbar';
import { OpeningsView } from './components/OpeningsView';
import { PlayerView } from './components/PlayerView';

export default function App() {
  const [currentView, setCurrentView] = useState('openings'); // 'openings' | 'player'
  const [currentEpIdx, setCurrentEpIdx] = useState(0);
  const [currentGameIdx, setCurrentGameIdx] = useState(0);
  const [language, setLanguage] = useState('si');

  const handleLaunchGame = (epIdx, gameIdx) => {
    setCurrentEpIdx(epIdx);
    setCurrentGameIdx(gameIdx);
    setCurrentView('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        language={language}
        onLanguageChange={setLanguage}
      />

      <main style={{ flex: 1 }}>
        {currentView === 'openings' ? (
          <OpeningsView
            openings={chessData.openings}
            episodes={chessData.episodes}
            onLaunchGame={handleLaunchGame}
          />
        ) : (
          <PlayerView
            episodes={chessData.episodes}
            currentEpIdx={currentEpIdx}
            currentGameIdx={currentGameIdx}
            onEpisodeChange={(epIdx) => {
              setCurrentEpIdx(epIdx);
              setCurrentGameIdx(0);
            }}
            onGameChange={(gIdx) => setCurrentGameIdx(gIdx)}
            onSwitchToOpenings={() => setCurrentView('openings')}
            language={language}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>
          Win At Chess Interactive Study App • Sharp Chess.com Theme • 100% Mobile Responsive • Casual Sinhala & English Commentary
        </p>
      </footer>
    </div>
  );
}
