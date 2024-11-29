import Link from 'next/link';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    background: 'linear-gradient(135deg, #f4f7f6 0%, #e0e8f0 100%)',
    padding: '60px 20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },

  headerStyle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '40px',
    fontSize: '1.5rem', // Größere Schrift auf größeren Bildschirmen
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '30px',
    width: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Ensure content is spaced evenly
    height: '100%', // Ensures that all cards are the same height
    maxWidth: 345,
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    },
  },
  colorBox: {
    height: 220,
    borderRadius: '15px 15px 0 0',
    background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
    transition: 'opacity 0.3s, transform 0.3s',
    '&:hover': {
      opacity: 0.85,
      transform: 'scale(1.05)',
    },
  },
  cardContent: {
    padding: '20px',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Distribute content evenly
    textAlign: 'center',
    flexGrow: 1, // Ensures the content takes available space
  },
  description: {
    fontFamily: `'Open Sans', sans-serif`,
    color: '#e0e0e0',
    fontSize: '1rem',
    lineHeight: 1.8,
    flexGrow: 1, // Allow description to grow and take available space
  },
  button: {
    marginTop: '20px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    backgroundColor: '#2575fc',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#6a11cb',
      transform: 'scale(1.05)',
      textDecoration: 'underline',
    },
    borderRadius: '50px',
    padding: '8px 20px',
  },
}));

// Daten für die Boxen
const cardData = [
  { title: 'Inhalt 1', description: 'Hier können Sie einige interessante Informationen über das Thema einfügen.', background: 'linear-gradient(135deg, #ff7e5f, #feb47b)', link: '/content1' },
  { title: 'Inhalt 2', description: 'Ein weiterer spannender Bereich, den Sie entdecken können.', background: 'linear-gradient(135deg, #6a11cb, #2575fc)', link: '/content2' },
  { title: 'Inhalt 3', description: 'Weitere Informationen zu einem anderen Thema.', background: 'linear-gradient(135deg, #f79c42, #f0c27b)', link: '/content3' },
  { title: 'Inhalt 4', description: 'Erfahren Sie mehr über diesen interessanten Aspekt.', background: 'linear-gradient(135deg, #00c6ff, #0072ff)', link: '/content4' },
  { title: 'Inhalt 5', description: 'Entdecken Sie weitere spannende Details.', background: 'linear-gradient(135deg, #ff5f6d, #ffc3a0)', link: '/content5' },
  { title: 'Inhalt 6', description: 'Hier finden Sie zusätzliche Informationen.', background: 'linear-gradient(135deg, #3a7bd5, #3a3dff)', link: '/content6' },
];

const Content = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} id="Projekte ansehen">
      <div>
        {/* Titel */}
        <Typography variant="h3" component="h2" align="center" className={classes.headerStyle}>
          Meine Projekte
        </Typography>

        {/* Grid Container für die Boxen */}
        <Grid container spacing={4} className={classes.gridContainer}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}> {/* Diese Größe sorgt dafür, dass die Boxen gleichmäßig verteilt sind */}
              <Card className={classes.card}>
                <div className={classes.colorBox} style={{ background: card.background }}></div>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h5" className={classes.headerStyle}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" className={classes.description}>
                    {card.description}
                  </Typography>
                  <Link href={card.link} passHref>
                    <Button size="small" className={classes.button}>
                      Mehr erfahren
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Content;
