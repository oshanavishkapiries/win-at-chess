import React from 'react';

export function ControlsBar({
  onFirst,
  onPrev,
  onNext,
  onLast,
  onTogglePlay,
  isPlaying,
  onFlip,
  speed,
  onSpeedChange,
  isMuted,
  onToggleMute
}) {
  return (
    <div className="controls-bar-sharp">
      <div className="playback-btn-group">
        <button
          className="ctrl-btn-sharp"
          onClick={onFirst}
          title="First Move (|◀)"
          aria-label="First Move"
        >
          |◀
        </button>
        <button
          className="ctrl-btn-sharp"
          onClick={onPrev}
          title="Previous Move (◀ or Left Arrow)"
          aria-label="Previous Move"
        >
          ◀
        </button>
        <button
          className={`ctrl-btn-sharp ${isPlaying ? 'btn-play-active' : ''}`}
          onClick={onTogglePlay}
          title="Play / Pause (Spacebar)"
          aria-label="Play / Pause"
          style={{ minWidth: '78px' }}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          className="ctrl-btn-sharp"
          onClick={onNext}
          title="Next Move (▶ or Right Arrow)"
          aria-label="Next Move"
        >
          ▶
        </button>
        <button
          className="ctrl-btn-sharp"
          onClick={onLast}
          title="Final Move (▶|)"
          aria-label="Final Move"
        >
          ▶|
        </button>
        <button
          className="ctrl-btn-sharp"
          onClick={onFlip}
          title="Flip Board (🔄)"
          aria-label="Flip Board"
        >
          🔄
        </button>
        <button
          className="ctrl-btn-sharp"
          onClick={onToggleMute}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          aria-label="Toggle Sound"
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      <select
        className="speed-select-sharp"
        value={speed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        title="Autoplay Speed"
      >
        <option value={500}>0.5s (Fast)</option>
        <option value={1000}>1.0s (Normal)</option>
        <option value={1500}>1.5s (Slow)</option>
        <option value={2000}>2.0s (Study)</option>
      </select>
    </div>
  );
}
