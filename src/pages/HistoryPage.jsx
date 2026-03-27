import { useState, useEffect } from 'react';
import { getHistory, clearHistory } from '../utils/storage';
import '../styles/history.css';

const SUBJECT_ICONS = {
  physics:     '⚛️',
  chemistry:   '🧪',
  biology:     '🧬',
  mathematics: '📐',
  english:     '📖',
};

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${String(s).padStart(2, '0')}s`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function scoreClass(score, total) {
  const pct = (score / total) * 100;
  if (pct >= 70) return 'history-score-high';
  if (pct >= 50) return 'history-score-mid';
  return 'history-score-low';
}

export default function HistoryPage({ onGoHome }) {
  const [history, setHistory] = useState([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  function handleClear() {
    clearHistory();
    setHistory([]);
    setShowClearConfirm(false);
  }

  const totalAttempts = history.length;
  const avgScore = totalAttempts > 0
    ? Math.round(history.reduce((sum, h) => sum + (h.score / h.total) * 100, 0) / totalAttempts)
    : 0;
  const bestScore = totalAttempts > 0
    ? Math.max(...history.map((h) => Math.round((h.score / h.total) * 100)))
    : 0;

  return (
    <div className="history-page">
      <header className="history-header">
        <div className="history-header-inner">
          <div>
            <h1 className="history-header-title">Attempt History</h1>
            <p className="history-header-sub">Your past JAMB mock exam attempts</p>
          </div>
          <div className="history-header-actions">
            {totalAttempts > 0 && (
              <button
                id="clear-history-btn"
                className="btn btn-secondary btn-sm"
                onClick={() => setShowClearConfirm(true)}
              >
                Clear History
              </button>
            )}
            <button id="history-home-btn" className="history-back-link" onClick={onGoHome}>
              ← Home
            </button>
          </div>
        </div>
      </header>

      <div className="history-body">
        {totalAttempts > 0 && (
          <div className="history-summary-row">
            <div className="history-stat-pill">
              <div className="history-stat-pill-value">{totalAttempts}</div>
              <div className="history-stat-pill-label">Attempts</div>
            </div>
            <div className="history-stat-pill">
              <div className="history-stat-pill-value">{avgScore}%</div>
              <div className="history-stat-pill-label">Avg Score</div>
            </div>
            <div className="history-stat-pill">
              <div className="history-stat-pill-value">{bestScore}%</div>
              <div className="history-stat-pill-label">Best Score</div>
            </div>
          </div>
        )}

        {totalAttempts === 0 ? (
          <div className="history-empty">
            <div className="history-empty-icon">📋</div>
            <h2 className="history-empty-title">No attempts yet</h2>
            <p className="history-empty-sub">
              Complete your first exam and your results will appear here.
            </p>
            <button id="empty-state-home-btn" className="btn btn-primary" onClick={onGoHome}>
              Start an Exam
            </button>
          </div>
        ) : (
          <div className="history-table-wrap">
            <table className="history-table" aria-label="Past exam attempts">
              <thead>
                <tr>
                  <th scope="col">Subject</th>
                  <th scope="col">Score</th>
                  <th scope="col">Time Taken</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id}>
                    <td>
                      <div className="history-subject-cell">
                        <span className="history-subject-icon" aria-hidden="true">
                          {SUBJECT_ICONS[h.subject] || '📝'}
                        </span>
                        {h.subject.charAt(0).toUpperCase() + h.subject.slice(1).replace('english', 'English Language')}
                      </div>
                    </td>
                    <td className={`history-score-cell ${scoreClass(h.score, h.total)}`}>
                      {h.score} / {h.total}
                      {' '}
                      <span style={{ fontWeight: 400, color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>
                        ({Math.round((h.score / h.total) * 100)}%)
                      </span>
                    </td>
                    <td className="history-time-cell">{formatTime(h.timeTaken)}</td>
                    <td className="history-date-cell">{formatDate(h.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Clear Confirm Modal */}
      {showClearConfirm && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="clear-modal-title">
          <div className="modal-box">
            <div className="modal-icon" aria-hidden="true">🗑️</div>
            <h2 className="modal-title" id="clear-modal-title">Clear History?</h2>
            <p className="modal-body">
              This will permanently delete all {totalAttempts} attempt{totalAttempts !== 1 ? 's' : ''}
              from your device. This cannot be undone.
            </p>
            <div className="clear-confirm-row">
              <button
                id="cancel-clear-btn"
                className="btn btn-secondary"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button
                id="confirm-clear-btn"
                className="btn btn-danger"
                onClick={handleClear}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
