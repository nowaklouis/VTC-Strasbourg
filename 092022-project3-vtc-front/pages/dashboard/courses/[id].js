import React, { useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import DashboardLayout from '../../../components/Dashboard/DashboardLayout';
import { Button, IconButton, Stack, StepContext, Typography } from '@mui/material';
import FastRewindIcon from '@mui/icons-material/FastRewind';

import config from '../../../config/config.json';
const endpoint = config.api_endpoint;

function Course({ data }) {
  const [course, setCourse] = useState(data);
  const router = useRouter();

  const updateData = async () => {
    const updatedCourse = await axios.get(`${endpoint}/courses/${course.id}`);
    setCourse(updatedCourse.data);
  };
  const validateCourse = async (param) => {
    await axios.put(`${endpoint}/courses/${course.id}`, { validate: param, idForCapture: course.id_stripe });
    updateData();
  };

  const getStatusColor = {
    requested: 'red',
    accepted: 'green',
    declined: 'red',
    realised: 'green',
  };

  const labelStyle = { fontWeight: 'bold', color: 'secondary.main' };
  const infoStyle = { color: 'black' };

  return (
    <DashboardLayout>
      <Stack alignItems="flex-start" gap={1}>
        <IconButton aria-label="back" size="large" onClick={() => router.back()}>
          <FastRewindIcon />
        </IconButton>
        <Typography variant="button" sx={labelStyle}>
          Course n°{course?.id}
        </Typography>
        <Typography sx={labelStyle}>
          Client :{' '}
          <Typography variant="button" sx={infoStyle}>
            {course?.user.firstname} {course?.user.lastname}
          </Typography>
        </Typography>
        <Typography sx={labelStyle}>
          Contact :{' '}
          <Typography variant="button" sx={infoStyle}>
            {course?.user.phone} / {course?.user.email}
          </Typography>
        </Typography>
        <Typography sx={labelStyle}>
          Adresse de départ :{' '}
          <Typography variant="button" sx={infoStyle}>
            {course?.depAddress}
          </Typography>
        </Typography>
        <Typography sx={labelStyle}>
          {' '}
          Adresse de destination :{' '}
          <Typography variant="button" sx={infoStyle}>
            {course?.destAddress}
          </Typography>
        </Typography>
        <Typography sx={labelStyle}>
          Date et heure de départ :{' '}
          <Typography variant="button" sx={infoStyle}>
            {dayjs(course?.date).format('DD/MM/YYYY - HH:mm')}
          </Typography>
        </Typography>
        <Typography sx={labelStyle}>
          Distance :{' '}
          <Typography variant="button" sx={infoStyle}>
            {course?.distance} km
          </Typography>
        </Typography>
        <Typography sx={labelStyle}>
          {' '}
          Temps de trajet :{' '}
          <Typography variant="button" sx={infoStyle}>
            {course?.duration} minutes
          </Typography>
        </Typography>
        <Typography sx={labelStyle}>
          Prix :{' '}
          <Typography variant="button" sx={infoStyle}>
            {course?.price} euros
          </Typography>
        </Typography>
        <Typography sx={labelStyle}>
          Statut :{' '}
          <Typography variant="button" sx={{ fontWeight: 'bold', color: getStatusColor[course.status] }}>
            {course?.status}
          </Typography>
        </Typography>
        <Stack direction="row" gap={2}>
          <Button
            disabled={course.status === 'accepted'}
            variant="contained"
            color="success"
            onClick={() => validateCourse('accept')}
          >
            Accepter
          </Button>
          <Button
            disabled={course.status === 'declined'}
            variant="outlined"
            color="error"
            onClick={() => validateCourse('decline')}
          >
            Décliner
          </Button>
        </Stack>
      </Stack>
    </DashboardLayout>
  );
}

export async function getStaticPaths() {
  const res = await axios.get(`${endpoint}/courses`);
  const courses = await res.data;

  const paths = courses.map((course) => ({
    params: {
      id: String(course.id),
    },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await axios.get(`${endpoint}/courses/${id}`);
  const data = res.data;

  return {
    props: {
      data,
    },
  };
}

Course.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Course;
