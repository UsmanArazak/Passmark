import { useState } from 'react';
import '../styles/home.css';

const SCIENCE_SUBJECTS = [
  { id: 'physics',     name: 'Physics',          icon: '⚛️' },
  { id: 'chemistry',   name: 'Chemistry',         icon: '🧪' },
  { id: 'biology',     name: 'Biology',           icon: '🧬' },
  { id: 'mathematics', name: 'Mathematics',       icon: '📐' },
  { id: 'english',     name: 'English Language',  icon: '📖' },
];

const ART_SUBJECTS = [
  { id: 'literature',     name: 'Literature',       icon: '📜' },
  { id: 'government',     name: 'Government',       icon: '🏛️' },
  { id: 'history',        name: 'History',          icon: '🗺️' },
  { id: 'islamicstudies', name: 'Islamic Studies',  icon: '🌙' },
  { id: 'english',        name: 'English Language', icon: '📖' },
];

export default function HomePage({ onStart, onViewHistory }) {
  const [name, setName]           = useState('');
  const [subject, setSubject]     = useState('');
  const [nameError, setNameError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);

  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem('pasmark_welcome_seen'));
  const [showAIAlert, setShowAIAlert] = useState(() => !localStorage.getItem('pasmark_ai_alert_seen'));

  const dismissWelcome = () => {
    localStorage.setItem('pasmark_welcome_seen', 'true');
    setShowWelcome(false);
  };
  const dismissAIAlert = () => {
    localStorage.setItem('pasmark_ai_alert_seen', 'true');
    setShowAIAlert(false);
  };

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
          
          {/* Alerts */}
          {(showWelcome || showAIAlert) && (
            <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {showWelcome && (
                <div className="alert alert-success animate-fadeInDown">
                  <div className="alert-content">
                    <strong>👋 Welcome to Pasmark!</strong> Enter your name below to dive into your personalized JAMB mock experience.
                  </div>
                  <button onClick={dismissWelcome} className="alert-close" aria-label="Close">×</button>
                </div>
              )}
              {showAIAlert && (
                <div className="alert alert-info animate-fadeInDown">
                  <div className="alert-content">
                    <strong>🤖 Quick Note:</strong> The current questions are AI-generated to test the system. Real past JAMB questions will be uploaded soon!
                  </div>
                  <button onClick={dismissAIAlert} className="alert-close" aria-label="Close">×</button>
                </div>
              )}
            </div>
          )}

          {/* Name */}
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="student-name" className="form-label">Your Full Name</label>
            <input
              id="student-name"
              type="text"
              className="form-input"
              placeholder="e.g. Usman Arazak"
              value={name}
              onChange={(e) => { setName(e.target.value); setNameError(''); }}
              autoComplete="name"
              maxLength={80}
            />
            {nameError && <p className="form-error" role="alert">{nameError}</p>}
          </div>

          <hr className="home-divider" />

          {/* Subject sections */}
          <div style={{ marginBottom: '28px' }}>
            <p className="form-section-title">Select a Category</p>

            {/* Category Cards */}
            <div className="category-cards-wrapper">
              <button 
                type="button"
                className={`category-card science-category ${expandedSection === 'science' ? 'active' : ''}`}
                onClick={() => setExpandedSection(prev => prev === 'science' ? null : 'science')}
                aria-expanded={expandedSection === 'science'}
              >
                <div className="category-icon">🔬</div>
                <div className="category-name">Science</div>
                <div className="category-caret">{expandedSection === 'science' ? '▲' : '▼'}</div>
              </button>

              <button 
                type="button"
                className={`category-card art-category ${expandedSection === 'art' ? 'active' : ''}`}
                onClick={() => setExpandedSection(prev => prev === 'art' ? null : 'art')}
                aria-expanded={expandedSection === 'art'}
              >
                <div className="category-icon">🎨</div>
                <div className="category-name">Art</div>
                <div className="category-caret">{expandedSection === 'art' ? '▲' : '▼'}</div>
              </button>
            </div>

            {/* Science Dropdown Content */}
            {expandedSection === 'science' && (
              <div className="dropdown-content animate-slideDown category-expanded-container science-expanded">
                <div className="subject-grid">
                  {SCIENCE_SUBJECTS.map((s) => (
                    <button
                      key={`sci-${s.id}`}
                      id={`subject-sci-${s.id}`}
                      className={`subject-card${subject === `sci-${s.id}` ? ' selected' : ''}`}
                      onClick={() => { setSubject(`sci-${s.id}`); setSubjectError(''); }}
                      aria-pressed={subject === `sci-${s.id}`}
                    >
                      <div className="subject-card-icon" aria-hidden="true">{s.icon}</div>
                      <div className="subject-card-name">{s.name}</div>
                    </button>
                  ))}
                </div>
                <button className="btn btn-primary home-start-btn" onClick={handleStart}>
                  Start Science Exam →
                </button>
              </div>
            )}

            {/* Art Dropdown Content */}
            {expandedSection === 'art' && (
              <div className="dropdown-content animate-slideDown category-expanded-container art-expanded">
                <div className="subject-grid">
                  {ART_SUBJECTS.map((s) => (
                    <button
                      key={`art-${s.id}`}
                      id={`subject-art-${s.id}`}
                      className={`subject-card art-card${subject === `art-${s.id}` ? ' selected art-selected' : ''}`}
                      onClick={() => { setSubject(`art-${s.id}`); setSubjectError(''); }}
                      aria-pressed={subject === `art-${s.id}`}
                    >
                      <div className="subject-card-icon" aria-hidden="true">{s.icon}</div>
                      <div className="subject-card-name">{s.name}</div>
                    </button>
                  ))}
                </div>
                <button className="btn btn-primary home-start-btn" onClick={handleStart} style={{ backgroundColor: '#d97706', borderColor: '#d97706', boxShadow: 'none' }}>
                  Start Art Exam →
                </button>
              </div>
            )}

            {subjectError && <p className="form-error" role="alert">{subjectError}</p>}
          </div>

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
