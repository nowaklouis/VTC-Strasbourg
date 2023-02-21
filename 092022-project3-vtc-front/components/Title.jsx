import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import '@fontsource/nunito-sans';
import { useRouter } from 'next/router';
import { useUser } from '../context/user.context';
import Link from 'next/link';
import { Stack } from '@mui/system';
import PropTypes from 'prop-types';

function Title({ setPayment, setCourseRequested }) {
  const { currentUser, setCurrentUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    setCurrentUser(null);
    setCourseRequested(false);
    setPayment(false);
    window.localStorage.removeItem('APPToken');
    router.push('/');
  };

  return (
    <Box component="header" sx={{ textAlign: 'center' }}>
      <Link href="/" sx={{ cursor: 'pointer' }}>
        <Typography variant="h1">
          VTC <br />
          STRASBOURG
        </Typography>
      </Link>
      <Stack gap="1rem" alignItems="flex-end" sx={{ position: 'absolute', top: '20px', right: '20px' }}>
        {currentUser?.role === '1' ? (
          <Link href="/dashboard/courses">
            <Button variant="contained" size="small" sx={{ color: 'red', border: '1px solid white' }}>
              ADMIN
            </Button>
          </Link>
        ) : null}
        {currentUser ? (
          <Button
            variant="outlined"
            size="small"
            sx={{ color: 'white', border: '1px solid white' }}
            onClick={handleLogout}
          >
            Se deconnecter
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
}

Title.propTypes = {
  setCourseRequested: PropTypes.any.isRequired,
  setPayment: PropTypes.any.isRequired,
};

export default Title;
