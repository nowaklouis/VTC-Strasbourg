// eslint-disable-next-line import/no-unresolved, no-unused-vars
import { Stack } from '@mui/material';
import Head from 'next/head';
import axios from 'axios';
import PropTypes from 'prop-types';
import Assurances from '../components/Assurances/Assurances';
import Footer from '../components/Footer.jsx';
import Forfaits from '../components/Forfaits/Forfaits.jsx';
import Form from '../components/Form/Form';
import Title from '../components/Title';
import Informations from '../components/Informations/Informations.jsx';
import config from '../config/config.json';
import { useState } from 'react';

const endpoint = config.api_endpoint;

export default function Home({ forfaits, infoTrajets }) {
  const [payment, setPayment] = useState(false);
  const [courseRequested, setCourseRequested] = useState(false);
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
          minWidth: '100vw',
          padding: '1rem',
          backgroundImage: 'url("./background.png")',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Stack sx={{ maxWidth: '1200px', margin: 'auto' }}>
          <Stack alignItems="center" component="main" gap="2rem">
            <Title setPayment={setPayment} setCourseRequested={setCourseRequested} />
            <Form
              payment={payment}
              setPayment={setPayment}
              courseRequested={courseRequested}
              setCourseRequested={setCourseRequested}
            />
            <Assurances />
            <Forfaits forfaits={forfaits} />
            <Informations infoTrajets={infoTrajets} />
          </Stack>
          <Footer />
        </Stack>
      </Stack>
    </>
  );
}

Home.propTypes = {
  forfaits: PropTypes.any.isRequired,
  infoTrajets: PropTypes.any.isRequired,
};

export async function getServerSideProps() {
  const res = await axios.get(`${endpoint}/forfaits`);
  const forfaits = res.data;

  const resinfo = await axios.get(`${endpoint}/infoTrajets`);
  const infoTrajets = resinfo.data;

  return {
    props: {
      forfaits,
      infoTrajets,
    },
  };
}
