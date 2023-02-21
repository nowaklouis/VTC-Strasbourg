import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const AddressAutofill = dynamic(() => import('@mapbox/search-js-react').then((mod) => mod.AddressAutofill), {
  ssr: false,
});
import axios from 'axios';
import dayjs from 'dayjs';
import { Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DepartureInput from './DepartureInput';
import MapComp from './MapComp';
import PropTypes from 'prop-types';
import CourseResult from './CourseResult';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeForm from '../stripe/StripeForm';

import { useUser } from '../../context/user.context';

const stripePromise = loadStripe(
  'pk_test_51MUVlwIxGyWakY244RTIPQoaFK9mYEIHQRBk5YXugVLvoIxnaY450p439TRpC2X496ZBbtpBmyXZ9WtGzl36ybxR00dNSt4Liu'
);

import config from '../../config/config.json';
const endpoint = config.api_endpoint;
const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

function CourseForm({ payment, setPayment, setCourseRequested, courseRequested }) {
  const { currentUser } = useUser();
  const [kmPrice, setKmPrice] = useState();
  const [departureAddress, setDepartureAddress] = useState({ address: '', coord: [] });
  const [destinationAddress, setDestinationAddress] = useState({ address: '', coord: [] });
  const [geoLocLoading, setGeoLocLoading] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [passengers, setPassengers] = useState(1);
  const [route, setRoute] = useState();
  const departureRef = useRef();
  const destinationRef = useRef();
  const [paymentAccepted, setPaymentAccepted] = useState(false);

  const [clientSecret, setClientSecret] = useState('');
  const [idForCapture, setIdForCapture] = useState();

  console.log(idForCapture);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    //fetch km price from db
    const getKmPrice = async () => {
      const res = await axios.get(`${endpoint}/prices`);
      setKmPrice(res.data.filter((r) => r.name === 'kmPrice')[0].value);
    };
    getKmPrice();

    //check if a course exist in local storage
    const localStorageCourse = JSON.parse(window.localStorage.getItem('VTCCOURSE'));
    if (localStorageCourse) {
      setDepartureAddress(localStorageCourse.depAddress);
      setDestinationAddress(localStorageCourse.destAddress);
      setDate(localStorageCourse.date);
      setPassengers(localStorageCourse.passengers);
    }
  }, []);

  const handleGeoLoc = () => {
    setGeoLocLoading(true);
    const success = async (data) => {
      const coord = data.coords;
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coord.longitude},${coord.latitude}.json?access_token=${accessToken}`;
      const res = await axios.get(endpoint);
      const base = res.data.features[0];
      setDepartureAddress({
        address: base.place_name,
        coord: [coord.longitude, coord.latitude],
      });
      setGeoLocLoading(false);
    };
    navigator.geolocation.getCurrentPosition(success);
  };

  useEffect(() => {
    if (departureAddress.address && departureRef.current) departureRef.current.value = departureAddress.address;
  }, [departureAddress]);

  const handleDeparture = async (e) => {
    const data = e.features[0].properties;
    setDepartureAddress({
      address: data.full_address,
      coord: e.features[0].geometry.coordinates,
    });
    departureRef.current.value = 'oui';
  };

  useEffect(() => {
    if (destinationAddress.address && destinationRef.current) destinationRef.current.value = destinationAddress.address;
  }, [destinationAddress]);

  const handleDestination = (e) => {
    const data = e.features[0].properties;
    setDestinationAddress({
      address: data.full_address,
      coord: e.features[0].geometry.coordinates,
      test: 'test',
    });
  };

  const handleDate = (e) => {
    setDate(e);
  };

  useEffect(() => {
    if (departureAddress.address !== '' && destinationAddress.address != '') {
      const depCoordinates = `${departureAddress.coord[0]},${departureAddress.coord[1]}`;
      const destCoordinates = `${destinationAddress.coord[0]},${destinationAddress.coord[1]}`;
      const endPoint = `https://api.mapbox.com/directions/v5/mapbox/driving/${depCoordinates};${destCoordinates}?&geometries=geojson&overview=simplified&access_token=${accessToken}`;

      const getCoursePrice = (param) => {
        const result = ((param.routes[0].distance / 1000) * kmPrice).toFixed(2);
        if (result <= 15) return 15;
        return result;
      };

      const fetchRoutesData = async () => {
        const res = await axios.get(endPoint);
        const data = await res.data;

        setRoute({
          routes: data.routes[0].geometry.coordinates,
          distance: (data.routes[0].distance / 1000).toFixed(2),
          duration: (data.routes[0].duration / 60).toFixed(2),
          price: getCoursePrice(data),
        });
      };

      fetchRoutesData();
      window.localStorage.removeItem('VTCCOURSE');
    }
  }, [departureAddress, destinationAddress, kmPrice]);

  return (
    <Stack>
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{
          padding: { xs: '1rem', md: '1.5rem' },
          backgroundColor: 'white',
          minHeight: { xs: '200px', md: '400px' },
          maxWidth: '90vw',
          width: 'min(90vw, 1000px)',
          boxShadow: '9px 8px 13px -3px rgba(0,0,0,0.3)',
          borderRadius: '5px',
          overflow: 'hidden',
        }}
      >
        {currentUser ? (
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.5vw',
              paddingBottom: '1rem',
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
              <Typography sx={{ color: 'secondary.main', fontWeight: 'bold' }} gutterBottom>
                Bonjour {currentUser.firstname} !
              </Typography>
              <Link href="/compte">
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ color: 'secondary.main', border: '1px solid grey', fontWeight: 'bold' }}
                >
                  Mon compte
                </Button>
              </Link>
            </Stack>
          </Stack>
        ) : (
          <Link href="/login">
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '0.5vw',
                paddingBottom: '1rem',
              }}
            >
              <PersonOutlineSharpIcon fontSize="large" />
              <Typography sx={{ color: 'secondary.dark' }}>S'identifier</Typography>
            </Stack>
          </Link>
        )}

        <Grid container spacing={4} sx={{ justifyContent: { xs: 'center', md: 'none' } }}>
          <Grid item xs={12} md={6}>
            <form>
              <Stack gap="2rem">
                <DepartureInput
                  departureRef={departureRef}
                  handleDeparture={handleDeparture}
                  geoLocLoading={geoLocLoading}
                  handleGeoLoc={handleGeoLoc}
                />

                <AddressAutofill
                  accessToken={accessToken}
                  onRetrieve={(e) => handleDestination(e)}
                  options={{
                    language: 'fr',
                    country: 'FR',
                  }}
                >
                  <TextField
                    inputRef={destinationRef}
                    label="Destination"
                    variant="standard"
                    color="secondary"
                    name="destinationAddress"
                    fullWidth
                  />
                </AddressAutofill>
                <Grid container spacing={2} justifyContent="center">
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
                </Grid>
              </Stack>
            </form>
            {route && (
              <CourseResult
                route={route}
                date={date}
                departureAddress={departureAddress}
                destinationAddress={destinationAddress}
                passengers={passengers}
                setPayment={setPayment}
                setClientSecret={setClientSecret}
                setIdForCapture={setIdForCapture}
                idForCapture={idForCapture}
                setCourseRequested={setCourseRequested}
                courseRequested={courseRequested}
              />
            )}
          </Grid>

          {payment ? (
            <Grid item xs={0} sm={7} md={6}>
              {paymentAccepted ? (
                <Stack
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1.5em',
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>
                    Merci M/Mme {currentUser?.lastname} {currentUser?.firstname}.
                  </Typography>
                  <Typography sx={{ textAlign: 'center' }}>
                    Votre demande de réservation à bien été pris en compte.
                  </Typography>

                  <Typography sx={{ textAlign: 'center' }}>
                    Vous serez prélevez qu'une fois la course accepté.
                  </Typography>
                  <Typography sx={{ textAlign: 'center' }}>
                    Le statut de votre demande vous sera envoyé sur votre adresse mail:
                  </Typography>
                  <Typography sx={{ textAlign: 'center' }}>{currentUser?.email}</Typography>
                </Stack>
              ) : (
                <div>
                  {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                      <StripeForm
                        clientSecret={clientSecret}
                        idForCapture={idForCapture}
                        setPaymentAccepted={setPaymentAccepted}
                      />
                    </Elements>
                  )}
                </div>
              )}
            </Grid>
          ) : (
            <Grid item xs={0} sm={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <MapComp depMarker={departureAddress} destMarker={destinationAddress} route={route} />
            </Grid>
          )}
        </Grid>
      </Stack>
    </Stack>
  );
}

CourseForm.propTypes = {
  setPayment: PropTypes.any.isRequired,
  payment: PropTypes.any.isRequired,
  setCourseRequested: PropTypes.any.isRequired,
  courseRequested: PropTypes.any.isRequired,
};

export default CourseForm;
