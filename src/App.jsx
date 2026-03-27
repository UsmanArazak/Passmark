import { useState, useCallback } from 'react';
import HomePage    from './pages/HomePage';
import ExamPage    from './pages/ExamPage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';
import { saveAttempt } from './utils/storage';
import './styles/global.css';

// Dynamic import helpers
const QUESTION_LOADERS = {
  // Science
  physics:        () => import('./data/physics.json'),
  chemistry:      () => import('./data/chemistry.json'),
  biology:        () => import('./data/biology.json'),
  mathematics:    () => import('./data/mathematics.json'),
  english:        () => import('./data/english.json'),
  // Art
  literature:     () => import('./data/literature.json'),
  government:     () => import('./data/government.json'),
  history:        () => import('./data/history.json'),
  islamicstudies: () => import('./data/islamicstudies.json'),
};

export default function App() {
  const [screen, setScreen]           = useState('home');
  const [studentName, setStudentName] = useState('');
  const [subject, setSubject]         = useState('');
  const [questions, setQuestions]     = useState([]);
  const [result, setResult]           = useState(null);
  const [loading, setLoading]         = useState(false);

  const handleStart = useCallback(async ({ name, subject: sub }) => {
    setLoading(true);
    // Strip the section prefix (e.g. 'sci-physics' → 'physics', 'art-government' → 'government')
    const subjectKey = sub.replace(/^(sci|art)-/, '');
    try {
      const mod = await QUESTION_LOADERS[subjectKey]();
      setQuestions(mod.default);
      setStudentName(name);
      setSubject(subjectKey);
      setResult(null);
      setScreen('exam');
    } catch (err) {
      console.error('Failed to load questions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFinish = useCallback((examResult) => {
    const attempt = {
      id:          crypto.randomUUID(),
      studentName,
      subject,
      score:       examResult.score,
      total:       examResult.total,
      timeTaken:   examResult.timeTaken,
      date:        new Date().toISOString(),
    };
    saveAttempt(attempt);
    setResult(examResult);
    setScreen('results');
  }, [studentName, subject]);

  const handleRetry = useCallback(async () => {
    // Reload same subject with fresh shuffle
    setLoading(true);
    try {
      const mod = await QUESTION_LOADERS[subject]();
      setQuestions(mod.default);
      setResult(null);
      setScreen('exam');
    } finally {
      setLoading(false);
    }
  }, [subject]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexDirection: 'column', gap: '16px',
        fontFamily: 'var(--font-sans)', color: 'var(--color-primary)',
      }}>
        <div style={{ fontSize: '2rem' }}>⏳</div>
        <p style={{ fontWeight: 600 }}>Loading questions…</p>
      </div>
    );
  }

  return (
    <>
      {screen === 'home' && (
        <HomePage
          onStart={handleStart}
          onViewHistory={() => setScreen('history')}
        />
      )}
      {screen === 'exam' && (
        <ExamPage
          studentName={studentName}
          subject={subject}
          questions={questions}
          onFinish={handleFinish}
        />
      )}
      {screen === 'results' && result && (
        <ResultsPage
          studentName={studentName}
          subject={subject}
          score={result.score}
          total={result.total}
          timeTaken={result.timeTaken}
          answers={result.answers}
          questions={result.questions}
          onRetry={handleRetry}
          onHome={() => setScreen('home')}
        />
      )}
      {screen === 'history' && (
        <HistoryPage onGoHome={() => setScreen('home')} />
      )}
    </>
  );
}
