import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import config from '../../config/config.json';
import DepartureInput from '../Form/DepartureInput';
import { useUser } from '../../context/user.context';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
const endpoint = config.api_endpoint;

function BookForfaits({ forfait }) {
  const { currentUser } = useUser();
  const [userId, setUserId] = useState(null);
  const [departureAddress, setDepartureAddress] = useState();
  const [courseRequested, setCourseRequested] = useState(false);
  const [course, setCourse] = useState(forfait);
  const [geoLocLoading, setGeoLocLoading] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [passengers, setPassengers] = useState(1);
  const destinationRef = useRef();

  const handleGeoLoc = () => {
    setGeoLocLoading(true);
    const success = async (data) => {
      const coord = data.coords;
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coord.longitude},${coord.latitude}.json?access_token=${accessToken}`;
      const res = await axios.get(endpoint);
      const base = res.data.features[0];
      setDepartureAddress({
        address: `${base.address} ${base.text}`,
        city: base.context[1].text,
        country: base.context[3].text,
        coord: [coord.longitude, coord.latitude],
      });
      setGeoLocLoading(false);
    };
    navigator.geolocation.getCurrentPosition(success);
  };

  const handleDeparture = async (e) => {
    const data = e.features[0].properties;
    setDepartureAddress({
      address: data.address_line1,
      city: data.place,
      country: data.country,
      coord: e.features[0].geometry.coordinates,
    });
  };

  const handleDate = (e) => {
    setDate(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCourseRequested(true);
    axios.post(`${endpoint}/courses`, course);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axios.get(`${endpoint}/user/user?email=${currentUser.email}`);
      const user = await res.data;
      setUserId(user.id);
    };
    if (currentUser) getUserInfo();
  }, [currentUser]);

  useEffect(() => {
    if (departureAddress) {
      setCourse({
        date,
        depAddress: `${departureAddress.address}, ${departureAddress.city} - ${departureAddress.country}`,
        destAddress: forfait.title,
        clientId: userId,
        status: 'requested',
        price: forfait.price,
        passengers,
      });
    }
    // eslint-disable-next-line
  }, [departureAddress]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="2rem">
        <DepartureInput
          accessToken={accessToken}
          departureAddress={departureAddress}
          handleDeparture={handleDeparture}
          geoLocLoading={geoLocLoading}
          handleGeoLoc={handleGeoLoc}
        />

        <TextField
          label="Destination"
          variant="standard"
          inputRef={destinationRef}
          value={forfait.title}
          fullWidth
          disabled
        />

        <Grid container spacing={2} justifyContent="center" rowSpacing={2}>
          <Grid item xs={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} variant="standard" fullWidth />}
                label="Date"
                ampm={false}
                value={date}
                onChange={(e) => handleDate(e)}
                minDate={dayjs()}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              fullWidth
              label="Nombre de passagers"
              id="passagers"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              defaultValue={1}
              size="small"
              data-cy="passengers-select"
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2" data-cy="passengers-2">
                2
              </MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </TextField>
          </Grid>
          <Grid item>
            <Typography variant="h5">Prix du forfait : {forfait.price} euros</Typography>
          </Grid>
          <Grid item>
            {courseRequested ? (
              <Typography align="center">Votre demande de reservation à bien été envoyée !</Typography>
            ) : (
              <Button type="submit" variant="contained" color="secondary" disabled={!departureAddress}>
                Demande de reservation
              </Button>
            )}
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
}

BookForfaits.propTypes = {
  forfait: PropTypes.any,
};

export default BookForfaits;
