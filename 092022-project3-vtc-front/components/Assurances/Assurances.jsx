import { Card, CardContent, CardMedia, Box, Typography } from '@mui/material';
import React from 'react';

function Assurances() {
  const assurance = [
    {
      id: 1,
      title: 'Disponibilité 24H/7J',
      text: 'Prise en charge 24h/7j pour toutes destinations',
      alt: 'Logo ponctualité',
      image: '/calendar.png',
    },
    {
      id: 2,
      title: 'Qualité et ponctualité',
      text: 'Service sur mesure et ponctualité garantie',
      alt: 'Logo ponctualité',
      image: '/watch.png',
    },
    {
      id: 3,
      title: 'Chauffeurs certifiés',
      text: 'Titulaires de la carte professionnelle',
      alt: 'Logo ponctualité',
      image: '/driver.png',
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
      {assurance.map((assurance, index) => (
        <Card
          key={index}
          sx={{
            display: 'flex',
            padding: '.5rem 0',
            height: '120px',
            width: 'min(90vw, 400px)',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '8px 8px 13px -3px rgba(0,0,0,0.3)',
          }}
        >
          <CardMedia
            component="img"
            sx={{ height: '90%', width: 'auto', display: { xs: 'none', sm: 'block' } }}
            image={assurance.image}
            alt={assurance.alt}
          />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
              maxWidth: { xs: '90%', sm: '60%' },
            }}
          >
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              {assurance.title}
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>{assurance.text}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default Assurances;
