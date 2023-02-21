import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);
import axios from 'axios';
import PropTypes from 'prop-types';
import config from '../../../config/config.json';
import DashboardLayout from '../../../components/Dashboard/DashboardLayout';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';

const endpoint = config.api_endpoint;

const columns = [
  {
    field: 'status',
    headerName: 'Statut',
    width: 120,
    renderCell: (param) => {
      if (param.value === 'requested')
        return (
          <Button variant="contained" color="requested">
            En attente
          </Button>
        );
      if (param.value === 'accepted')
        return (
          <Button variant="contained" color="accepted">
            Accepté
          </Button>
        );
      if (param.value === 'declined')
        return (
          <Button variant="contained" color="declined">
            Refusé
          </Button>
        );
      if (param.value === 'realised')
        return (
          <Button variant="contained" color="secondary">
            réalisée
          </Button>
        );
    },
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 180,
    valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
  },
  {
    field: 'user',
    headerName: 'Client',
    width: 140,
    valueGetter: (params) => {
      const { firstname, lastname } = params.row.user;
      return [firstname, lastname].join(' ');
    },
  },

  { field: 'depAddress', headerName: 'Adresse de départ', width: 240 },
  { field: 'destAddress', headerName: 'Adresse de destination', width: 240 },

  { field: 'passengers', headerName: 'Nb Passagers', width: 70 },

  {
    field: 'price',
    headerName: 'Prix',
    width: 70,
  },
  {
    field: 'distance',
    headerName: 'Distance',
    width: 70,
  },
  {
    field: 'duration',
    headerName: 'Temps de trajet',
    width: 70,
  },
  {
    field: 'id',
    headerName: 'n°',
    width: 20,
  },
];

function Courses({ courses }) {
  const [today] = useState(dayjs);

  const handleClick = (e) => {
    Router.push(`/dashboard/courses/${e.id}`);
  };

  const validateCourse = async (param, id) => {
    await axios.put(`${endpoint}/courses/${id}`, { validate: param });
  };

  useEffect(() => {
    const coursesToUpdate = courses.filter((course) => dayjs(course.date).isBefore(today, 'day'));

    coursesToUpdate.forEach((course) => validateCourse('realise', course.id));
    // eslint-disable-next-line
  }, []);

  return (
    <DashboardLayout>
      <Box
        sx={{
          height: '53vh',
          width: '100%',
        }}
      >
        <Typography variant="h3">En Cours</Typography>
        <DataGrid
          rows={courses.filter((course) => dayjs(course.date).isSameOrAfter(today, 'day'))}
          columns={columns}
          pageSize={25}
          rowsPerPageOptions={[25]}
          onCellClick={(e) => handleClick(e)}
          getRowClassName={(params) => `${params.row.status}`}
          initialState={{
            sorting: {
              sortModel: [{ field: 'date', sort: 'asc' }],
            },
          }}
        />
        <Typography variant="h3">Passées</Typography>
        <DataGrid
          rows={courses.filter((course) => dayjs(course.date).isBefore(today, 'day'))}
          columns={columns}
          pageSize={25}
          rowsPerPageOptions={[25]}
          onCellClick={(e) => handleClick(e)}
          getRowClassName={(params) => `${params.row.status}`}
          initialState={{
            sorting: {
              sortModel: [{ field: 'date', sort: 'asc' }],
            },
          }}
        />
      </Box>
    </DashboardLayout>
  );
}

Courses.propTypes = {
  courses: PropTypes.any.isRequired,
};

export async function getStaticProps() {
  const res = await axios.get(`${endpoint}/courses`);
  const courses = res.data;

  return {
    props: {
      courses,
    },
  };
}

export default Courses;
