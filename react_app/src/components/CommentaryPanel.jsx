import React, { useState, useMemo } from 'react';

export function CommentaryPanel({ game, episodeUrl, language }) {
  const [searchQuery, setSearchQuery] = useState('');

  const rawContent = useMemo(() => {
    if (!game) return '';
    if (language === 'si') {
      return (
        (game.sinhala_lesson || '') +
        '\n\n---\n\n### 🎙️ ගුරුවරයාගේ සජීවී කථිකා සටහන (Live Spoken Commentary)\n\n' +
        (game.sinhala_transcript || '')
      );
    } else {
      return (
        '### 🎙️ Spoken Transcript (English)\n\n' +
        (game.english_transcript || '')
      );
    }
  }, [game, language]);

  const filteredHtml = useMemo(() => {
    if (!rawContent) return '<p>No commentary available.</p>';

    let text = rawContent;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const lines = text.split('\n');
      const matched = lines.filter((l) => l.toLowerCase().includes(q));
      if (matched.length === 0) {
        return `<p style="color:var(--text-muted);font-style:italic;">No commentary matches for "${searchQuery}".</p>`;
      }
      text = matched.join('\n\n');
    }

    // Convert markdown into safe HTML with timestamp badges
    return text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      .replace(/^---$/gim, '<hr style="border:0;border-top:1px solid #3a3834;margin:16px 0;">')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/\[(\d{1,2}:\d{2}(?::\d{2})?)\]/g, (match, p1) => {
        const parts = p1.split(':');
        let secs = 0;
        if (parts.length === 2) {
          secs = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
        } else if (parts.length === 3) {
          secs = parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
        }
        const ytLink = `${episodeUrl || 'https://youtube.com'}&t=${secs}s`;
        return `<a href="${ytLink}" target="_blank" rel="noopener noreferrer" class="timestamp-badge-sharp" title="Watch on YouTube at ${p1}">▶ ${p1}</a>`;
      })
      .replace(/\n\n/g, '<br><br>');
  }, [rawContent, searchQuery, episodeUrl]);

  return (
    <div className="transcript-panel-sharp">
      <div className="transcript-panel-header">
        <h3>
          <span>🎙️</span>
          <span>{language === 'si' ? 'විවරණය සහ කථිකා සටහන (Commentary & Transcript)' : 'Commentary & Transcript'}</span>
        </h3>
        <input
          type="text"
          className="sharp-search-input"
          placeholder="Filter commentary..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '180px', padding: '6px 10px', fontSize: '0.8rem' }}
        />
      </div>

      <div
        className="transcript-panel-body"
        dangerouslySetInnerHTML={{ __html: filteredHtml }}
      />
    </div>
  );
}
