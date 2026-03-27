import '../styles/results.css';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${String(s).padStart(2, '0')}s`;
}

function formatPct(score, total) {
  if (total === 0) return '0%';
  return `${Math.round((score / total) * 100)}%`;
}

export default function ResultsPage({ studentName, subject, score, total, timeTaken, answers, questions, onRetry, onHome }) {
  const subjectLabel = subject.charAt(0).toUpperCase() + subject.slice(1).replace('english', 'English Language');

  return (
    <div className="results-page">
      {/* Header */}
      <header className="results-header">
        <p className="results-header-label">Exam Complete</p>
        <h1 className="results-header-name">{studentName}</h1>
        <p className="results-header-sub">{subjectLabel} · JAMB Mock</p>
      </header>

      {/* Score section */}
      <section className="results-score-section" aria-label="Exam results summary">
        <div className="results-cards-row">
          <div className="results-score-card main">
            <p className="results-score-label">Your Score</p>
            <div className="results-score-value">
              {score}<span> / {total}</span>
            </div>
            <p className="results-score-sub">{formatPct(score, total)} correct</p>
          </div>
          <div className="results-score-card">
            <p className="results-score-label">Time Used</p>
            <div className="results-stat-value">{formatTime(timeTaken)}</div>
            <p className="results-score-sub">of 30 min</p>
          </div>
          <div className="results-score-card">
            <p className="results-score-label">Incorrect</p>
            <div className="results-stat-value" style={{ color: 'var(--color-danger)' }}>
              {total - score - (total - Object.keys(answers).length)}
            </div>
            <p className="results-score-sub">wrong answers</p>
          </div>
        </div>

        <div className="results-actions">
          <button id="retry-btn" className="btn btn-primary" onClick={onRetry}>
            Try Again
          </button>
          <button id="home-btn" className="btn btn-secondary" onClick={onHome}>
            ← Back to Home
          </button>
        </div>
      </section>

      {/* Review */}
      <section className="results-review-section" aria-label="Question review">
        <h2 className="results-review-title">
          Full Review
          <span className="results-review-count">{total} questions</span>
        </h2>

        {questions.map((q, i) => {
          const studentAnswer = answers[q.id];
          const isCorrect  = studentAnswer === q.answer;
          const isSkipped  = !studentAnswer;
          const status = isSkipped ? 'skipped' : isCorrect ? 'correct' : 'incorrect';

          return (
            <div key={q.id} className={`review-item ${status}`} id={`review-q${i + 1}`}>
              <div className="review-item-header">
                <span className="review-q-num">Q{i + 1}</span>
                <span className={`review-status-badge ${status}`}>
                  {status === 'correct'   && '✓ Correct'}
                  {status === 'incorrect' && '✗ Incorrect'}
                  {status === 'skipped'   && '— Skipped'}
                </span>
              </div>
              <div className="review-item-body">
                <p className="review-question-text">{q.question}</p>
                <div className="review-options">
                  {q.options.map((optText) => {
                    const letter = optText.charAt(0);
                    const isCorrectOpt  = letter === q.answer;
                    const isStudentOpt  = letter === studentAnswer;

                    let cls = 'review-option';
                    if (isCorrectOpt)               cls += ' correct-answer';
                    else if (isStudentOpt && !isCorrectOpt) cls += ' wrong-answer';

                    return (
                      <div key={letter} className={cls}>
                        <span className="review-option-icon" aria-hidden="true">
                          {isCorrectOpt ? '✓' : (isStudentOpt ? '✗' : '')}
                        </span>
                        {optText}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
