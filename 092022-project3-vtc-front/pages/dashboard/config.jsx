import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Grid, Modal, Stack, TextField, Typography } from '@mui/material';

import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import config from '../../config/config.json';
import Forfait from '../../components/Dashboard/Forfait';
import NewForfait from '../../components/Dashboard/NewForfait';

const endpoint = config.api_endpoint;

function Config({ data, prices, infoTrajets }) {
  const [forfaits, setForfaits] = useState(data);
  const [open, setOpen] = useState(false);
  const [kmPrice, setKmPrice] = useState(prices.filter((price) => price.name === 'kmPrice')[0].value);
  const [kmPriceEdit, setKmPriceEdit] = useState(false);
  const [error, setError] = useState();
  const [errorLine1, setErrorLine1] = useState();
  const [line1, setLine1] = useState(infoTrajets[0].line1);
  const [Line1Edit, setLine1Edit] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateForfaits = async () => {
    const res = await axios.get(`${endpoint}/forfaits`);
    setForfaits(res.data);
  };

  const handleClick = () => {
    if (!kmPriceEdit) {
      setKmPriceEdit(true);
    }

    if (kmPriceEdit) {
      const { error } = Joi.number().allow('').validate(kmPrice);

      if (error) {
        setError(error);
      }
      if (!error) {
        axios.put(`${endpoint}/prices`, { kmPrice });
        setKmPriceEdit(false);
        return;
      }
    }
  };

  const handleChange = (e) => {
    const { error } = Joi.number().allow('').validate(e.target.value);

    if (!error) {
      setKmPrice(e.target.value);
      setError();
    }
    if (error) {
      setError(error.message);
    }
  };

  const handleClickInfo = () => {
    if (!Line1Edit) {
      setLine1Edit(true);
    }

    if (Line1Edit) {
      const { errorLine1 } = Joi.string().max(500).allow('').validate(line1);

      if (errorLine1) {
        setErrorLine1(errorLine1);
      }
      if (!errorLine1) {
        axios.put(`${endpoint}/infoTrajets`, { line1 });
        setLine1Edit(false);
        return;
      }
    }
  };

  const handleChangeInfo = (e) => {
    const { errorLine1 } = Joi.string().max(500).allow('').validate(e.target.value);

    if (!errorLine1) {
      setLine1(e.target.value);
      setErrorLine1();
    }
    if (errorLine1) {
      setErrorLine1(error.message);
    }
  };

  return (
    <DashboardLayout>
      <Stack alignItems="flex-start" justifyContent="center" spacing={2}>
        <Typography variant="h2">Tarification</Typography>
        {error ? <Typography color="error">{error} </Typography> : ''}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>Prix au km : </Typography>
          <TextField
            value={kmPrice}
            variant="outlined"
            focused
            color={error ? 'error' : 'success'}
            onChange={handleChange}
            disabled={!kmPriceEdit}
            sx={{ width: '5rem' }}
          />
          <Button variant="contained" onClick={handleClick} disabled={error}>
            {kmPriceEdit ? 'Valider' : 'Modifier'}
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{ marginBlock: '1rem' }} />
      <Stack alignItems="flex-start" justifyContent="center" spacing={2}>
        <Typography variant="h2">Forfaits</Typography>
        <Button variant="contained" onClick={handleOpen}>
          Ajouter un forfait
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <NewForfait setOpen={setOpen} updateForfaits={updateForfaits} />
          </Box>
        </Modal>

        <Grid container spacing={1}>
          {forfaits.map((forfait) => (
            <Forfait key={forfait.id} forfait={forfait} updateForfaits={updateForfaits} />
          ))}
        </Grid>
      </Stack>
      <Divider sx={{ marginBlock: '1rem' }} />
      <Divider sx={{ marginBlock: '1rem' }} />
      <Stack alignItems="flex-start" justifyContent="center" spacing={2}>
        <Typography variant="h2">Informations trajets</Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>Ligne 1</Typography>
          <TextField
            value={line1}
            variant="outlined"
            focused
            color={errorLine1 ? 'error' : 'success'}
            onChange={handleChangeInfo}
            disabled={!Line1Edit}
            sx={{ width: '55rem' }}
          />
          <Button variant="contained" onClick={handleClickInfo} disabled={errorLine1}>
            {Line1Edit ? 'Valider' : 'Modifier'}
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{ marginBlock: '1rem' }} />
    </DashboardLayout>
  );
}

Config.propTypes = {
  data: PropTypes.any.isRequired,
  prices: PropTypes.any.isRequired,
  infoTrajets: PropTypes.any.isRequired,
};

export default Config;

export async function getServerSideProps() {
  const res = await axios.get(`${endpoint}/forfaits`);
  const data = res.data;
  const result = await axios.get(`${endpoint}/prices`);
  const prices = result.data;
  const resinfo = await axios.get(`${endpoint}/infoTrajets`);
  const infoTrajets = resinfo.data;

  return {
    props: {
      data,
      prices,
      infoTrajets,
    },
  };
}
