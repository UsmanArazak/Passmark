export default function Timer({ timeLeft }) {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  const urgent = timeLeft <= 300; // last 5 minutes

  return (
    <div className={`timer${urgent ? ' urgent' : ''}`} aria-label={`Time remaining: ${minutes} minutes ${seconds} seconds`}>
      <span className="timer-icon" aria-hidden="true">⏱</span>
      <span className="timer-value">{minutes}:{seconds}</span>
    </div>
  );
}
