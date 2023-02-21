import { Stack, Card, Box } from '@mui/material';
import Head from 'next/head';
import Footer from '../../components/Footer.jsx';
import Title from '../../components/Title';
import Client from '../../components/client/client';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from 'next/router';

export default function Compte() {
  const router = useRouter();

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
            <Card>
              <Box sx={{ display: 'flex', padding: '20px 20px 0px 20px', position: 'relative' }}>
                <Stack sx={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
                  <ClearIcon sx={{ position: 'absolute', top: '20px', right: '20px' }} />
                </Stack>
              </Box>
              <Client />
            </Card>
          </Stack>
          <Footer />
        </Stack>
      </Stack>
    </>
  );
}
