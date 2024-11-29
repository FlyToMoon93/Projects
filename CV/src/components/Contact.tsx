'use client'; // <-- Diese Zeile bleibt oben im Dateikopf

import React from 'react';
import { Typography, Card, CardContent, Chip, Tooltip } from '@mui/material';
import { Email, Phone, LinkedIn, GitHub } from '@mui/icons-material';

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
  fontSize: '1.5rem',
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

const chipLinkStyle = {
  textDecoration: 'none',
};

const iconStyle = {
  fontSize: '20px',
  marginRight: '8px',
  color: 'white', // Hier setzen wir die Farbe der Icons auf Weiß
};

const Contact = () => {
  return (
    <section id="kontakt" style={sectionStyle}>
      <div style={contentStyle}>
        <Typography variant="h3" component="h2" align="center" style={headerStyle}>
          Kontakt
        </Typography>

        {/* E-Mail Box */}
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>E-Mail</Typography>
            <Typography variant="body1" style={contentText}>
              <strong>Email-Adresse:</strong> ibesh.khalil@gmail.com
            </Typography>
            <Tooltip title="E-Mail Kontakt">
              <a 
                href="mailto:ibesh.khalil@gmail.com?subject=Anfrage%20aus%20Lebenslauf%20Khalil%20Ibesh" 
                style={chipLinkStyle}
              >
                <Chip 
                  label="E-Mail" 
                  icon={<Email style={iconStyle} />} 
                  sx={chipStyle} 
                />
              </a>
            </Tooltip>
          </CardContent>
        </Card>

        {/* Telefon Box */}
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>Telefon</Typography>
            <Typography variant="body1" style={contentText}>
              <strong>Telefonnummer:</strong> +49 152 17594065
            </Typography>
            <Tooltip title="Telefon Kontakt">
              <a href="tel:+4915217594065" style={chipLinkStyle}>
                <Chip 
                  label="Telefon" 
                  icon={<Phone style={iconStyle} />} 
                  sx={chipStyle} 
                />
              </a>
            </Tooltip>
          </CardContent>
        </Card>

        {/* LinkedIn Box */}
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>LinkedIn</Typography>
            <Typography variant="body1" style={contentText}>
              <strong>Profil:</strong> LinkedIn Profil 
            </Typography>
            <Tooltip title="LinkedIn Profil">
              <a href="https://www.linkedin.com/in/khalil-ibesh-9b4632257/" target="_blank" rel="noopener noreferrer" style={chipLinkStyle}>
                <Chip 
                  label="LinkedIn" 
                  icon={<LinkedIn style={iconStyle} />} 
                  sx={chipStyle} 
                />
              </a>
            </Tooltip>
          </CardContent>
        </Card>

        {/* GitHub Box */}
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>GitHub</Typography>
            <Typography variant="body1" style={contentText}>
              <strong>Profil:</strong> GitHub-Projekte
            </Typography>
            <Tooltip title="GitHub Profil">
              <a href="https://github.com/FlyToMoon93/Projects" target="_blank" rel="noopener noreferrer" style={chipLinkStyle}>
                <Chip 
                  label="GitHub" 
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

export default Contact;
