'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Snackbar } from '@mui/material';

const danceMoves = ['🕺', '💃', '👯‍♂️', '🤸‍♀️'];

const ReactionGame = () => {
  const [currentMove, setCurrentMove] = useState<string>('');
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Wenn das Spiel gestartet wird
  useEffect(() => {
    if (isGameActive) {
      const interval = setInterval(() => {
        const randomMove = danceMoves[Math.floor(Math.random() * danceMoves.length)];
        setCurrentMove(randomMove);
        setStartTime(Date.now()); // Startzeit für Reaktion setzen
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isGameActive]);

  const handleMove = (move: string) => {
    if (move === currentMove) {
      const reaction = Date.now() - startTime!;
      setReactionTime(reaction);
      setScore(score + 1);
      setFeedbackMessage(`Super! Du hast in ${reaction} ms reagiert! 💃🕺`);
      setSnackbarOpen(true);
    } else {
      setFeedbackMessage(`Oh nein! Das war falsch. Versuch's noch einmal! 😅`);
      setSnackbarOpen(true);
    }
  };

  const handleStart = () => {
    setIsGameActive(true);
    setScore(0);
    setFeedbackMessage('');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '40px',
        fontFamily: '"Comic Sans MS", sans-serif',
        borderRadius: '10px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
        backgroundColor: isGameActive ? '#fff' : '#f0f5f5',
      }}
    >
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
        }}>
          Tanz-Maschine! 💃🕺
        </Typography>
      </Box>

      <Typography variant="h5" sx={{ marginBottom: '20px', color: '#34495e', fontSize: '1.5rem' }}>
        Dein Punktestand: {score}
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: '20px', color: '#34495e', fontSize: '2rem' }}>
        {isGameActive ? 'Mach den Tanz! 👯‍♂️' : 'Drücke Start, um zu Tanzen!'}
      </Typography>

      <Button
        onClick={handleStart}
        sx={{
          backgroundColor: '#e67e22',
          fontSize: '2rem',
          padding: '20px',
          borderRadius: '10px',
          color: '#fff',
          '&:hover': { backgroundColor: '#d35400' },
        }}
      >
        Start
      </Button>

      {isGameActive && currentMove && (
        <Box sx={{ marginTop: '30px' }}>
          <Typography variant="h4" sx={{ fontSize: '4rem', transition: 'transform 0.5s ease' }}>
            {currentMove}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {danceMoves.map((move, index) => (
              <Button
                key={index}
                onClick={() => handleMove(move)}
                sx={{
                  fontSize: '3rem',
                  padding: '20px',
                  margin: '10px',
                  backgroundColor: '#2ecc71',
                  color: '#fff',
                  borderRadius: '15px',
                  '&:hover': { backgroundColor: '#27ae60', transform: 'scale(1.1)' },
                }}
              >
                {move}
              </Button>
            ))}
          </Box>
        </Box>
      )}

      {/* Anzeige für Feedback-Nachricht */}
      {feedbackMessage && (
        <Box sx={{ marginTop: '30px' }}>
          <Typography variant="h5" sx={{ color: '#2c3e50', fontSize: '1.5rem' }}>
            {feedbackMessage}
          </Typography>
        </Box>
      )}

      {/* Snackbar für Rückmeldungen */}
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={feedbackMessage}
        autoHideDuration={3000}
        sx={{
          backgroundColor: feedbackMessage.includes('falsch') ? '#e74c3c' : '#2ecc71',
        }}
      />
    </Box>
  );
};

export default ReactionGame;
