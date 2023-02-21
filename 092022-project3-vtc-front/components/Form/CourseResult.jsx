import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import PlaceIcon from '@mui/icons-material/Place';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CircleIcon from '@mui/icons-material/Circle';
import StraightenIcon from '@mui/icons-material/Straighten';
import axios from 'axios';

import config from '../../config/config.json';
import { useUser } from '../../context/user.context';

const endpoint = config.api_endpoint;

function CourseResult({
  route,
  date,
  destinationAddress,
  departureAddress,
  passengers,
  setPayment,
  setClientSecret,
  setIdForCapture,
  setCourseRequested,
  courseRequested,
}) {
  const { currentUser } = useUser();
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [infoUser, setInfoUser] = useState({
    name: '',
    email: '',
    address: {
      line1: '',
      city: '',
      postal_code: '',
      country: '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      setInfoUser({
        name: currentUser.firstname + ' ' + currentUser.lastname,
        email: currentUser.email,
        address: {
          line1: currentUser.adress,
          city: currentUser.city,
          postal_code: currentUser.zipcode,
          country: currentUser.country,
        },
      });
    }
  }, [currentUser]);

  const [course, setCourse] = useState({
    date,
    destAddress: destinationAddress.address,
    depAddress: departureAddress.address,
    price: route.price,
    distance: route.distance,
    duration: route.duration,
    passengers,
    clientId: userId,
    status: 'requested',
    id_stripe: '',
  });

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axios.get(`${endpoint}/user/user?email=${currentUser.email}`);
      const user = await res.data;
      setUserId(user.id);
    };

    if (currentUser) {
      getUserInfo();
    }
  }, [currentUser]);

  useEffect(() => {
    setCourse({
      date,
      destAddress: destinationAddress.address,
      depAddress: departureAddress.address,
      price: route.price,
      distance: route.distance,
      duration: route.duration,
      passengers,
      clientId: userId,
      status: 'requested',
      id_stripe: '',
    });
  }, [route, date, destinationAddress, departureAddress, passengers, userId]);

  const arrivalHour = dayjs(date).add(route.duration, 'm');

  //if user is connected request a course, else redirect to login page and save course to localstorage
  const handleClick = () => {
    let amount = Math.ceil(route.price * 100);

    axios
      .post('http://localhost:3001/stripe', {
        amount: amount,
        infoUser: infoUser,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret.client_secret);
        setIdForCapture(res.data.clientSecret.id);

        let idCourse = res.data.clientSecret.id;

        const updatedCourse = { ...course, id_stripe: idCourse };

        if (currentUser) {
          axios.post(`${endpoint}/courses`, updatedCourse);
          window.localStorage.removeItem('VTCCOURSE');
          setCourseRequested(true);
          return setPayment(true);
        } else {
          window.localStorage.setItem(
            'VTCCOURSE',
            JSON.stringify({ ...course, depAddress: departureAddress, destAddress: destinationAddress })
          );
          router.push('/login');
        }
      });
  };

  return (
    <Stack>
      <Stack direction="row" alignItems="center" justifyContent="center" gap="2rem" sx={{ padding: '2rem 0' }}>
        <Stack gap=".5rem" alignItems="start" justifyContent="start">
          <Stack direction="row" justifyContent="center" alignItems="center" gap=".5rem">
            <QueryBuilderIcon color="secondary" />
            <Typography color="secondary">{Number(route.duration).toFixed(0)} minutes</Typography>
          </Stack>

          <Stack direction="row" gap=".5rem">
            <StraightenIcon color="secondary" />
            <Typography color="secondary">{route.distance} km</Typography>
          </Stack>

          <Stack direction="row" gap=".5rem">
            <EuroSymbolIcon color="secondary" />
            <Typography color="secondary">{route.price} euros</Typography>
          </Stack>
        </Stack>
        <Stack gap=".5rem">
          <Stack direction="row" gap=".5rem" sx={{ marginLeft: '.7rem' }}>
            <MyLocationIcon color="secondary" />
            <Typography color="secondary">{dayjs(date).format('HH:mm')}</Typography>
          </Stack>
          <CircleIcon sx={{ fontSize: '12px', marginLeft: '1rem' }} color="secondary" />
          <CircleIcon sx={{ fontSize: '12px', marginLeft: '1rem' }} color="secondary" />
          <CircleIcon sx={{ fontSize: '12px', marginLeft: '1rem' }} color="secondary" />
          <Stack direction="row" gap=".5rem" sx={{ marginLeft: '.7rem' }}>
            <PlaceIcon color="secondary" />
            <Typography color="secondary">{dayjs(arrivalHour).format('HH:mm')}</Typography>
          </Stack>
        </Stack>
      </Stack>
      {courseRequested ? (
        <></>
      ) : (
        <Stack>
          <Button variant="contained" color="secondary" sx={{ margin: 'auto' }} onClick={handleClick}>
            Demande de réservation
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

CourseResult.propTypes = {
  route: PropTypes.shape({
    distance: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  date: PropTypes.object.isRequired,
  destinationAddress: PropTypes.any.isRequired,
  departureAddress: PropTypes.any.isRequired,
  passengers: PropTypes.number.isRequired,
  setPayment: PropTypes.any.isRequired,
  setClientSecret: PropTypes.string.isRequired,
  setIdForCapture: PropTypes.string.isRequired,
  setCourseRequested: PropTypes.any.isRequired,
  courseRequested: PropTypes.any.isRequired,
};

export default CourseResult;
