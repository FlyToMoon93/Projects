import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';
// Styles
const sectionStyle = {
  padding: '50px',
  '@media (max-width: 768px)': {
    padding: '30px', // Weniger Padding für kleinere Bildschirme
  },
};

const contentStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  '@media (max-width: 768px)': {
    maxWidth: '90%', // Auf kleineren Bildschirmen den Inhalt enger halten
  },
};

const headerStyle = {
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '40px',
  fontSize: '1.5rem', // Größere Schrift auf größeren Bildschirmen
  '@media (max-width: 768px)': {
    fontSize: '0.5rem', // Kleinere Schrift auf Tablets
  },
  '@media (max-width: 480px)': {
    fontSize: '0.5rem', // Noch kleinere Schrift auf mobilen Geräten
  },
};

const cardStyle = {
  marginBottom: '30px',
  borderRadius: '12px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
  padding: '20px',
  '@media (max-width: 768px)': {
    padding: '15px', // Weniger Padding auf kleineren Geräten
  },
};

const titleStyle = {
  fontWeight: 'bold',
  color: '#1976d2',
  fontSize: '1.0rem', // Standardgröße für die Job-Titel
  '@media (max-width: 768px)': {
    fontSize: '1.15rem', // Kleinere Schrift für Tablets
  },
  '@media (max-width: 480px)': {
    fontSize: '1rem', // Noch kleinere Schrift für Handys
  },
};

const contentText = {
  marginBottom: '20px',
  fontSize: '16px',
  color: '#555',
  '@media (max-width: 768px)': {
    fontSize: '14px', // Kleinere Schrift für Tablets
  },
  '@media (max-width: 480px)': {
    fontSize: '12px', // Noch kleinere Schrift für Handys
  },
};

const buttonStyle = {
  marginTop: '15px',
  backgroundColor: '#1976d2',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
};

const WorkExperience = () => {
  return (
    <section id="work-experience" style={sectionStyle}>
      <div style={contentStyle}>
        <Typography variant="h3" component="h2" align="center" style={headerStyle}>
        Berufserfahrung
        </Typography>

        {/* TÜV SÜD Digital Service GmbH */}
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>TÜV SÜD Digital Service GmbH, München</Typography>
            <Typography variant="subtitle1" color="textSecondary">04/2023 - aktuell</Typography>
            <Typography variant="body1" style={contentText}>
              <strong>Werkstudent</strong>
              <ul>
                <li>Erstellung von Testfällen auf Basis von User Stories für TÜV SÜD Online-Shops in Azure DevOps Test Plans.</li>
                <li>Manuelle Durchführung von User Acceptance Tests unterschiedlicher TÜV SÜD Online-Shops.</li>
                <li>Testautomatisierung und Skriptentwicklung mittels Cypress in JavaScript.</li>
                <li>Erstellung von KPI-Dashboards für alle TÜV SÜD Online-Shops in Microsoft Excel mit Hilfe von Power Pivot, Power Query und Visual Basic.</li>
                <li>Setup und Anpassung von komplexen Online-Formularen in 123Formbuilder mit Hilfe von HTML und CSS sowie Einrichtung von Business-Workflows.</li>
                <li>Page-Setup und Content-Pflege für verschiedene TÜV SÜD Online-Shops mit Hilfe des Online-Shop Backoffices sowie Anpassung des Designs durch HTML und CSS.</li>
              </ul>
            </Typography>
            <Button variant="contained" color="primary" onClick={() => window.open('https://www.tuvsud.com/de-de/ueber-uns/unsere-gesellschaften/digital-service', '_blank')} style={buttonStyle}>
              Mehr zum Unternehmen
            </Button>
          </CardContent>
        </Card>

        {/* Techmatrix Consulting GmbH */}
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>Techmatrix Consulting GmbH, Ingolstadt</Typography>
            <Typography variant="subtitle1" color="textSecondary">02/2021 - 09/2022</Typography>
            <Typography variant="body1" style={contentText}>
              <strong>Werkstudent, Praktikant, Frontend Entwickler</strong>
              <ul>
                <li>HTML: Strukturierung</li>
                <li>CSS: Styling</li>
                <li>JavaScript: Interaktion</li>
                <li>TypeScript: Typsicherheit</li>
                <li>React.js: Komponenten</li>
                <li>Next.js: Routing</li>
                <li>React UI: Benutzeroberfläche</li>
              </ul>
            </Typography>
            <Button variant="contained" color="primary" onClick={() => window.open('https://www.techmatrix.de/', '_blank')} style={buttonStyle}>
              Mehr zum Unternehmen
            </Button>
          </CardContent>
        </Card>

        {/* Media-Saturn Deutschland GmbH */}
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>Media-Saturn Deutschland GmbH, Ingolstadt</Typography>
            <Typography variant="subtitle1" color="textSecondary">12/2015 - 02/2016</Typography>
            <Typography variant="body1" style={contentText}>
              <strong>Praktikant</strong>
              <ul>
                <li>Wettbewerbs-Preisrecherche (Online)</li>
                <li>Übertragung des Wettbewerbs in Excel-Dateien</li>
              </ul>
            </Typography>
            <Button variant="contained" color="primary" onClick={() => window.open('https://www.mediamarktsaturn.com/', '_blank')} style={buttonStyle}>
              Mehr zum Unternehmen
            </Button>
          </CardContent>
        </Card>

      </div>
    </section>
  );
};

export default WorkExperience;
