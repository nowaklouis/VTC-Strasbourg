import React from 'react';
import { Stack } from '@mui/material';
import Head from 'next/head';
import Footer from '../../components/Footer.jsx';

import Title from '../../components/Title';

function index() {
  return (
    <>
      <Head>
        <title>VTC Strasbourg</title>
        <meta name="description" content="VTC Strasbourg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack
        sx={{
          minHeight: '100vh',
          padding: '1rem',
          backgroundImage: 'url("../background.png")',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Stack sx={{ maxWidth: '1200px', margin: 'auto' }}>
          <Stack alignItems="center" component="main" gap="2rem">
            <Title />
          </Stack>
          <Footer />
        </Stack>
      </Stack>
    </>
  );
}

export default index;
