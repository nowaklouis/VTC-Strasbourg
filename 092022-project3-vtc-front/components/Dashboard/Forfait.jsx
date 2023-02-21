import React from 'react';
import PropTypes from 'prop-types';
import config from '../../config/config.json';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';

const endpoint = config.api_endpoint;

function Forfait({ forfait, updateForfaits }) {
  const { departure, destination, title, price, id } = forfait;

  const handleDelete = async (id) => {
    await axios.delete(`${endpoint}/forfaits/${id}`);
    updateForfaits();
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ maxWidth: '250px' }}>
        <CardContent>
          <Stack justifyContent="space-between" alignItems="flex-start" sx={{ height: '220px' }}>
            <Typography>
              <strong>Départ :</strong> {departure}
            </Typography>
            <Typography>
              <strong>Arrivée :</strong> {destination}
            </Typography>
            <Typography>
              <strong>Titre :</strong> {title}
            </Typography>
            <Typography>
              <strong>Prix :</strong> {price}euros
            </Typography>
            <Button variant="contained" color="error" sx={{ alignSelf: 'center' }} onClick={() => handleDelete(id)}>
              Supprimer
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}

Forfait.propTypes = {
  forfait: PropTypes.any.isRequired,
  updateForfaits: PropTypes.func.isRequired,
};

export default Forfait;
