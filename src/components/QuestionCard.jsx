export default function QuestionCard({ question, index, total, answer, isFlagged, onSelect }) {
  if (!question) return null;

  return (
    <div className="question-card" key={question.id}>
      <div className="question-number-badge">
        <span>Question {index + 1} of {total}</span>
        {isFlagged && <span className="question-flag-dot" title="Flagged for review" />}
      </div>

      <p className="question-text">{question.question}</p>

      <div className="options-list" role="radiogroup" aria-label="Answer options">
        {question.options.map((optionText) => {
          const letter = optionText.charAt(0); // 'A', 'B', 'C', or 'D'
          const selected = answer === letter;
          return (
            <button
              key={letter}
              id={`option-${question.id}-${letter}`}
              role="radio"
              aria-checked={selected}
              className={`option-btn${selected ? ' selected' : ''}`}
              onClick={() => onSelect(question.id, letter)}
            >
              <span className="option-letter" aria-hidden="true">{letter}</span>
              <span className="option-text">{optionText.slice(3)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
