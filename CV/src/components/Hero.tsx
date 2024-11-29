import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

// Styled Component für das Bild als Kreis, zentriert auf der Seite
const CircleImage = styled(Box)(({ theme }) => ({
  width: '250px',              // Breite des Bildes als Kreis
  height: '250px',             // Höhe des Bildes als Kreis
  borderRadius: '50%',         // Macht das Bild rund
  backgroundSize: 'cover',     // Bild wird innerhalb des Kreises skaliert
  backgroundPosition: 'center', // Bild bleibt zentriert im Kreis
  backgroundImage: 'url(https://raw.githubusercontent.com/FlyToMoon93/CV/7ed36b3c8c466695314c28319f80a772ccc07b26/public/khalil.jpg)', // Bildquelle
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)', // Schatten für das Bild
  position: 'absolute',
  top: '50%',                  // Vertikale Zentrierung der Seite
  left: '50%',                 // Horizontale Zentrierung der Seite
  transform: 'translate(-50%, -50%)', // Kompensation der Größe, um es exakt zu zentrieren
  // Gradient overlay für besseren Kontrast
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  '& h1': {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    animation: 'fadeIn 1s ease-out', // Animation für den Text
  },
  [theme.breakpoints.down('sm')]: {
    height: '40vh',
    width: '80vw', // Anpassung auf kleinen Bildschirmen
  },
  
}));

const Hero = () => {
  return (
    <Box sx={{ position: 'relative', height: '50vh', width: '100%' }}>
      {/* Das Bild als Kreis, zentriert auf der Seite */}
      <CircleImage />
    </Box>
  );
};

export default Hero;
