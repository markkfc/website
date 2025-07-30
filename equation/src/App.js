import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [equation, setEquation] = useState('');
  const [answer, setAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const generateQuadraticWithRealRoots = () => {
    let a, b, c, discriminant;

    // Keep generating until we get a discriminant ≥ 0
    do {
      a = Math.floor(Math.random() * 5) + 1;     // 1 to 5
      b = Math.floor(Math.random() * 21) - 10;   // -10 to 10
      c = Math.floor(Math.random() * 21) - 10;   // -10 to 10
      discriminant = b * b - 4 * a * c;
    } while (discriminant < 0);

    const equationStr = `${a}x² ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = 0`;

    let solution = '';
    if (discriminant === 0) {
      const x = -b / (2 * a);
      solution = `One real root: x = ${x.toFixed(2)}`;
    } else {
      const sqrtD = Math.sqrt(discriminant);
      const x1 = (-b + sqrtD) / (2 * a);
      const x2 = (-b - sqrtD) / (2 * a);
      solution = `Two real roots: x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
    }

    setEquation(equationStr);
    setAnswer(solution);
    setShowAnswer(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    generateQuadraticWithRealRoots();
  };

  useEffect(() => {
    generateQuadraticWithRealRoots();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Quadratic Equation Generator</h1>
        <div className="question">Equation: {equation}</div>
        {showAnswer && <div className="answer">{answer}</div>}
        <div className="buttons">
          <button onClick={handleShowAnswer}>Show Answer</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
