import { useState } from 'react';
import '../styles/home.css';

const SUBJECTS = [
  { id: 'physics',     name: 'Physics',          icon: '⚛️',  meta: '40 Questions · 30 min' },
  { id: 'chemistry',   name: 'Chemistry',         icon: '🧪',  meta: '40 Questions · 30 min' },
  { id: 'biology',     name: 'Biology',           icon: '🧬',  meta: '40 Questions · 30 min' },
  { id: 'mathematics', name: 'Mathematics',       icon: '📐',  meta: '40 Questions · 30 min' },
  { id: 'english',     name: 'English Language',  icon: '📖',  meta: '40 Questions · 30 min' },
];

export default function HomePage({ onStart, onViewHistory }) {
  const [name, setName]         = useState('');
  const [subject, setSubject]   = useState('');
  const [nameError, setNameError] = useState('');
  const [subjectError, setSubjectError] = useState('');

  function handleStart() {
    let valid = true;
    if (!name.trim()) {
      setNameError('Please enter your full name.');
      valid = false;
    } else {
      setNameError('');
    }
    if (!subject) {
      setSubjectError('Please select a subject to continue.');
      valid = false;
    } else {
      setSubjectError('');
    }
    if (!valid) return;
    onStart({ name: name.trim(), subject });
  }

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-logo">
          <div className="home-hero-logo-mark">P</div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Pasmark</span>
        </div>
        <h1 className="home-hero-title">JAMB CBT Mock Exam</h1>
        <p className="home-hero-sub">Practice like it's the real thing. No distractions. No shortcuts.</p>
        <div className="home-meta-strip">
          <div className="home-meta-item">
            <span className="home-meta-icon">📝</span>
            40 Questions
          </div>
          <div className="home-meta-item">
            <span className="home-meta-icon">⏱</span>
            30 Minutes
          </div>
          <div className="home-meta-item">
            <span className="home-meta-icon">📊</span>
            Instant Results
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="home-form-section">
        <div className="home-form-card">
          {/* Name */}
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="student-name" className="form-label">Your Full Name</label>
            <input
              id="student-name"
              type="text"
              className="form-input"
              placeholder="e.g. Adaeze Okonkwo"
              value={name}
              onChange={(e) => { setName(e.target.value); setNameError(''); }}
              autoComplete="name"
              maxLength={80}
            />
            {nameError && <p className="form-error" role="alert">{nameError}</p>}
          </div>

          <hr className="home-divider" />

          {/* Subject */}
          <div style={{ marginBottom: '28px' }}>
            <p className="form-section-title">Select a Subject</p>
            <div className="subject-grid">
              {SUBJECTS.map((s) => (
                <button
                  key={s.id}
                  id={`subject-${s.id}`}
                  className={`subject-card${subject === s.id ? ' selected' : ''}`}
                  onClick={() => { setSubject(s.id); setSubjectError(''); }}
                  aria-pressed={subject === s.id}
                >
                  <div className="subject-card-icon" aria-hidden="true">{s.icon}</div>
                  <div className="subject-card-name">{s.name}</div>
                  <div className="subject-card-meta">{s.meta}</div>
                </button>
              ))}
            </div>
            {subjectError && <p className="form-error" role="alert">{subjectError}</p>}
          </div>

          {/* Start */}
          <button id="start-exam-btn" className="btn btn-primary home-start-btn" onClick={handleStart}>
            Start Exam →
          </button>

          {/* History link */}
          <button className="home-history-link" onClick={onViewHistory} id="view-history-btn">
            <span>📋</span>
            View past attempts
          </button>
        </div>
      </section>

      <footer className="home-footer">
        <p>Pasmark · JAMB CBT Practice Tool · 2026</p>
      </footer>
    </div>
  );
}
