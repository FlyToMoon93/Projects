import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';
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

const cardStyle = {
  marginBottom: '30px',
  borderRadius: '12px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', // Subtile Schatten für einen modernen Look
  backgroundColor: '#ffffff', // Heller Hintergrund für die Karten
  padding: '20px',
};

const titleStyle = {
  fontWeight: 'bold',
  fontSize: '1.0rem',

  color: '#1976d2', // Klare, kräftige Farbe für die Titel
};

const contentText = {
  fontSize: '16px',
  color: '#555', // Dunklere Schrift für bessere Lesbarkeit
};

const buttonStyle = {
  marginTop: '15px',
  backgroundColor: '#1976d2',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
};

const Education = () => {
  return (
    <section id="education" style={sectionStyle}>
      <div style={contentStyle}>
        <Typography variant="h3" component="h2" align="center" style={headerStyle}>
          Bildungsweg
        </Typography>

        {/* Masterstudium */}
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>Technische Hochschule Ingolstadt</Typography>
            <Typography variant="subtitle1" color="textSecondary">03/2024 - aktuell</Typography>
            <Typography variant="body1" style={contentText}>
              <strong>Studiengang:</strong> Masterstudium in Cloud Applications und Security Engineering
            </Typography>
            <Typography variant="body1" style={contentText}>
              <strong>Voraussichtlicher Abschluss:</strong> 15.08.2025
            </Typography>
            <Button variant="contained" color="primary" onClick={() => window.open('https://www.thi.de/informatik/studiengaenge/cloud-applications-und-security-engineering-msc/', '_blank')} style={buttonStyle}>
              Mehr zum Studiengang
            </Button>
          </CardContent>
        </Card>

        {/* Bachelorstudium */}
        <Card style={cardStyle}>
          <CardContent>
          <Typography variant="h5" style={titleStyle}>Technische Hochschule Ingolstadt</Typography>
            {/* Zweiter Titel mit angepasstem Stil */}
            <Typography 
              variant="h6" 
              style={{
                fontSize: '1rem',         // Kleinere Schriftgröße für den zweiten Titel
                fontFamily: '"Roboto", sans-serif',  // Andere Schriftart
                fontWeight: 'normal',     // Weniger betont (normal) im Vergleich zum ersten Titel
                color: '#555'             // Optional: Andere Farbe, um den Kontrast anzupassen
              }}
            >
              Bachelorstudium: Flug- und Fahrzeuginformatik
            </Typography>           
             <Typography variant="subtitle1" color="textSecondary">10/2019 - 03/2024</Typography>
            <Typography variant="body1" style={contentText}>
              <strong>Bachelorarbeitsnote:</strong> 1,3
              <br />
              <strong>Prüfungsgesamtnote:</strong> 3,1
            </Typography>
            <Button variant="contained" color="primary" onClick={() => window.open('https://www.thi.de/informatik/studiengaenge/flug-und-fahrzeuginformatik-bsc/', '_blank')} style={buttonStyle}>
              Mehr zum Studiengang
            </Button>
          </CardContent>
        </Card>

        {/* Weitere Bildungsstationen */}
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>Technische Hochschule Ingolstadt</Typography>
            <Typography variant="subtitle1" color="textSecondary">03/2017 - 10/2017</Typography>
            <Typography variant="body1">
              <strong>Kurs:</strong> Integrationskurs zur persönlichen und beruflichen Weiterentwicklung (Deutsch und Englisch)
            </Typography>
          </CardContent>
        </Card>

        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>International Sprachschule München</Typography>
            <Typography variant="subtitle1" color="textSecondary">02/2016 - 09/2016</Typography>
            <Typography variant="body1">
              <strong>Sprache:</strong> Erlernen der deutschen Sprache (B2 und C1)
            </Typography>
            <Button variant="contained" color="primary" onClick={() => window.open('https://www.aslsprachen.de/', '_blank')} style={buttonStyle}>
              Mehr zur Schule
            </Button>
          </CardContent>
        </Card>
      
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>Kolping Akademie Ingolstadt</Typography>
            <Typography variant="subtitle1" color="textSecondary">01/2015 - 12/2015</Typography>
            <Typography variant="body1">
              <strong>Sprache:</strong> Erlernen der deutschen Sprache (B1)
            </Typography>
            <Button variant="contained" color="primary" onClick={() => window.open('https://www.die-kolping-akademie.de/', '_blank')} style={buttonStyle}>
              Mehr zur Schule
            </Button>
          </CardContent>
        </Card>
 
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>Neuanfang in Deutschland</Typography>
            <Typography variant="subtitle1" color="textSecondary">10/2014</Typography>
            <Typography variant="body1">
              Beginn eines neuen Lebensabschnitts in Deutschland
            </Typography>
          </CardContent>
        </Card>

        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>Universität Aleppo, Syrien</Typography>
            <Typography variant="subtitle1" color="textSecondary">10/2011 - 07/2012</Typography>
            <Typography variant="body1">
              <strong>Studiengang:</strong> Bachelorstudium in Mathematik (ohne Abschluss)
            </Typography>
            <Button variant="contained" color="primary" onClick={() => window.open('https://www.alepuniv.edu.sy/faculty/college-of-science/department/32/', '_blank')} style={buttonStyle}>
              Mehr zum Studiengang
            </Button>
          </CardContent>
        </Card>

        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h5" style={titleStyle}>Gymnasium Aleppo, Syrien</Typography>
            <Typography variant="subtitle1" color="textSecondary">10/2008 - 07/2011</Typography>
            <Typography variant="body1">
              <strong>Abschluss:</strong> Abitur, Schwerpunkt: Mathematik und Physik
            </Typography>
            <Typography variant="body1">
              <strong>Abiturnote:</strong> 1,9
            </Typography>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Education;
