import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import AttentionGrabbing from './spiele/AttentionGrabbing';
import Memory from './spiele/Memory';
import ReactionGame from './spiele/ReactionGame';
import NumberSequenceGame from './spiele/NumberSequenceGame';

interface HeaderProps {
  onSectionChange: (section: string) => void;
  showprojekt: boolean | null;
  toggleProjects: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSectionChange, showprojekt, toggleProjects }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('über mich');  // Standard auf 'über mich'
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Effect, um sicherzustellen, dass beim Laden der Seite "Über mich" standardmäßig geöffnet ist
  useEffect(() => {
    setActiveSection('über mich');
    onSectionChange('über mich');  // Callback wird aufgerufen, um die "Über Mich"-Sektion zu laden
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSectionClick = (section: string) => {
    // Wenn der Abschnitt bereits aktiv ist, wird er zurückgesetzt
    if (activeSection !== section) {
      setActiveSection(section);
      if (section === 'spielen') {
        setSelectedGame(null); // Wenn 'spielen' ausgewählt wird, setze das Spiel zurück
      }
      onSectionChange(section); // Callback wird aufgerufen, um den Abschnitt zu wechseln
    }
  };

  const handleGameSelect = (game: string) => {
    setSelectedGame(game); // Setze das ausgewählte Spiel
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'rgba(35, 52, 70, 0.9)',
          backdropFilter: 'blur(80px)',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#fff',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '24px',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            Lebenslauf
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: '#fff',
                fontSize: '1.2rem',
                textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)',
              }}
            >
              Khalil Ibesh
            </Typography>

            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
              sx={{
                fontSize: '30px',
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '50%',
                padding: '10px',
                transition: 'transform 0.3s ease-in-out, background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  transform: 'scale(1.2)',
                },
              }}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>

        {menuOpen && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: 'rgba(52, 152, 219, 0.8)',
              paddingY: 1,
              transition: 'all 0.3s ease',
              animation: 'fadeIn 0.5s ease-out',
              '@media (min-width:600px)': {
                flexDirection: 'row',
              },
            }}
          >
            {['Über mich', 'Skills', 'Bildungsweg', 'Berufserfahrung', 'Kontakt'].map((text, index) => (
              <Button
                key={index}
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  marginX: 2,
                  padding: '10px 15px',
                  borderRadius: '20px',
                  backgroundColor: activeSection === text.toLowerCase() ? 'transparent' : 'transparent',
                  transition: 'background-color 0.3s ease, transform 0.3s ease, color 0.3s ease',
                  '&:hover': {
                    color: '#000',
                    transform: 'scale(1.05)',
                  },
                  
                }}
                onClick={() => handleSectionClick(text.toLowerCase())}
              >
                {text}
              </Button>
            ))}
          </Box>
        )}
      </AppBar>

      {/* Spiele-Auswahlmenü bleibt offen */}
      {activeSection === 'spielen' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            padding: '10px',
            borderRadius: '10px',
            margin: '10px',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h6" sx={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}>
            Wähle ein Spiel:
          </Typography>
          {['Tanz-Maschine!', 'Memory', 'Wer wird Büro-Millionär?', 'Number Sequence Game'].map((game, index) => (
            <Button
              key={index}
              sx={{
                color: '#fff',
                textTransform: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                backgroundColor: selectedGame === game ? 'rgba(41, 128, 185, 0.9)' : 'rgba(44, 62, 80, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(41, 128, 185, 0.6)',
                },
              }}
              onClick={() => handleGameSelect(game)}
            >
              {game}
            </Button>
          ))}
        </Box>
      )}

      {/* Spielanzeige */}
      {selectedGame && (
        <Box
          sx={{
            textAlign: 'center',
            padding: '20px',
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '10px',
            margin: '10px',
          }}
        >
          <Typography variant="h5">Du spielst jetzt: {selectedGame}</Typography>
        </Box>
      )}

      {/* Dynamisches Rendering des ausgewählten Spiels */}
      {selectedGame === 'Tanz-Maschine!' && <ReactionGame />}
      {selectedGame === 'Memory' && <Memory />}
      {selectedGame === 'Wer wird Büro-Millionär?' && <AttentionGrabbing />}
      {selectedGame === 'Number Sequence Game' && <NumberSequenceGame />}
    </div>
  );
};

export default Header;
