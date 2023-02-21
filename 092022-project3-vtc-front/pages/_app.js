import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/Theme';
import '../styles/globals.css';
import { UserProvider } from '../context/user.context';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
