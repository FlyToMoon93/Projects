'use client'; // <-- Diese Zeile bleibt oben im Dateikopf

import React from 'react';
import { Typography, Box, Chip, Tooltip, Card, CardContent } from '@mui/material';
import { GitHub } from '@mui/icons-material';

// Styles
const sectionStyle = {
  padding: '50px',
};

const contentStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const headerStyle = {
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '40px',
  fontSize: '1.5rem', // Größere Schrift auf größeren Bildschirmen
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
};

const skillBoxStyle = {
  marginBottom: '30px',
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
};

const categoryTitleStyle = {
  fontWeight: 'bold',
  color: '#1976d2',
  marginBottom: '15px',
  fontSize: '1.0rem',

  '@media (max-width: 768px)': {
    fontSize: '1.0rem', // Kleinere Schriftgröße für Tablets
  },

  '@media (max-width: 480px)': {
    fontSize: '1.0rem', // Noch kleinere Schriftgröße für Handys
  },
};

const chipContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
};

const chipStyle = {
  backgroundColor: '#1976d2',
  color: '#fff',
  fontWeight: 'bold',
  transition: 'transform 0.2s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  '&:hover': {
    transform: 'scale(1.06)',
    backgroundColor: '#1565c0',
  },
};


const cardStyle = {
  marginBottom: '30px',
  borderRadius: '12px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
  padding: '20px',
};

const titleStyle = {
  fontWeight: 'bold',
  fontSize: '1.0rem',
  color: '#1976d2',
};

const contentText = {
  marginBottom: '20px',
  fontSize: '16px',
  color: '#555',
};



const chipLinkStyle = {
  textDecoration: 'none',
};

const iconStyle = {
  fontSize: '20px',
  marginRight: '8px',
  color: 'white', // Hier setzen wir die Farbe der Icons auf Weiß
};


const Skills = () => {
  return (
    <section id="skills" style={sectionStyle}>
      <div style={contentStyle}>
        <Typography variant="h3" component="h2" align="center" style={headerStyle}>
          Meine Skills
        </Typography>
        {/* Einleitung */}
        <Box sx={{
          marginBottom: '30px',
          textAlign: 'center',
          color: '#333',
          fontSize: '1.2rem',
          lineHeight: '1.5',
        }}>
          <Typography>
          Ein leidenschaftlicher Softwareentwickler, der komplexe Herausforderungen in elegante und effiziente Lösungen verwandelt. 
          Der Fokus liegt auf der Entwicklung innovativer digitaler Konzepte, die sowohl technisch als auch funktional überzeugen.
           Mit einer Kombination aus Kreativität, Präzision und tiefem Verständnis für moderne Softwarearchitekturen werden Projekte 
           auf das nächste Level gehoben und ein echter Mehrwert geschaffen.
          </Typography>
        </Box>
        {/* Programmiersprachen & Frameworks */}
        <div style={skillBoxStyle}>
          <Typography variant="h5" component="h3" style={categoryTitleStyle}>
            Programmiersprachen & Frameworks
          </Typography>
          <Box sx={chipContainerStyle}>
            <Tooltip title="C Programming Language">
              <Chip label="C" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Java Programming Language">
              <Chip label="Java" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="JavaScript Programming Language">
              <Chip label="JavaScript" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="ReactJS Framework">
              <Chip label="ReactJS" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="NextJS Framework">
              <Chip label="NextJS" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="TypeScript - JavaScript mit statischer Typisierung">
              <Chip label="TypeScript" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Node.js - JavaScript Laufzeitumgebung">
              <Chip label="Node.js" sx={chipStyle} />
            </Tooltip>
          </Box>
        </div>

        {/* Webtechnologien & Tools */}
        <div style={skillBoxStyle}>
          <Typography variant="h5" component="h3" style={categoryTitleStyle}>
            Webtechnologien & Tools
          </Typography>
          <Box sx={chipContainerStyle}>
            <Tooltip title="Webdesign Tools">
              <Chip label="Webdesign" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Webentwicklung Tools">
              <Chip label="Webentwicklung" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="HTML - Strukturierung von Webseiten">
              <Chip label="HTML" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="CSS - Gestaltung von Webseiten">
              <Chip label="CSS" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="React UI - Benutzeroberflächen">
              <Chip label="React UI" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="JSON - Datenformat">
              <Chip label="JSON" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Bootstrap - Framework für responsive Design">
              <Chip label="Bootstrap" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Material-UI - React-Komponenten-Bibliothek">
              <Chip label="Material-UI" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Postman - API-Test-Tool">
              <Chip label="Postman" sx={chipStyle} />
            </Tooltip>
          </Box>
        </div>

        {/* Testing & Automatisierung */}
        <div style={skillBoxStyle}>
          <Typography variant="h5" component="h3" style={categoryTitleStyle}>
            Testing & Automatisierung
          </Typography>
          <Box sx={chipContainerStyle}>
            <Tooltip title="Unit Testing - Modultests">
              <Chip label="Unit Testing" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Integration Testing - Integrationstests">
              <Chip label="Integration Testing" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="System Testing - Systemtests">
              <Chip label="System Testing" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Acceptance Testing - Abnahmetests">
              <Chip label="Acceptance Testing" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Regression Testing - Regressionstests">
              <Chip label="Regression Testing" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Manual Testing - Manuelle Tests">
              <Chip label="Manual Testing" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Automated Testing - Automatisierte Tests">
              <Chip label="Automated Testing" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Functional Testing - Funktionale Tests">
              <Chip label="Functional Testing" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Non-functional Testing - Nicht-funktionale Tests">
              <Chip label="Non-functional Testing" sx={chipStyle} />
            </Tooltip>
          </Box>
        </div>

        {/* Weitere Tools & Technologien */}
        <div style={skillBoxStyle}>
          <Typography variant="h5" component="h3" style={categoryTitleStyle}>
            Weitere Tools & Technologien
          </Typography>
          <Box sx={chipContainerStyle}>
            <Tooltip title="Scrum Methodologie">
              <Chip label="Scrum" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Version Control mit Git">
              <Chip label="Git" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="GitLab - Alternative Git-Plattform">
              <Chip label="GitLab" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Bitbucket - Git Repository Management">
              <Chip label="Bitbucket" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Docker - Containerisierung">
              <Chip label="Docker" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Confluence - Dokumentationstool">
              <Chip label="Confluence" sx={chipStyle} />
            </Tooltip>
          </Box>
        </div>

        {/* Linux & Tools */}
        <div style={skillBoxStyle}>
          <Typography variant="h5" component="h3" style={categoryTitleStyle}>
            Linux & Tools
          </Typography>
          <Box sx={chipContainerStyle}>
            <Tooltip title="Kali Linux - Penetration Testing Distribution">
              <Chip label="Kali Linux" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Ubuntu - Eine der beliebtesten Linux-Distributionen">
              <Chip label="Ubuntu" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Nmap - Netzwerkerkennungs-Tool">
              <Chip label="Nmap" sx={chipStyle} />
            </Tooltip>
            <Tooltip title="Burp Suite - Sicherheits-Testing-Tool">
              <Chip label="Burp Suite" sx={chipStyle} />
            </Tooltip>
          </Box>
        </div>
        
         {/* GitHub Box */}
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>GitHub</Typography>
            <Typography variant="body1" style={contentText}>
              <strong>Profil:</strong>  GitHub-Projekt
            </Typography>
            <Tooltip title="GitHub Profil">
              <a href="https://github.com/FlyToMoon93/Projects" target="_blank" rel="noopener noreferrer" style={chipLinkStyle}>
                <Chip 
                  label="GitHub-Projekt ansehen" 
                  icon={<GitHub style={iconStyle} />} 
                  sx={chipStyle} 
                />
              </a>
            </Tooltip>
          </CardContent>
        </Card>
        </div>
    </section>
  );
};

export default Skills;
