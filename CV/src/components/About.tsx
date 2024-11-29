'use client';

import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import Hero from './Hero';
const headerStyle = {
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '40px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
};

// Stil für den Einführungstext
const introTextStyle = {
         marginBottom: '30px',
          textAlign: 'center',
          color: '#333',
          fontSize: '1.2rem',
          lineHeight: '1.5',
};

// Stil für das Zitat
const quoteStyle = {
  fontSize: '1.2rem',
  color: '#7F8C8D',
  fontStyle: 'italic',
  marginBottom: '40px',
};

// Stil für das Grid-Layout der Cards
const gridStyle = {
  marginTop: '40px',
  justifyContent: 'space-between',
};

// Stil für den Bereich der persönlichen Informationen
const infoSectionStyle = {
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Sanfter Schatten
  color: '#34495E', // Dunkelgrauer Text
};

// Stil für die Sprachkenntnisse
const languageSectionStyle = {
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Sanfter Schatten
  color: '#34495E', // Dunkelgrauer Text
};

// Stil für den Titel der persönlichen Informationen und Sprachkenntnisse
const infoTitleStyle = {
  fontWeight: 'bold',
  color: '#1976d2',
  marginBottom: '40px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
};

// Stil für die Liste der persönlichen Informationen
const infoListStyle = {
  listStyleType: 'none',
  paddingLeft: '0',
  fontSize: '1.1rem',
  marginBottom: '20px',
};

// Stil für die Sprachbezeichnung
const languageTitleStyle = {
  fontWeight: 'bold',
  color: '#1976d2',
  marginBottom: '20px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
};

// Stil für den Fortschrittsbalken
const progressBarContainerStyle = {
  width: '100%',
  height: '20px',
  borderRadius: '10px',
  overflow: 'hidden',
  marginBottom: '15px',
  position: 'relative', // wichtig für die Positionierung des Hover-Texts
};

// Stil für den Fortschrittsbalken
const progressBarStyle = {
  height: '100%',
  backgroundColor: '#C0392B', // Rote Farbe für den Fortschritt
  borderRadius: '10px',
};

// Stil für Hover-Text (beim Überfahren der Balken)
const hoverTextStyle = {
  position: 'absolute',
  top: '-5px',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#1976d2',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '5px 10px',
  borderRadius: '5px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  visibility: 'hidden', // Standardmäßig unsichtbar
};

// Stil für die gesamte Section
const sectionStyle = {
  padding: '50px 3px',
};

const About = () => {
  return (
    <section id='about' style={sectionStyle}>
      <Hero/>
      {/* Hauptüberschrift */}
      <Typography variant="h3" component="h2" align="center" sx={headerStyle}>
        Khalil Ibesh
      </Typography>

      {/* Einführungstext */}
      <Typography variant="body1" sx={introTextStyle}>
      Für mich stehen Funktionalität und Benutzerfreundlichkeit im Mittelpunkt jeder Lösung. 
      Mein Ziel ist es, Software zu entwickeln, die nicht nur funktioniert, sondern auch begeistert. 
      Dabei setze ich auf präzise Planung, kreative Problemlösung und ein hohes Maß an Detailgenauigkeit.
      </Typography>

      <Typography variant="h6" align="center" sx={quoteStyle}>
      “Kreativ im digitalen Bereich, proaktiv für optimale Kundenlösungen – das treibt mich an.”
       </Typography>

      {/* Persönliche Informationen */}
      <Grid container spacing={3} sx={gridStyle}>
        <Grid item xs={12} sm={6} sx={infoSectionStyle}>
          <Typography variant="h5" sx={infoTitleStyle}>Persönliche Informationen</Typography>
          <ul style={infoListStyle}>
            <br />
            <li><strong>Geburtsdatum:</strong> 24.10.1993</li>
            <br />
            <li><strong>Geburtsort:</strong> Afrin, Syrien</li>
            <br />
            <li><strong>Familienstand:</strong> Ledig</li>
            <br />
          </ul>
        </Grid>

        {/* Sprachkenntnisse als horizontale Balken */}
        <Grid item xs={12} sm={6} sx={languageSectionStyle}>
          <Typography variant="h5" sx={infoTitleStyle}>Sprachkenntnisse</Typography>
          <Grid container spacing={2}>
            {/* Kurdisch */}
            <Grid item xs={12}>
              <Typography variant="body1" sx={languageTitleStyle}>Kurdisch</Typography>
              <Box
                sx={{
                  ...progressBarContainerStyle,
                  '&:hover .hover-text': {
                    visibility: 'visible',
                  },
                }}
                className="progress-bar"
              >
                <Box sx={{ ...progressBarStyle, width: '100%' }} />
                <Typography
                  variant="body2"
                  className="hover-text"
                  sx={{
                    ...hoverTextStyle,
                    position: 'absolute',
                    visibility: 'hidden',
                  }}
                >
                  Muttersprache
                </Typography>
              </Box>
            </Grid>

            {/* Arabisch */}
            <Grid item xs={12}>
              <Typography variant="body1" sx={languageTitleStyle}>Arabisch</Typography>
              <Box
                sx={{
                  ...progressBarContainerStyle,
                  '&:hover .hover-text': {
                    visibility: 'visible',
                  },
                }}
                className="progress-bar"
              >
                <Box sx={{ ...progressBarStyle, width: '100%' }} />
                <Typography
                  variant="body2"
                  className="hover-text"
                  sx={{
                    ...hoverTextStyle,
                    position: 'absolute',
                    visibility: 'hidden',
                  }}
                >
                  Muttersprache
                </Typography>
              </Box>
            </Grid>

            {/* Deutsch */}
            <Grid item xs={12}>
              <Typography variant="body1" sx={languageTitleStyle}>Deutsch</Typography>
              <Box
                sx={{
                  ...progressBarContainerStyle,
                  '&:hover .hover-text': {
                    visibility: 'visible',
                  },
                }}
                className="progress-bar"
              >
                <Box sx={{ ...progressBarStyle, width: '90%' }} />
                <Typography
                  variant="body2"
                  className="hover-text"
                  sx={{
                    ...hoverTextStyle,
                    position: 'absolute',
                    visibility: 'hidden',
                  }}
                >
                  Fließend
                </Typography>
              </Box>
            </Grid>

            {/* Englisch */}
            <Grid item xs={12}>
              <Typography variant="body1" sx={languageTitleStyle}>Englisch</Typography>
              <Box
                sx={{
                  ...progressBarContainerStyle,
                  '&:hover .hover-text': {
                    visibility: 'visible',
                  },
                }}
                className="progress-bar"
              >
                <Box sx={{ ...progressBarStyle, width: '85%' }} />
                <Typography
                  variant="body2"
                  className="hover-text"
                  sx={{
                    ...hoverTextStyle,
                    position: 'absolute',
                    visibility: 'hidden',
                  }}
                >
                  Fließend
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};

export default About;