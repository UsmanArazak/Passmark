import { useState, useEffect, useRef, useCallback } from 'react';

const EXAM_DURATION = 30 * 60; // 1800 seconds

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function useExamState(rawQuestions, onTimeUp) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: 'A'|'B'|'C'|'D' }
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [submitted, setSubmitted] = useState(false);
  const [startTime] = useState(Date.now());
  const intervalRef = useRef(null);

  // Shuffle questions once on mount
  useEffect(() => {
    if (rawQuestions && rawQuestions.length > 0) {
      setQuestions(shuffle(rawQuestions));
    }
  }, [rawQuestions]);

  // Timer
  useEffect(() => {
    if (submitted) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setSubmitted(true);
          onTimeUp && onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [submitted, onTimeUp]);

  const selectAnswer = useCallback((questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  }, []);

  const toggleFlag = useCallback((questionId) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  }, []);

  const goTo = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
  }, [questions.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const submit = useCallback(() => {
    clearInterval(intervalRef.current);
    setSubmitted(true);
  }, []);

  const timeTaken = Math.floor((Date.now() - startTime) / 1000);

  const score = questions.reduce((acc, q) => {
    const letter = answers[q.id];
    return acc + (letter === q.answer ? 1 : 0);
  }, 0);

  return {
    questions,
    currentIndex,
    answers,
    flagged,
    timeLeft,
    submitted,
    score,
    timeTaken,
    selectAnswer,
    toggleFlag,
    goTo,
    goNext,
    goPrev,
    submit,
  };
}
