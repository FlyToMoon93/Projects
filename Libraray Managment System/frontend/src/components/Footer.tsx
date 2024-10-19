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
                        <Typography variant="h6">Folge Uns</Typography>
                        <Box>
                            <IconButton aria-label="Instagram" href="https://www.instagram.com/khalil.ibesh/" color="inherit">
                                <Instagram />
                            </IconButton>
                            <IconButton aria-label="LinkedIn" href="https://www.linkedin.com/in/khalil-ibesh-9b4632257/" color="inherit">
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={2} textAlign="center">
                    <Typography variant="body2" color="#fff">
                        &copy; {new Date().getFullYear()} Cloud Applications und Security Engineering.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
