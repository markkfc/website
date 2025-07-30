import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [factoredForm, setFactoredForm] = useState('');
  const [standardForm, setStandardForm] = useState('');
  const [roots, setRoots] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [animate, setAnimate] = useState(false);
  const timerRef = useRef(null);

  const generateFoilQuestion = () => {
    const a = 1; // keep it simple: (x + m)(x + n)
    const m = Math.floor(Math.random() * 11) - 5; // -5 to 5
    const n = Math.floor(Math.random() * 11) - 5;

    const factored = `(x ${m >= 0 ? '+' : '-'} ${Math.abs(m)})(x ${n >= 0 ? '+' : '-'} ${Math.abs(n)})`;
    const b = m + n;
    const c = m * n;
    const standard = `x² ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = 0`;

    const rootStr = `x₁ = ${-m}, x₂ = ${-n}`;

    setFactoredForm(factored);
    setStandardForm(standard);
    setRoots(rootStr);
    setShowAnswer(false);
    setTimeLeft(20);
    setAnimate(false);
  };

  const handleNext = () => {
    clearInterval(timerRef.current);
    generateFoilQuestion();
  };

  const handleManualReveal = () => {
    clearInterval(timerRef.current);
    setShowAnswer(true);
    setAnimate(true);
  };

  useEffect(() => {
    generateFoilQuestion();
  }, []);

  useEffect(() => {
    if (showAnswer) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setShowAnswer(true);
          setAnimate(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [factoredForm]);

  return (
    <div className="App">
      <div className="timer">{timeLeft}s</div>

      <div className="container">
        <h1>FOIL Method Quadratics</h1>
        <div className="question">From: <strong>{factoredForm}</strong></div>
        <div className="question">Expanded: <strong>{standardForm}</strong></div>

        {showAnswer && (
          <div className={`answer ${animate ? 'pop' : ''}`}>
            Solution: {roots}
          </div>
        )}

        {!showAnswer && (
          <div className="buttons">
            <button onClick={handleManualReveal}>Show Answer</button>
          </div>
        )}

        <div className="buttons">
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
