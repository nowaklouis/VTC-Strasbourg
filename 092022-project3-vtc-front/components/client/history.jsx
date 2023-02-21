import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useUser } from '../../context/user.context';
import config from '../../config/config.json';
import { useEffect } from 'react';

const endpoint = config.api_endpoint;

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'depAddress',
    headerName: 'Départ',
    width: 200,
  },
  {
    field: 'destAddress',
    headerName: 'Destination',
    width: 200,
  },
  {
    field: 'date',
    headerName: 'Date',
    type: 'number',
    width: 110,
  },
  {
    field: 'price',
    headerName: 'Prix',
    type: 'number',
    width: 80,
  },
  {
    field: 'passengers',
    headerName: 'Nb. Passagers',
    type: 'number',
    width: 110,
  },
  {
    field: 'duration',
    headerName: 'Durée',
    type: 'number',
    width: 110,
  },
  {
    field: 'distance',
    headerName: 'Distance',
    type: 'number',
    width: 110,
  },
];

export default function History() {
  const [data, setData] = useState();
  const { currentUser } = useUser();

  const usersCourses = async () => {
    await axios
      .get(`${endpoint}/courses/compte?email=${currentUser.email}`, {
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (currentUser?.email) usersCourses();
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <Box sx={{ height: 650, width: '100%' }}>
      {data && (
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          experimentalFeatures={{ newEditingApi: true }}
        />
      )}
    </Box>
  );
}
