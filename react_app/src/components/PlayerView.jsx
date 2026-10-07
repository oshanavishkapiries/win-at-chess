import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChessBoard } from './ChessBoard';
import { PlayerCard } from './PlayerCards';
import { ControlsBar } from './ControlsBar';
import { MoveList } from './MoveList';
import { CommentaryPanel } from './CommentaryPanel';
import { chessAudio } from '../utils/audio';

export function PlayerView({
  episodes = [],
  currentEpIdx = 0,
  currentGameIdx = 0,
  onEpisodeChange,
  onGameChange,
  onSwitchToOpenings,
  language = 'si'
}) {
  const [currentPly, setCurrentPly] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileTab, setMobileTab] = useState('board'); // 'board' or 'commentary'

  const playTimerRef = useRef(null);

  const episode = episodes[currentEpIdx];
  const game = episode?.games[currentGameIdx];

  // Reset ply when switching game or episode
  useEffect(() => {
    setCurrentPly(0);
    setIsPlaying(false);
    if (playTimerRef.current) clearInterval(playTimerRef.current);
  }, [currentEpIdx, currentGameIdx]);

  // Audio mute sync
  useEffect(() => {
    chessAudio.setMuted(isMuted);
  }, [isMuted]);

  // Autoplay step
  const handleStepPlay = useCallback(() => {
    if (!game) return;
    setCurrentPly((prev) => {
      if (prev < game.moves.length - 1) {
        const nextPly = prev + 1;
        const move = game.moves[nextPly];
        if (move?.is_capture) chessAudio.playCapture();
        else chessAudio.playMove();
        return nextPly;
      } else {
        setIsPlaying(false);
        return prev;
      }
    });
  }, [game]);

  // Autoplay interval management
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setInterval(handleStepPlay, speed);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, speed, handleStepPlay]);

  // Navigate to specific ply
  const handleGoToPly = (targetPly) => {
    if (!game) return;
    const clamped = Math.max(0, Math.min(game.moves.length - 1, targetPly));
    if (clamped > currentPly) {
      const move = game.moves[clamped];
      if (move?.is_capture) chessAudio.playCapture();
      else chessAudio.playMove();
    }
    setCurrentPly(clamped);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleGoToPly(currentPly - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleGoToPly(currentPly + 1);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPly, game]);

  if (!episode || !game) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading game data...</div>;
  }

  const currentMove = game.moves[currentPly] || game.moves[0];
  const ytVideoUrl = `${episode.video_url}&t=${game.video_start_sec}s`;

  return (
    <div>
      {/* Mobile Segmented Tab Bar */}
      <div className="mobile-view-tabs">
        <button
          className={`mobile-view-tab ${mobileTab === 'board' ? 'active' : ''}`}
          onClick={() => setMobileTab('board')}
        >
          ♟️ Board & Moves
        </button>
        <button
          className={`mobile-view-tab ${mobileTab === 'commentary' ? 'active' : ''}`}
          onClick={() => setMobileTab('commentary')}
        >
          🎙️ Commentary & Transcript
        </button>
      </div>

      <div className="player-workspace">
        {/* Board & Notation Column */}
        <div
          className="board-column"
          style={{ display: mobileTab === 'commentary' ? undefined : 'flex' }}
        >
          {/* Top Player Card (Black by default, White if flipped) */}
          <PlayerCard
            name={isFlipped ? game.white_name : game.black_name}
            elo={isFlipped ? game.white_elo : game.black_elo}
            isWhite={isFlipped}
            fen={currentMove?.fen}
          />

          {/* Interactive Chess Board */}
          <ChessBoard
            fen={currentMove?.fen}
            lastUci={currentMove?.uci}
            isFlipped={isFlipped}
          />

          {/* Bottom Player Card (White by default, Black if flipped) */}
          <PlayerCard
            name={isFlipped ? game.black_name : game.white_name}
            elo={isFlipped ? game.black_elo : game.white_elo}
            isWhite={!isFlipped}
            fen={currentMove?.fen}
          />

          {/* Controls Bar */}
          <ControlsBar
            onFirst={() => handleGoToPly(0)}
            onPrev={() => handleGoToPly(currentPly - 1)}
            onNext={() => handleGoToPly(currentPly + 1)}
            onLast={() => handleGoToPly(game.moves.length - 1)}
            onTogglePlay={() => setIsPlaying((p) => !p)}
            isPlaying={isPlaying}
            onFlip={() => setIsFlipped((f) => !f)}
            speed={speed}
            onSpeedChange={setSpeed}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted((m) => !m)}
          />

          {/* Moves History Table */}
          <MoveList
            moves={game.moves}
            currentPly={currentPly}
            onGoToPly={handleGoToPly}
          />
        </div>

        {/* Episode Navigator & Commentary Column */}
        <div
          className="content-column-sharp"
          style={{
            display:
              window.innerWidth <= 868 && mobileTab !== 'commentary'
                ? 'none'
                : 'flex'
          }}
        >
          {/* Episode Switcher Banner */}
          <div className="episode-selector-banner">
            <div className="ep-nav-controls">
              <button
                className="ctrl-btn-sharp"
                onClick={() => onEpisodeChange(Math.max(0, currentEpIdx - 1))}
                disabled={currentEpIdx === 0}
                title="Previous Episode"
                aria-label="Previous Episode"
              >
                ◀
              </button>
              <select
                className="ep-dropdown"
                value={currentEpIdx}
                onChange={(e) => onEpisodeChange(Number(e.target.value))}
              >
                {episodes.map((ep, idx) => (
                  <option key={ep.ep_num} value={idx}>
                    Ep {ep.ep_num < 10 ? `0${ep.ep_num}` : ep.ep_num}: {ep.title} ({ep.total_games} games)
                  </option>
                ))}
              </select>
              <button
                className="ctrl-btn-sharp"
                onClick={() => onEpisodeChange(Math.min(episodes.length - 1, currentEpIdx + 1))}
                disabled={currentEpIdx === episodes.length - 1}
                title="Next Episode"
                aria-label="Next Episode"
              >
                ▶
              </button>
            </div>

            <button
              className="ctrl-btn-sharp"
              onClick={onSwitchToOpenings}
              style={{ color: 'var(--chesscom-green-hover)' }}
            >
              ♟️ Browse Openings
            </button>
          </div>

          {/* Game Tabs Bar for Current Episode */}
          <div className="games-tabs-bar">
            {episode.games.map((g, idx) => {
              const cleanTitle = g.chapter_title.replace(/GAME\s*\d+\s*(?:vs\.?)?/i, '').trim();
              return (
                <button
                  key={g.id}
                  className={`game-tab-btn ${idx === currentGameIdx ? 'active' : ''}`}
                  onClick={() => onGameChange(idx)}
                >
                  Game {g.game_num}: {cleanTitle || g.opening_family}
                </button>
              );
            })}
          </div>

          {/* Game Headline Card */}
          <div className="game-headline-card">
            <div className="game-headline-titles">
              <h2>
                {game.chapter_title} ({game.opening_family})
              </h2>
              <p>
                {game.white} vs {game.black} | Result: <strong>{game.result}</strong> | ECO: <strong>{game.eco}</strong> | Timestamp: {game.timestamp_str}
              </p>
            </div>
            <a
              href={ytVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="yt-watch-btn-sharp"
            >
              ▶ Watch on YouTube
            </a>
          </div>

          {/* Dual-Language Commentary & Transcript Panel */}
          <CommentaryPanel
            game={game}
            episodeUrl={episode.video_url}
            language={language}
          />
        </div>
      </div>
    </div>
  );
}
