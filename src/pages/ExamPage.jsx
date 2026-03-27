import { useState, useCallback } from 'react';
import { useExamState } from '../hooks/useExamState';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import QuestionNav from '../components/QuestionNav';
import ConfirmModal from '../components/ConfirmModal';
import '../styles/exam.css';

export default function ExamPage({ studentName, subject, questions: rawQuestions, onFinish }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleTimeUp = useCallback(() => {
    finishExam();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exam = useExamState(rawQuestions, handleTimeUp);

  function finishExam() {
    onFinish({
      score: exam.score,
      total: exam.questions.length,
      timeTaken: exam.timeTaken,
      answers: exam.answers,
      questions: exam.questions,
    });
  }

  function handleSubmitConfirm() {
    exam.submit();
    setShowConfirm(false);
    finishExam();
  }

  const current   = exam.questions[exam.currentIndex];
  const answered  = Object.keys(exam.answers).length;
  const flaggedC  = exam.flagged.size;

  const subjectLabel = subject.charAt(0).toUpperCase() + subject.slice(1).replace('english', 'English Language');

  return (
    <div className="exam-page">
      {/* Top bar */}
      <header className="exam-topbar">
        <div className="exam-topbar-inner">
          <div className="exam-topbar-left">
            <span className="exam-topbar-subject">{subjectLabel}</span>
            <span className="exam-topbar-student">{studentName}</span>
          </div>
          <Timer timeLeft={exam.timeLeft} />
        </div>
      </header>

      {/* Main */}
      <main className="exam-body">
        {/* Left column */}
        <div className="exam-question-panel">
          <ProgressBar current={exam.currentIndex + 1} total={exam.questions.length} />

          <QuestionCard
            question={current}
            index={exam.currentIndex}
            total={exam.questions.length}
            answer={current ? exam.answers[current.id] : null}
            isFlagged={current ? exam.flagged.has(current.id) : false}
            onSelect={exam.selectAnswer}
          />

          {/* Nav actions */}
          <div className="exam-actions">
            <div className="exam-actions-left">
              <button
                id="prev-btn"
                className="btn btn-secondary btn-sm"
                onClick={exam.goPrev}
                disabled={exam.currentIndex === 0}
              >
                ← Prev
              </button>
              <button
                id="next-btn"
                className="btn btn-secondary btn-sm"
                onClick={exam.goNext}
                disabled={exam.currentIndex === exam.questions.length - 1}
              >
                Next →
              </button>
            </div>
            <div className="exam-actions-right">
              {current && (
                <button
                  id="flag-btn"
                  className={`btn-flag${exam.flagged.has(current.id) ? ' flagged' : ''}`}
                  onClick={() => exam.toggleFlag(current.id)}
                >
                  🚩 {exam.flagged.has(current.id) ? 'Unflag' : 'Flag'}
                </button>
              )}
              <button
                id="submit-btn"
                className="btn btn-primary btn-sm"
                onClick={() => setShowConfirm(true)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <aside className="exam-side-panel" aria-label="Exam navigation">
          <div className="side-panel-card">
            <p className="side-panel-title">Questions</p>
            <QuestionNav
              questions={exam.questions}
              answers={exam.answers}
              flagged={exam.flagged}
              currentIndex={exam.currentIndex}
              onGoTo={exam.goTo}
            />
          </div>

          <div className="side-panel-card side-submit-box">
            <button
              id="side-submit-btn"
              className="btn btn-primary side-submit-btn"
              onClick={() => setShowConfirm(true)}
            >
              Submit Exam
            </button>
            <p className="side-submit-note">{answered} of {exam.questions.length} answered</p>
          </div>
        </aside>
      </main>

      {/* Confirm modal */}
      {showConfirm && (
        <ConfirmModal
          answeredCount={answered}
          totalCount={exam.questions.length}
          flaggedCount={flaggedC}
          onConfirm={handleSubmitConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
