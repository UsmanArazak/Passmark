export default function ConfirmModal({ answeredCount, totalCount, flaggedCount, onConfirm, onCancel }) {
  const unanswered = totalCount - answeredCount;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-box">
        <div className="modal-icon" aria-hidden="true">📋</div>
        <h2 className="modal-title" id="modal-title">Submit Exam?</h2>
        <p className="modal-body">
          You are about to submit your answers. This action cannot be undone.
        </p>

        <div className="modal-stats">
          <div className="modal-stat">
            <div className="modal-stat-value">{answeredCount}</div>
            <div className="modal-stat-label">Answered</div>
          </div>
          <div className="modal-stat">
            <div className="modal-stat-value" style={unanswered > 0 ? { color: 'var(--color-danger)' } : {}}>
              {unanswered}
            </div>
            <div className="modal-stat-label">Unanswered</div>
          </div>
          <div className="modal-stat">
            <div className="modal-stat-value" style={{ color: 'var(--color-accent)' }}>{flaggedCount}</div>
            <div className="modal-stat-label">Flagged</div>
          </div>
        </div>

        <div className="modal-actions">
          <button id="modal-cancel-btn" className="btn btn-secondary" onClick={onCancel}>
            Continue Exam
          </button>
          <button id="modal-submit-btn" className="btn btn-primary" onClick={onConfirm}>
            Submit Now
          </button>
        </div>
      </div>
    </div>
  );
}
