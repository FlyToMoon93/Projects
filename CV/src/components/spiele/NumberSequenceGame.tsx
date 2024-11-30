'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, TextField } from '@mui/material';

// Funktion zur Generierung von Zahlenreihen
const generateSequence = (difficulty: number): { sequence: number[]; answer: number } => {
    switch (difficulty) {
      case 1: // Einfache arithmetische Reihen
        const start = Math.floor(Math.random() * 10);
        const step = Math.floor(Math.random() * 5) + 1;
        return { sequence: [start, start + step, start + 2 * step], answer: start + 3 * step };
        
      case 2: // Geometrische Reihen
        const base = Math.floor(Math.random() * 5) + 2;
        return { sequence: [base, base * 2, base * 4], answer: base * 8 };
  
      case 3: // Fibonacci-Reihen
        const fib = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        for (let i = 2; i < 4; i++) {
          fib.push(fib[i - 1] + fib[i - 2]);
        }
        return { sequence: fib.slice(0, 4), answer: fib[3] + fib[2] };
  
      case 4: // Quadratische Reihen (n²)
        const n = Math.floor(Math.random() * 5) + 1;
        return { sequence: [n, n * n, (n + 1) * (n + 1)], answer: (n + 2) * (n + 2) };
  
      case 5: // Mischmuster: Addition + Multiplikation
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 3) + 1;
        return { sequence: [a, a + b, (a + b) * b], answer: ((a + b) * b) + b };
  
      case 6: // Primzahlenreihen
        const primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
        const startIndex = Math.floor(Math.random() * (primeNumbers.length - 4));
        return {
          sequence: primeNumbers.slice(startIndex, startIndex + 3),
          answer: primeNumbers[startIndex + 3],
        };
  
      case 7: // Schwierige arithmetische Reihe mit dynamischem Schritt
        const start7 = Math.floor(Math.random() * 10);
        const dynamicStep = Math.floor(Math.random() * 3) + 2; // Schritt ändert sich
        return {
          sequence: [
            start7,
            start7 + dynamicStep,
            start7 + dynamicStep + (dynamicStep + 1),
          ],
          answer: start7 + dynamicStep + (dynamicStep + 1) + (dynamicStep + 2),
        };
  
      default: // Fallback (falls Schwierigkeit nicht definiert)
        return { sequence: [1, 2, 3], answer: 4 };
    }
  };
  

const NumberSequenceGame = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number>(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [answered, setAnswered] = useState(false);
  const [difficulty, setDifficulty] = useState(1);

  const [questionTimeLeft, setQuestionTimeLeft] = useState(20); // Zeit für jede Frage
  const [gameOver, setGameOver] = useState(false);

  // Neue Frage generieren
  const loadNewQuestion = () => {
    const { sequence, answer } = generateSequence(difficulty);
    setSequence(sequence);
    setAnswer(answer);
    setUserInput('');
    setFeedback('');
    setAnswered(false);
    setQuestionTimeLeft(20);
  };

  useEffect(() => {
    loadNewQuestion();
  }, []);

  // Timer für die Frage
  useEffect(() => {
    if (answered || gameOver) return;

    const timer = setInterval(() => {
      setQuestionTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFeedback('⏱️ Zeit abgelaufen für diese Frage!');
          setAnswered(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answered, gameOver]);

  // Antwort prüfen
  const handleAnswer = () => {
    const parsedInput = parseInt(userInput, 10);
    if (parsedInput === answer) {
      setFeedback('🎉 Richtig!');
      setScore((prev) => prev + 1);

      // Schwierigkeit erhöhen nach jeweils 5 Punkten
      if ((score + 1) % 5 === 0) setDifficulty((prev) => prev + 1);
    } else {
      setFeedback(`❌ Falsch! Die richtige Antwort war ${answer}.`);
    }
    setAnswered(true);
  };

  // Nächste Frage laden
  const handleNextQuestion = () => {
    loadNewQuestion();
  };

  return (
    <div id="spielen">
      <Box sx={{ textAlign: 'center', padding: '40px', backgroundColor: '#f0f5f5', fontFamily: '"Comic Sans MS", sans-serif' }}>
        
        {/* Titel */}
        <Box sx={{ width: '100%', backgroundColor: '#f7f7f7', padding: '40px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#9b59b6', fontSize: '3rem', letterSpacing: '2px' }}>
            Zahlen-Folgen-Spiel 🔢
          </Typography>
        </Box>

        <Paper
          sx={{
            padding: '40px',
            margin: '0 auto',
            maxWidth: '700px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          {!gameOver ? (
            <>
              {/* Timer und Punktestand */}
              <Typography variant="h6" sx={{ marginBottom: '20px', color: '#34495e', fontSize: '1.2rem', fontWeight: 'bold' }}>
                Schwierigkeitsgrad: {difficulty} | Punktestand: {score}
              </Typography>
              <Typography variant="h6" sx={{ color: '#e74c3c' }}>
                Verbleibende Fragezeit: {questionTimeLeft}s
              </Typography>

              {/* Zahlenreihe */}
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: '20px', fontSize: '1.6rem', lineHeight: '1.5' }}>
                Zahlenreihe: {sequence.join(', ')} ?
              </Typography>

              {/* Eingabefeld */}
              <TextField
                type="number"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                sx={{
                  width: '100%',
                  marginBottom: '20px',
                  '& input': { textAlign: 'center', fontSize: '1.5rem' },
                }}
                disabled={answered}
              />

              {/* Antwort-Button */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#2ecc71',
                    '&:hover': { backgroundColor: '#27ae60' },
                    fontWeight: 'bold',
                    padding: '15px 30px',
                    fontSize: '1.2rem',
                    borderRadius: '12px',
                  }}
                  onClick={handleAnswer}
                  disabled={answered}
                >
                  Bestätigen
                </Button>
                {answered && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#3498db',
                      '&:hover': { backgroundColor: '#2980b9' },
                      fontWeight: 'bold',
                      padding: '15px 30px',
                      fontSize: '1.2rem',
                      borderRadius: '12px',
                    }}
                    onClick={handleNextQuestion}
                  >
                    Nächste Frage
                  </Button>
                )}
              </Box>

              {/* Feedback */}
              {feedback && (
                <Box sx={{ marginTop: '20px', padding: '15px', backgroundColor: feedback.includes('Richtig') ? '#c8e6c9' : '#f8d7da', borderRadius: '12px' }}>
                  <Typography variant="body1" sx={{ color: feedback.includes('Richtig') ? '#388e3c' : '#d32f2f', fontWeight: 'bold' }}>
                    {feedback}
                  </Typography>
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ marginTop: '30px', padding: '20px', backgroundColor: '#ffd54f', borderRadius: '12px' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Spiel beendet!</Typography>
              <Typography variant="h6" sx={{ color: '#333' }}>
                Dein Punktestand: {score}
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default NumberSequenceGame;
