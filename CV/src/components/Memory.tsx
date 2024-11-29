import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const imageSets = {
  fruits: ['🍎', '🍎', '🍌', '🍌', '🍒', '🍒', '🍉', '🍉', '🍓', '🍓', '🍍', '🍍', '🥭', '🥭', '🍑', '🍑'],
  animals: ['🐶', '🐶', '🐱', '🐱', '🐯', '🐯', '🐴', '🐴', '🐘', '🐘', '🐱‍🏍', '🐱‍🏍', '🦁', '🦁', '🐸', '🐸'],
  emojis: ['😂', '😂', '😍', '😍', '😎', '😎', '😜', '😜', '🥺', '🥺', '😊', '😊', '🤩', '🤩', '😏', '😏'],
};

type ImageSetKey = 'fruits' | 'animals' | 'emojis';

const shuffleArray = (array: string[]): string[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
};

const Memory = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [selectedSet, setSelectedSet] = useState<ImageSetKey>('fruits');
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;

    // Mischen des Kartendecks bei Spielbeginn
    const shuffledCards = shuffleArray([...imageSets[selectedSet]]);
    setCards(shuffledCards);

    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setGameOver(true);  // Spiel ist vorbei, weil der Timer abgelaufen ist
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameStarted, selectedSet]);

  const flipCard = (index: number) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || gameOver) return;

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);

      if (cards[newFlippedIndices[0]] === cards[newFlippedIndices[1]]) {
        setMatchedCards([...matchedCards, ...newFlippedIndices]);
        setFlippedIndices([]); // Sofort zurücksetzen
      } else {
        setTimeout(() => setFlippedIndices([]), 1000);
      }
    }
  };

  const resetGame = () => {
    // Mischen der Karten und Zurücksetzen aller Zustände
    const shuffledCards = shuffleArray([...imageSets[selectedSet]]);
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(60);
    setGameOver(false);
    setGameWon(false);
    setGameStarted(false);
  };

  const renderCard = (index: number) => {
    if (flippedIndices.includes(index) || matchedCards.includes(index)) {
      return cards[index];
    }
    return '❓';
  };

  useEffect(() => {
    // Spiel gewonnen, wenn alle Karten gematcht sind und der Timer noch läuft
    if (matchedCards.length === cards.length && timer > 0) {
      setGameWon(true);
      setOpenSnack(true);
    }
  }, [matchedCards, timer, cards]);

  return (
    <Box sx={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f5f5', fontFamily: '"Comic Sans MS", sans-serif' }}>
      <Box sx={{ width: '100%', backgroundColor: '#f7f7f7', padding: '20px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#9b59b6', fontSize: { xs: '2rem', sm: '3rem' }, letterSpacing: '2px' }}>
          Memory-Spiel
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ marginBottom: '15px', color: '#34495e', fontSize: { xs: '1rem', sm: '1.5rem' } }}>
        Versuche, alle Paare zu finden! Bewegungen: {moves}
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: '15px', color: '#e74c3c', fontSize: { xs: '1rem', sm: '1.5rem' } }}>
        Zeit: {timer}s
      </Typography>
      <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
        <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', sm: '1.2rem' } }}>
          Wähle ein Thema:
        </Typography>
        <RadioGroup
          row
          value={selectedSet}
          onChange={(e) => {
            if (!gameStarted) {
              setSelectedSet(e.target.value as ImageSetKey);
            }
          }}
        >
          <FormControlLabel value="fruits" control={<Radio />} label="Früchte" disabled={gameStarted} />
          <FormControlLabel value="animals" control={<Radio />} label="Tiere" disabled={gameStarted} />
          <FormControlLabel value="emojis" control={<Radio />} label="Emojis" disabled={gameStarted} />
        </RadioGroup>
      </FormControl>
      <Box sx={{ marginBottom: '20px' }}>
        <Button
          variant="contained"
          sx={{
            marginTop: '10px',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
            padding: { xs: '10px 20px', sm: '15px 30px' },
            fontSize: { xs: '1rem', sm: '1.2rem' },
          }}
          onClick={() => {
            setGameStarted(true);
          }}
          disabled={gameStarted}
        >
          Spiel starten
        </Button>
      </Box>
      {gameStarted && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(4, 1fr)', sm: 'repeat(4, 1fr)' }, gap: '10px' }}>
            {cards.map((_, index) => (
              <Button
                key={index}
                variant="outlined"
                sx={{
                  fontSize: '2rem',
                  height: { xs: '80px', sm: '100px' },
                  width: { xs: '80px', sm: '100px' },
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                  '&:hover': { backgroundColor: '#ffe6e6' },
                  transition: 'all 0.3s ease',
                  '&:disabled': { backgroundColor: '#e0e0e0' },
                }}
                onClick={() => flipCard(index)}
                disabled={flippedIndices.length >= 2 || matchedCards.includes(index) || gameOver}
              >
                {renderCard(index)}
              </Button>
            ))}
          </Box>
        </Box>
      )}
      {matchedCards.length === imageSets[selectedSet].length && (
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2ecc71', marginBottom: '20px', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            🎉 Glückwunsch! Du hast gewonnen! 🎉 Alle Paare gefunden! 🎉
          </Typography>
          <Button
            variant="contained"
            sx={{
              marginTop: '20px',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
              padding: '15px 30px',
              fontSize: '1.2rem',
              borderRadius: '12px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            }}
            onClick={resetGame}
          >
            Neues Spiel
          </Button>
        </Box>
      )}
      {gameOver && matchedCards.length !== imageSets[selectedSet].length && (
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#e74c3c', marginBottom: '20px', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Leider verloren! Die Zeit ist abgelaufen. ⏱️
          </Typography>
          <Button
            variant="contained"
            sx={{
              marginTop: '20px',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
              padding: '15px 30px',
              fontSize: '1.2rem',
              borderRadius: '12px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            }}
            onClick={resetGame}
          >
            Neues Spiel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Memory;
