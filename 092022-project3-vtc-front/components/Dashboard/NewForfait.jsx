import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Joi from 'joi';
import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import config from '../../config/config.json';

const endpoint = config.api_endpoint;

const Schema = Joi.object({
  title: Joi.string().max(155).required(),
  departure: Joi.string().max(55).required(),
  destination: Joi.string().max(55).required(),
  price: Joi.number().required(),
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

function NewForfait({ setOpen, updateForfaits }) {
  const [newForfait, setNewForfait] = useState({ title: '', departure: '', destination: '', price: '' });
  const [error, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewForfait({ ...newForfait, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = Schema.validate(newForfait);
    if (error) {
      setError(error);
    }
    if (!error) {
      await axios.post(`${endpoint}/forfaits`, newForfait);
      updateForfaits();
      setOpen(false);
    }
  };
  return (
    <Stack sx={style} justifyContent="center">
      <form onSubmit={handleSubmit} style={formStyle}>
        {error && <Typography color="error">{error.message}</Typography>}
        <TextField
          id="outlined-basic"
          label="Titre"
          variant="outlined"
          color="secondary"
          name="title"
          value={newForfait.title}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          name="departure"
          label="Départ"
          variant="outlined"
          color="secondary"
          value={newForfait.departure}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          name="destination"
          label="Destination"
          variant="outlined"
          color="secondary"
          value={newForfait.destination}
          onChange={handleChange}
        />
        <TextField
          id="outlined-number"
          name="price"
          type="number"
          label="Prix"
          variant="filled"
          color="secondary"
          value={newForfait.price}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Ajouter course
        </Button>
      </form>
    </Stack>
  );
}

NewForfait.propTypes = {
  setOpen: PropTypes.func.isRequired,
  updateForfaits: PropTypes.func.isRequired,
};

export default NewForfait;
