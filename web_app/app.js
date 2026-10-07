/**
 * Win At Chess Interactive Web Application
 * Master Player & Transcript Engine
 */

// Piece SVGs (clean Wikipedia / Lichess standard vector paths)
const PIECE_SVGS = {
  'P': `<svg viewBox="0 0 45 45" class="piece-svg"><path d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 l 23,0 c 0,-7.92 -4.41,-12.41 -7.41,-13.47 C 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 26.5,10.79 24.71,9 22.5,9 z" fill="#ffffff" stroke="#000000" stroke-width="1.5"/></svg>`,
  'N': `<svg viewBox="0 0 45 45" class="piece-svg"><path d="m 22,10 c 10.5,1 16.5,8 16,29 L 15,39 C 15,30 11.5,23.5 8,23 7,16 11,10 22,10 z" fill="#ffffff" stroke="#000000" stroke-width="1.5"/><circle cx="15" cy="18" r="1.5" fill="#000"/><path d="m 24,18 c 0.38,2.91 -5.55,7.37 -8,9 -3,2 -2.82,4.34 -5,4 -1.04,-0.94 -1.41,-3.04 0,-3 1.5,0 3.5,-1 3.5,-2 0.83,-1.41 -1.44,-2.02 0,-3 1.5,-1 2.5,-3 2.5,-3 1.5,-0.5 4,-2 7,-2 z" fill="#ffffff" stroke="#000000" stroke-width="1"/></svg>`,
  'B': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#ffffff" stroke="#000000" stroke-width="1.5"><path d="m 9,36 c 3.39,-0.97 10.11,0.43 13.5,-2 3.39,2.43 10.11,1.03 13.5,2 0,0 1.65,0.54 3,2 -0.68,0.97 -1.65,0.99 -3,1 -3.39,-0.21 -10.11,0.79 -13.5,-1 -3.39,1.79 -10.11,0.79 -13.5,1 -1.35,-0.01 -2.32,-0.03 -3,-1 1.35,-1.46 3,-2 3,-2 z"/><path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 30.5,30.5 30,22 30,22 30,22 25.5,13.5 22.5,8 19.5,13.5 15,22 15,22 c 0,0 -0.5,8.5 0,10 z"/><circle cx="22.5" cy="5.5" r="2.5"/></g><path d="m 17.5,26 h 10 M 15,30 h 15 M 22.5,15.5 v 5 M 20,18 h 5" stroke="#000000" stroke-width="1.5" fill="none"/></svg>`,
  'R': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#ffffff" stroke="#000000" stroke-width="1.5"><path d="m 9,39 h 27 v -3 H 9 v 3 z"/><path d="m 12,36 v -4 h 21 v 4 H 12 z"/><path d="m 14,29.5 1,-8.5 h 15 l 1,8.5 H 14 z"/><path d="M 11,14 V 9 h 4 v 2 h 5 V 9 h 5 v 2 h 5 V 9 h 4 v 5 z"/><path d="m 12,14 h 21 v 4 H 12 z"/></g></svg>`,
  'Q': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#ffffff" stroke="#000000" stroke-width="1.5"><path d="M 9,26 C 17.5,24.5 30,24.5 36,26 38,14 31,10 31,10 26.5,14 24,11 22.5,8 21,11 18.5,14 14,10 14,10 7,14 9,26 z"/><path d="m 9,26 c 0,2 1.5,2 2.5,4 2.5,4 4.5,6 11,6 6.5,0 8.5,-2 11,-6 1,-2 2.5,-2 2.5,-4 0,-1.5 -0.5,-1.5 -1.5,-1.5 -3.5,0 -4.5,1 -8,1 -3.5,0 -4.5,-1 -8,-1 -3.5,0 -4.5,1 -8,1 -1,0 -1.5,0 -1.5,1.5 z"/><circle cx="6" cy="12" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="22.5" cy="6" r="2"/><circle cx="31" cy="9" r="2"/><circle cx="39" cy="12" r="2"/><path d="M 11.5,30 C 15,29 30,29 33.5,30 M 12,33.5 C 18,32.5 27,32.5 33,33.5 M 12,36.5 C 18,35.5 27,35.5 33,36.5" stroke="#000000" stroke-width="1" fill="none"/></svg>`,
  'K': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#ffffff" stroke="#000000" stroke-width="1.5"><path d="M 22.5,11.63 V 6 M 20,8 h 5"/><path d="m 22.5,25 c 0,0 4.5,-7.5 3,-10.5 -1.5,-3 -6,-3 -7.5,0 -1.5,3 3,10.5 3,10.5"/><path d="m 11.5,37 c 5.5,3.5 15.5,3.5 21,0 v -7 c 0,0 9,-4.5 6,-10.5 -4,-1 -6,2 -6,2 0,0 0,-4 -5,-4 -4,0 -5,3 -5,3 0,0 -1,-3 -5,-3 -5,0 -5,4 -5,4 0,0 -2,-3 -6,-2 -3,6 6,10.5 6,10.5 v 7 z"/><path d="m 20,27 h 5 M 20,30 h 5 M 17,33 h 11" stroke="#000000" stroke-width="1" fill="none"/></g></svg>`,
  
  // Black pieces
  'p': `<svg viewBox="0 0 45 45" class="piece-svg"><path d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 l 23,0 c 0,-7.92 -4.41,-12.41 -7.41,-13.47 C 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 26.5,10.79 24.71,9 22.5,9 z" fill="#2b2b2b" stroke="#000000" stroke-width="1.5"/></svg>`,
  'n': `<svg viewBox="0 0 45 45" class="piece-svg"><path d="m 22,10 c 10.5,1 16.5,8 16,29 L 15,39 C 15,30 11.5,23.5 8,23 7,16 11,10 22,10 z" fill="#2b2b2b" stroke="#000000" stroke-width="1.5"/><circle cx="15" cy="18" r="1.5" fill="#fff"/><path d="m 24,18 c 0.38,2.91 -5.55,7.37 -8,9 -3,2 -2.82,4.34 -5,4 -1.04,-0.94 -1.41,-3.04 0,-3 1.5,0 3.5,-1 3.5,-2 0.83,-1.41 -1.44,-2.02 0,-3 1.5,-1 2.5,-3 2.5,-3 1.5,-0.5 4,-2 7,-2 z" fill="#2b2b2b" stroke="#000000" stroke-width="1"/></svg>`,
  'b': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#2b2b2b" stroke="#000000" stroke-width="1.5"><path d="m 9,36 c 3.39,-0.97 10.11,0.43 13.5,-2 3.39,2.43 10.11,1.03 13.5,2 0,0 1.65,0.54 3,2 -0.68,0.97 -1.65,0.99 -3,1 -3.39,-0.21 -10.11,0.79 -13.5,-1 -3.39,1.79 -10.11,0.79 -13.5,1 -1.35,-0.01 -2.32,-0.03 -3,-1 1.35,-1.46 3,-2 3,-2 z"/><path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 30.5,30.5 30,22 30,22 30,22 25.5,13.5 22.5,8 19.5,13.5 15,22 15,22 c 0,0 -0.5,8.5 0,10 z"/><circle cx="22.5" cy="5.5" r="2.5"/></g><path d="m 17.5,26 h 10 M 15,30 h 15 M 22.5,15.5 v 5 M 20,18 h 5" stroke="#ffffff" stroke-width="1.2" fill="none"/></svg>`,
  'r': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#2b2b2b" stroke="#000000" stroke-width="1.5"><path d="m 9,39 h 27 v -3 H 9 v 3 z"/><path d="m 12,36 v -4 h 21 v 4 H 12 z"/><path d="m 14,29.5 1,-8.5 h 15 l 1,8.5 H 14 z"/><path d="M 11,14 V 9 h 4 v 2 h 5 V 9 h 5 v 2 h 5 V 9 h 4 v 5 z"/><path d="m 12,14 h 21 v 4 H 12 z"/></g></svg>`,
  'q': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#2b2b2b" stroke="#000000" stroke-width="1.5"><path d="M 9,26 C 17.5,24.5 30,24.5 36,26 38,14 31,10 31,10 26.5,14 24,11 22.5,8 21,11 18.5,14 14,10 14,10 7,14 9,26 z"/><path d="m 9,26 c 0,2 1.5,2 2.5,4 2.5,4 4.5,6 11,6 6.5,0 8.5,-2 11,-6 1,-2 2.5,-2 2.5,-4 0,-1.5 -0.5,-1.5 -1.5,-1.5 -3.5,0 -4.5,1 -8,1 -3.5,0 -4.5,-1 -8,-1 -3.5,0 -4.5,1 -8,1 -1,0 -1.5,0 -1.5,1.5 z"/><circle cx="6" cy="12" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="22.5" cy="6" r="2"/><circle cx="31" cy="9" r="2"/><circle cx="39" cy="12" r="2"/><path d="M 11.5,30 C 15,29 30,29 33.5,30 M 12,33.5 C 18,32.5 27,32.5 33,33.5 M 12,36.5 C 18,35.5 27,35.5 33,36.5" stroke="#ffffff" stroke-width="0.8" fill="none"/></svg>`,
  'k': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#2b2b2b" stroke="#000000" stroke-width="1.5"><path d="M 22.5,11.63 V 6 M 20,8 h 5"/><path d="m 22.5,25 c 0,0 4.5,-7.5 3,-10.5 -1.5,-3 -6,-3 -7.5,0 -1.5,3 3,10.5 3,10.5"/><path d="m 11.5,37 c 5.5,3.5 15.5,3.5 21,0 v -7 c 0,0 9,-4.5 6,-10.5 -4,-1 -6,2 -6,2 0,0 0,-4 -5,-4 -4,0 -5,3 -5,3 0,0 -1,-3 -5,-3 -5,0 -5,4 -5,4 0,0 -2,-3 -6,-2 -3,6 6,10.5 6,10.5 v 7 z"/><path d="m 20,27 h 5 M 20,30 h 5 M 17,33 h 11" stroke="#ffffff" stroke-width="1" fill="none"/></g></svg>`
};

// Web Audio API Synthesizer for Chess Sound Effects
class ChessAudio {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }
  playMove() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch(e) {}
  }
  playCapture() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch(e) {}
  }
}

// App State
const state = {
  data: null,
  currentEpIdx: 0,
  currentGameIdx: 0,
  currentPly: 0,
  isFlipped: false,
  isPlaying: false,
  playSpeedMs: 1000,
  playInterval: null,
  currentLang: 'si', // 'si' or 'en'
  audio: new ChessAudio(),
  transcriptFilter: ''
};

// Initialize App
async function initApp() {
  if (typeof CHESS_DATA !== 'undefined') {
    state.data = CHESS_DATA;
    setupUI();
  } else {
    try {
      const res = await fetch('games_data.json');
      state.data = await res.json();
      setupUI();
    } catch (e) {
      console.error('Failed to load chess data:', e);
      document.body.innerHTML = `<div style="color:red;padding:40px;text-align:center;">
        <h2>Error Loading Chess Data</h2>
        <p>Could not load games_data.js or games_data.json. Please make sure files exist.</p>
      </div>`;
    }
  }
}

function setupUI() {
  populateEpisodeSelector();
  setupEventListeners();
  loadEpisode(0);
}

function populateEpisodeSelector() {
  const select = document.getElementById('episodeSelect');
  select.innerHTML = '';
  state.data.episodes.forEach((ep, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `Ep ${ep.ep_num < 10 ? '0' + ep.ep_num : ep.ep_num}: ${ep.title} (${ep.total_games} games)`;
    select.appendChild(opt);
  });
}

function setupEventListeners() {
  // Episode Selector
  document.getElementById('episodeSelect').addEventListener('change', (e) => {
    loadEpisode(parseInt(e.target.value));
  });
  document.getElementById('prevEpBtn').addEventListener('click', () => {
    if (state.currentEpIdx > 0) loadEpisode(state.currentEpIdx - 1);
  });
  document.getElementById('nextEpBtn').addEventListener('click', () => {
    if (state.currentEpIdx < state.data.episodes.length - 1) loadEpisode(state.currentEpIdx + 1);
  });

  // Language Switcher
  document.getElementById('langSiBtn').addEventListener('click', () => setLanguage('si'));
  document.getElementById('langEnBtn').addEventListener('click', () => setLanguage('en'));

  // Board Navigation
  document.getElementById('firstMoveBtn').addEventListener('click', () => goToPly(0));
  document.getElementById('prevMoveBtn').addEventListener('click', () => goToPly(state.currentPly - 1));
  document.getElementById('nextMoveBtn').addEventListener('click', () => goToPly(state.currentPly + 1));
  document.getElementById('lastMoveBtn').addEventListener('click', () => {
    const game = getCurrentGame();
    if (game) goToPly(game.moves.length - 1);
  });
  document.getElementById('playPauseBtn').addEventListener('click', togglePlay);
  document.getElementById('flipBoardBtn').addEventListener('click', toggleFlip);

  document.getElementById('speedSelect').addEventListener('change', (e) => {
    state.playSpeedMs = parseInt(e.target.value);
    if (state.isPlaying) {
      clearInterval(state.playInterval);
      state.playInterval = setInterval(stepPlay, state.playSpeedMs);
    }
  });

  // Transcript Search
  document.getElementById('transcriptSearch').addEventListener('input', (e) => {
    state.transcriptFilter = e.target.value.toLowerCase();
    renderTranscript();
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    if (e.key === 'ArrowLeft') goToPly(state.currentPly - 1);
    if (e.key === 'ArrowRight') goToPly(state.currentPly + 1);
    if (e.key === ' ') {
      e.preventDefault();
      togglePlay();
    }
  });
}

function loadEpisode(epIdx) {
  state.currentEpIdx = epIdx;
  document.getElementById('episodeSelect').value = epIdx;
  const ep = state.data.episodes[epIdx];
  
  // Render Game Tabs
  const tabsContainer = document.getElementById('gamesNav');
  tabsContainer.innerHTML = '';
  ep.games.forEach((g, gIdx) => {
    const btn = document.createElement('button');
    btn.className = `game-tab ${gIdx === 0 ? 'active' : ''}`;
    btn.textContent = `Game ${g.game_num}: ${g.chapter_title.replace(/GAME\s*\d+\s*(?:vs\.?)?/i, '').trim() || g.white_name + ' vs ' + g.black_name}`;
    btn.addEventListener('click', () => loadGame(gIdx));
    tabsContainer.appendChild(btn);
  });

  loadGame(0);
}

function loadGame(gIdx) {
  pausePlay();
  state.currentGameIdx = gIdx;

  // Update Tab States
  const tabs = document.querySelectorAll('.game-tab');
  tabs.forEach((t, i) => t.classList.toggle('active', i === gIdx));

  const game = getCurrentGame();
  if (!game) return;

  // Update Game Info Banner
  document.getElementById('gameTitle').textContent = `${game.chapter_title} (${game.opening})`;
  document.getElementById('gameMeta').textContent = `${game.white} vs ${game.black} | Result: ${game.result} | ECO: ${game.eco} | Video Time: ${game.timestamp_str}`;
  
  const ytBtn = document.getElementById('ytWatchBtn');
  const ytUrl = `https://www.youtube.com/watch?v=${state.data.episodes[state.currentEpIdx].url.split('v=')[1]}&t=${game.video_start_sec}s`;
  ytBtn.href = ytUrl;

  // Player Cards
  document.getElementById('whiteName').textContent = game.white_name;
  document.getElementById('whiteElo').textContent = `(${game.white_elo})`;
  document.getElementById('blackName').textContent = game.black_name;
  document.getElementById('blackElo').textContent = `(${game.black_elo})`;

  renderMoveHistory(game);
  renderTranscript();
  goToPly(0);
}

function getCurrentGame() {
  const ep = state.data.episodes[state.currentEpIdx];
  return ep ? ep.games[state.currentGameIdx] : null;
}

function setLanguage(lang) {
  state.currentLang = lang;
  document.getElementById('langSiBtn').classList.toggle('active', lang === 'si');
  document.getElementById('langEnBtn').classList.toggle('active', lang === 'en');
  renderTranscript();
}

// Chessboard Rendering
function renderBoard(fen, lastUci = '') {
  const boardEl = document.getElementById('boardGrid');
  boardEl.innerHTML = '';

  const [position] = fen.split(' ');
  const rows = position.split('/');
  
  // Highlight squares from UCI (e.g. 'e2e4' -> ['e2', 'e4'])
  let srcSq = '', dstSq = '';
  if (lastUci && lastUci.length >= 4) {
    srcSq = lastUci.substring(0, 2);
    dstSq = lastUci.substring(2, 4);
  }

  const rankIndices = state.isFlipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];
  const fileIndices = state.isFlipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];

  rankIndices.forEach((r, rowIdx) => {
    let colIdx = 0;
    const rankStr = rows[r];
    const piecesInRow = [];

    for (let char of rankStr) {
      if (char >= '1' && char <= '8') {
        const empties = parseInt(char);
        for (let k = 0; k < empties; k++) piecesInRow.push('');
      } else {
        piecesInRow.push(char);
      }
    }

    fileIndices.forEach((c, colIdxDisplay) => {
      const piece = piecesInRow[c];
      const sqName = `${String.fromCharCode(97 + c)}${8 - r}`;
      const isLight = (r + c) % 2 === 0;

      const sqEl = document.createElement('div');
      sqEl.className = `square ${isLight ? 'light' : 'dark'}`;
      sqEl.dataset.square = sqName;

      if (sqName === srcSq) sqEl.classList.add('last-move-src');
      if (sqName === dstSq) sqEl.classList.add('last-move-dst');

      // Rank & File Coordinates
      if (colIdxDisplay === 0) {
        const rankCoord = document.createElement('span');
        rankCoord.className = 'coord-rank';
        rankCoord.textContent = 8 - r;
        sqEl.appendChild(rankCoord);
      }
      if (rowIdx === 7) {
        const fileCoord = document.createElement('span');
        fileCoord.className = 'coord-file';
        fileCoord.textContent = String.fromCharCode(97 + c);
        sqEl.appendChild(fileCoord);
      }

      // Piece SVG
      if (piece && PIECE_SVGS[piece]) {
        sqEl.innerHTML += PIECE_SVGS[piece];
      }

      boardEl.appendChild(sqEl);
    });
  });
}

function goToPly(ply) {
  const game = getCurrentGame();
  if (!game) return;

  if (ply < 0) ply = 0;
  if (ply >= game.moves.length) ply = game.moves.length - 1;

  const prevPly = state.currentPly;
  state.currentPly = ply;

  const currentMove = game.moves[ply];
  renderBoard(currentMove.fen, currentMove.uci);

  // Play audio sound if moved forward
  if (ply > prevPly) {
    if (currentMove.is_capture) state.audio.playCapture();
    else state.audio.playMove();
  }

  // Highlight in move table
  document.querySelectorAll('.move-pill').forEach((pill, idx) => {
    pill.classList.toggle('active', idx === ply);
  });

  // Scroll active move into view
  const activePill = document.querySelector('.move-pill.active');
  if (activePill) {
    activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (ply === game.moves.length - 1 && state.isPlaying) {
    pausePlay();
  }
}

function renderMoveHistory(game) {
  const container = document.getElementById('movesTableBody');
  container.innerHTML = '';

  const totalFullMoves = Math.ceil((game.moves.length - 1) / 2);
  let html = '';

  // Initial position row
  html += `<tr><td class="move-num">0.</td><td colspan="2"><span class="move-pill ${state.currentPly === 0 ? 'active' : ''}" onclick="goToPly(0)">Start Position</span></td></tr>`;

  for (let i = 1; i <= totalFullMoves; i++) {
    const whiteIdx = (i - 1) * 2 + 1;
    const blackIdx = (i - 1) * 2 + 2;

    const wMove = game.moves[whiteIdx];
    const bMove = game.moves[blackIdx];

    html += `<tr>
      <td class="move-num">${i}.</td>
      <td>${wMove ? `<span class="move-pill ${state.currentPly === whiteIdx ? 'active' : ''}" onclick="goToPly(${whiteIdx})">${wMove.san}</span>` : ''}</td>
      <td>${bMove ? `<span class="move-pill ${state.currentPly === blackIdx ? 'active' : ''}" onclick="goToPly(${blackIdx})">${bMove.san}</span>` : ''}</td>
    </tr>`;
  }

  container.innerHTML = html;
}

function renderTranscript() {
  const game = getCurrentGame();
  const body = document.getElementById('transcriptBody');
  if (!game) {
    body.innerHTML = '<p>No game selected.</p>';
    return;
  }

  let content = '';
  if (state.currentLang === 'si') {
    content = game.sinhala_lesson + '\n\n---\n\n### 🎙️ ගුරුවරයාගේ සජීවී කථිකා සටහන (Live Spoken Commentary)\n\n' + game.sinhala_transcript;
  } else {
    content = `### 🎙️ Spoken Transcript (English)\n\n` + game.english_transcript;
  }

  // Filter if search query exists
  if (state.transcriptFilter) {
    const lines = content.split('\n');
    content = lines.filter(l => l.toLowerCase().includes(state.transcriptFilter)).join('\n');
    if (!content) content = '<p>No matching commentary found.</p>';
  }

  // Render markdown formatting simply
  body.innerHTML = parseMarkdownSimple(content);
}

function parseMarkdownSimple(text) {
  return text
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^---$/gim, '<hr style="border:0;border-top:1px solid #333a47;margin:16px 0;">')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\[(\d{2}:\d{2}(?::\d{2})?)\]/g, (match, p1) => {
      const parts = p1.split(':');
      let secs = 0;
      if (parts.length === 2) secs = parseInt(parts[0]) * 60 + parseInt(parts[1]);
      else if (parts.length === 3) secs = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
      const ytUrl = `https://www.youtube.com/watch?v=${state.data.episodes[state.currentEpIdx].url.split('v=')[1]}&t=${secs}s`;
      return `<a href="${ytUrl}" target="_blank" class="ts-badge" title="Watch on YouTube at ${p1}">▶ ${p1}</a>`;
    })
    .replace(/\n\n/g, '<br><br>');
}

function togglePlay() {
  if (state.isPlaying) {
    pausePlay();
  } else {
    state.isPlaying = true;
    const btn = document.getElementById('playPauseBtn');
    btn.textContent = '⏸ Pause';
    btn.classList.add('active-play');
    state.playInterval = setInterval(stepPlay, state.playSpeedMs);
  }
}

function pausePlay() {
  state.isPlaying = false;
  const btn = document.getElementById('playPauseBtn');
  btn.textContent = '▶ Play';
  btn.classList.remove('active-play');
  if (state.playInterval) clearInterval(state.playInterval);
}

function stepPlay() {
  const game = getCurrentGame();
  if (!game) return;
  if (state.currentPly < game.moves.length - 1) {
    goToPly(state.currentPly + 1);
  } else {
    pausePlay();
  }
}

function toggleFlip() {
  state.isFlipped = !state.isFlipped;
  const game = getCurrentGame();
  if (game) {
    const currentMove = game.moves[state.currentPly];
    renderBoard(currentMove.fen, currentMove.uci);
  }
}

// Start app on load
window.addEventListener('DOMContentLoaded', initApp);
