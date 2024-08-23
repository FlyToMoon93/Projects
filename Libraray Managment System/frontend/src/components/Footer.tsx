import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="stretch"
            py={3}
            px={2}
            width="100vw"
            sx={{ backgroundColor: '#005a9b' }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between"  color={'#fff'}>
                    <Grid item xs={12} sm={4} >
                        <Typography variant="h6">Über Uns</Typography>
                        <Typography variant="body2"  color="#fff">
                            Wir sind ein Team von Webentwicklern, die sich auf moderne und benutzerfreundliche Webanwendungen spezialisiert haben.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Links</Typography>
                        <Box>
                            <Link href="#" variant="body2" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>
                                Startseite
                            </Link>
                            <Link href="#" variant="body2" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>
                                Über uns
                            </Link>
                            <Link href="#" variant="body2" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>
                                Kontakt
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Folge Uns</Typography>
                        <Box>
                            <IconButton aria-label="Facebook" href="#" color="inherit">
                                <Facebook />
                            </IconButton>
                            <IconButton aria-label="Twitter" href="#" color="inherit">
                                <Twitter />
                            </IconButton>
                            <IconButton aria-label="Instagram" href="#" color="inherit">
                                <Instagram />
                            </IconButton>
                            <IconButton aria-label="LinkedIn" href="#" color="inherit">
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={2} textAlign="center">
                    <Typography variant="body2" color="#fff">
                        &copy; {new Date().getFullYear()} Dein Unternehmen. Alle Rechte vorbehalten.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
