export default function ProgressBar({ current, total }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="progress-bar-wrapper">
      <div className="progress-label">
        <span className="progress-label-text">Question Progress</span>
        <span className="progress-label-count">Question {current} of {total}</span>
      </div>
      <div className="progress-track" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
