'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const Millionär = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const isGameFinished = currentQuestionIndex === questions.length - 1 && answered;

  useEffect(() => {
    fetch('https://flytomoon93.github.io/CV/questions.json')
      .then(response => response.json())
      .then(data => {
        console.log("Geladene Fragen:", data);
        const randomQuestions = data.sort(() => Math.random() - 0.5).slice(0, 10);  // 10 zufällige Fragen
        setQuestions(randomQuestions);
      })
      .catch(error => {
        console.error("Fehler beim Laden der Fragen:", error);
      });
  }, [isGameFinished]);
  
  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
      setFeedback('Richtig! 🎉 Dein Büro-Wissen ist beeindruckend.');
    } else {
      setFeedback(`Leider falsch. Die richtige Antwort ist: ${questions[currentQuestionIndex].correctAnswer}. 😔 Versuch nochmal!`);
    }
    setAnswered(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
      setFeedback('');
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswered(false);
    setFeedback('');
  };

  if (questions.length === 0) {
    return <Typography style={{color:'white'}} variant="h5"> Wer wird Büro-Millionär?...</Typography>;
  }

  return (
    <div id='spielen'>
      <Box sx={{ textAlign: 'center', padding: '40px', backgroundColor: '#f0f5f5', fontFamily: '"Comic Sans MS", sans-serif' }}>
        
        {/* Fester Container für den Titel */}
        <Box sx={{
          width: '100%',
          backgroundColor: '#f7f7f7',
          padding: '40px',
          textAlign: 'center',
          borderBottom: '2px solid #ddd',
        }}>
          <Typography variant="h3" sx={{
            fontWeight: 'bold',
            color: '#9b59b6',
            fontSize: '3rem',
            letterSpacing: '2px',
          }}>
            Wer wird Büro-Millionär? 💼
          </Typography>
        </Box>

        <Paper sx={{ padding: '40px', margin: '0 auto', maxWidth: '700px', backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h6" sx={{ marginBottom: '20px', color: '#34495e', fontSize: '1.2rem', fontWeight: 'bold' }}>
            Frage {currentQuestionIndex + 1} von {questions.length}
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: '20px', fontSize: '1.6rem', lineHeight: '1.5' }}>
            {questions[currentQuestionIndex].question}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <Button
                key={index}
                variant="contained"
                sx={{
                  backgroundColor: '#e67e22',
                  color: '#fff',
                  fontFamily: '"Comic Sans MS", sans-serif', // Gleiche Schriftart wie die Frage
                  fontSize: '1rem', // Kleinere Schriftgröße
                  fontWeight: 'normal', // Normales Gewicht für die Schrift
                  padding: '12px 24px',
                  textTransform: 'none', // Keine Großbuchstaben
                  '&:hover': { backgroundColor: '#d35400' },
                  borderRadius: '12px',
                  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
                }}
                onClick={() => handleAnswer(option)}
                disabled={answered}
              >
                {option}
              </Button>
            ))}
          </Box>

          {feedback && (
            <Box sx={{ marginTop: '20px', padding: '15px', backgroundColor: feedback.includes('Richtig') ? '#c8e6c9' : '#f8d7da', borderRadius: '12px' }}>
              <Typography variant="body1" sx={{ color: feedback.includes('Richtig') ? '#388e3c' : '#d32f2f', fontWeight: 'bold' }}>
                {feedback}
              </Typography>
            </Box>
          )}

          {!isGameFinished ? (
            <Button
              variant="contained"
              sx={{
                marginTop: '30px',
                backgroundColor: '#2ecc71',
                '&:hover': { backgroundColor: '#27ae60' },
                fontWeight: 'bold',
                padding: '15px 30px',
                fontSize: '1.2rem',
                borderRadius: '12px',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
              }}
              onClick={nextQuestion}
              disabled={!answered}
            >
              Nächste Frage
            </Button>
          ) : (
            <Box sx={{ marginTop: '30px', padding: '20px', backgroundColor: '#ffd54f', borderRadius: '12px' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Spiel beendet!</Typography>
              <Typography variant="h6" sx={{ color: '#333' }}>
                Dein Punktestand: {score} von {questions.length}
              </Typography>
              <Typography variant="body1" sx={{ color: '#333' }}>
                {score === questions.length
                  ? 'Du bist der Büro-Weltmeister! 🏆'
                  : 'Du hast es fast geschafft! Versuch es noch einmal, um das Büro zu erobern! 💪'}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  marginTop: '20px',
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#1565c0' },
                  padding: '12px 24px',
                  fontSize: '1.1rem',
                  borderRadius: '12px',
                  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                }}
                onClick={resetGame}
              >
                Neues Spiel
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default Millionär;
