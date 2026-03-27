export default function QuestionNav({ questions, answers, flagged, currentIndex, onGoTo }) {
  return (
    <>
      <div className="question-nav-grid" role="navigation" aria-label="Question navigation">
        {questions.map((q, i) => {
          const isAnswered = !!answers[q.id];
          const isFlagged  = flagged.has(q.id);
          const isCurrent  = i === currentIndex;

          let statusClass = 'unanswered';
          if (isFlagged) statusClass = 'flagged';
          else if (isAnswered) statusClass = 'answered';

          return (
            <button
              key={q.id}
              id={`qnav-${i + 1}`}
              className={`qnav-btn ${statusClass}${isCurrent ? ' current' : ''}`}
              onClick={() => onGoTo(i)}
              aria-label={`Question ${i + 1}${isFlagged ? ', flagged' : isAnswered ? ', answered' : ''}`}
              aria-current={isCurrent ? 'true' : undefined}
              title={`Question ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="qnav-legend" aria-hidden="true">
        <div className="legend-item">
          <span className="legend-dot answered" />
          <span>Answered</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot flagged" />
          <span>Flagged</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot unanswered" />
          <span>Unanswered</span>
        </div>
      </div>
    </>
  );
}
