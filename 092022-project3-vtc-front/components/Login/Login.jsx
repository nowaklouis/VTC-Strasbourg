import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import config from '../../config/config.json';
import axios from 'axios';
import Joi from 'joi';
import { useUser } from '../../context/user.context';
import { useRouter } from 'next/router';
import ClearIcon from '@mui/icons-material/Clear';

function Connexion() {
  const [registration, setRegistrationCheck] = useState(false);
  const [birthday, setBirthDay] = useState(dayjs('2014-08-18'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastname, setLastName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [adress, setAdress] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setphone] = useState('');
  const [inscription, setInscription] = useState(false);
  const [identifier, setIdentifier] = useState(false);
  const [offer, setOffer] = useState(false);
  const [politique, setPolitique] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);

  const { setCurrentUser } = useUser();
  const router = useRouter();

  const [invalidSignin, setInvalidSignin] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorZipCode, setErrorZipCode] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  const endpoint = config.api_endpoint;

  const role = 'customer';

  const Schema = Joi.object({
    lastname: Joi.string()
      .regex(/^(?=.*[a-z]).{2,}$/)
      .required(),
    firstname: Joi.string()
      .regex(/^(?=.*[a-z]).{2,}$/)
      .required(),
    birthday: Joi.object(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr'] } }),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    adress: Joi.string().max(155).required(),
    zipcode: Joi.number().integer().required(),
    city: Joi.string()
      .regex(/^(?=.*[a-z]).{2,}$/)
      .required(),
    country: Joi.string()
      .regex(/^(?=.*[a-z]).{2,}$/)
      .required(),
    phone: Joi.number().integer(),
    offer: Joi.boolean(),
    role: Joi.string().min(3).max(155).required(),
  });

  const userInscription = {
    lastname,
    firstname,
    birthday,
    email,
    password,
    adress,
    zipcode,
    city,
    country,
    phone,
    offer,
    role,
  };

  function handleDate(e) {
    setBirthDay(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorEmail(false);
    setErrorPassword(false);
    setErrorLastName(false);
    setErrorFirstName(false);
    setErrorZipCode(false);
    setErrorCity(false);
    setErrorCountry(false);
    setErrorPhone(false);

    if (registration === true) {
      setInscription(true);

      const { error } = Schema.validate(userInscription, { abortEarly: false });
      if (error) {
        setInscription(false);
        let err = error.message;
        let email = err.includes('email');
        let errorPassword = err.includes('password');
        let lastname = err.includes('lastname');
        let firstname = err.includes('firstname');
        let zipcode = err.includes('zipcode');
        let phone = err.includes('phone');
        let city = err.includes('city');
        let country = err.includes('country');
        if (errorPassword === true) {
          setErrorPassword(true);
        }
        if (email === true) {
          setErrorEmail(true);
        }
        if (lastname === true) {
          setErrorLastName(true);
        }
        if (firstname === true) {
          setErrorFirstName(true);
        }
        if (zipcode === true) {
          setErrorZipCode(true);
        }
        if (phone === true) {
          setErrorPhone(true);
        }
        if (city === true) {
          setErrorCity(true);
        }
        if (country === true) {
          setErrorCountry(true);
        }
        return;
      }
      if (!error) {
        axios
          .post(`${endpoint}/auth/signup`, userInscription, {
            validateStatus: function (status) {
              return status < 500; // Resolve only if the status code is less than 500
            },
          })
          .then((response) => {
            if (response.status === 400) {
              setInscription(false);
              setWrongEmail(true);
            }
            if (response.status === 200) {
              setInscription(false);
              return router.push('/');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      const userLogin = {
        email,
        password,
      };

      setIdentifier(true);

      axios
        .post(`${endpoint}/auth/signin`, userLogin, {
          validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
          },
        })
        .then((response) => {
          if (response.status === 404) {
            setIdentifier(false);
            return setInvalidSignin(true);
          }
          if (response.status === 401) {
            setIdentifier(false);
            return setInvalidSignin(true);
          }
          if (response.status === 200) {
            setCurrentUser(response.data);
            window.localStorage.setItem('APPToken', JSON.stringify(response.data));

            setInvalidSignin(false);
            return router.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function registrationCheck() {
    setRegistrationCheck(!registration);
    setInvalidSignin(false);
  }

  function offreCheck() {
    setOffer(!offer);
  }

  const politiqueCheck = () => {
    setPolitique(!politique);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        sx={{
          padding: { xs: '1rem', md: '2rem' },
          backgroundColor: 'white',
          minHeight: { xs: '400px', md: '400px' },
          maxWidth: '90vw',
          width: 'min(90vw, 1000px)',
          boxShadow: '0px 5px 5px black',
          borderRadius: '5px',
          overflow: 'hidden',
          gap: '3vh',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <ClearIcon
          onClick={() => router.push('/')}
          sx={{ cursor: 'pointer', position: 'absolute', top: '20px', right: '20px' }}
        />

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '0.5vw',
          }}
        >
          <PersonOutlineSharpIcon fontSize="large" />
          <Typography> {registration ? 'Inscription' : 'Connexion'}</Typography>
        </Stack>

        <TextField
          required
          id="standard-required"
          label={errorEmail ? 'Email doit être un email valide' : 'E-mail'}
          placeholder="adresse@email.com"
          variant="standard"
          color={errorEmail ? 'error' : 'secondary'}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          focused
        />

        <TextField
          required
          id="standard-password-input"
          label={
            errorPassword ? 'Password doit au moin avoir 8 charactere de long, 1 majuscule et 1 chiffre' : 'Password'
          }
          type="password"
          autoComplete="current-password"
          variant="standard"
          color={errorPassword ? 'error' : 'secondary'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          focused
        />
        {registration ? (
          <>
            <TextField
              required
              id="standard-required"
              label={errorLastName ? 'Nom doit contenir que des lettres' : 'Nom'}
              placeholder="Doe"
              variant="standard"
              color={errorLastName ? 'error' : 'secondary'}
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              focused
            />
            <TextField
              required
              id="standard-required"
              label={errorFirstName ? 'Prénom doit contenir que des lettres' : 'Prénom'}
              placeholder="John"
              variant="standard"
              color={errorFirstName ? 'error' : 'secondary'}
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              focused
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date de naissance"
                inputFormat="DD/MM/YYYY"
                value={birthday}
                onChange={(e) => handleDate(e)}
                renderInput={(params) => <TextField {...params} />}
                focused
              />
            </LocalizationProvider>
            <TextField
              required
              id="standard-required"
              label="Adresse"
              placeholder="36 rue des tulipes"
              variant="standard"
              color="secondary"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              focused
            />
            <TextField
              required
              id="standard-required"
              label={errorZipCode ? 'Code postal doit uniquement contenir des chiffres' : 'Code postal'}
              placeholder="67000"
              variant="standard"
              color={errorZipCode ? 'error' : 'secondary'}
              type="tel"
              value={zipcode}
              onChange={(e) => setZipCode(e.target.value)}
              focused
            />
            <TextField
              required
              id="standard-required"
              label={errorCity ? 'Ville doit contenir que des lettres' : 'Ville'}
              placeholder="Strasbourg"
              variant="standard"
              color={errorCity ? 'error' : 'secondary'}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              focused
            />
            <TextField
              required
              id="standard-required"
              label={errorCountry ? 'Pays doit contenir que des lettres' : 'Pays'}
              placeholder="France"
              variant="standard"
              color={errorCountry ? 'error' : 'secondary'}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              focused
            />
            <TextField
              required
              id="standard-required"
              label={errorPhone ? 'Téléphone doit uniquement contenir des chiffres' : 'Téléphone'}
              placeholder="0735625333"
              variant="standard"
              color={errorPhone ? 'error' : 'secondary'}
              type="tel"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              focused
            />
            <Stack>
              {registration ? (
                <>
                  <FormControlLabel
                    control={<Checkbox color="secondary" checked={offer} onChange={offreCheck} />}
                    label="Souscrire aux offres et promotion de courses"
                  />

                  <FormControlLabel
                    control={<Checkbox color="secondary" required checked={politique} onChange={politiqueCheck} />}
                    label="Accepter la politique de l'entreprise"
                  />
                  <Accordion>
                    <AccordionSummary sx={{ boxShadow: '0px 5px 5px grey' }} expandIcon={<ArrowDropDownIcon />}>
                      <Typography>Politique de l'entreprise</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <br />
                      <br />
                      <Typography>
                        Voici quelques informations à retenir avant de réserver un trajet sur notre page :
                        <br />
                        <br />- Les courses ne peuvent être réservées qu' 1 heure après l'heure actuelle de réservation,
                        réserver en avance!
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </>
              ) : null}
            </Stack>
          </>
        ) : null}
        <Stack sx={{ display: 'flex', alignItems: 'center' }}>
          {registration ? null : (
            <FormControlLabel control={<Checkbox color="secondary" />} label="Se souvenir de moi" />
          )}
          <FormControlLabel control={<Checkbox color="secondary" onChange={registrationCheck} />} label="S'inscrire" />
          {wrongEmail ? <Typography sx={{ color: 'error.main' }}>L'Email existe deja.</Typography> : null}
          {invalidSignin ? (
            <Typography sx={{ color: 'error.main' }}>Email et/ou mot de passe incorrect(s)</Typography>
          ) : null}

          <Button
            variant="contained"
            type="submit"
            sx={{ color: 'primary.main', bgcolor: 'secondary.dark', minWidth: '50%', marginTop: '10px' }}
          >
            {registration
              ? !inscription
                ? "S'inscrire"
                : 'Inscription en cours...'
              : !identifier
              ? "S'identifier"
              : 'Identification en cours...'}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export default Connexion;
