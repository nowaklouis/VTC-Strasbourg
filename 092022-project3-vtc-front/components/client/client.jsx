import { useState, useEffect } from 'react';
import { Box, Card, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useUser } from '../../context/user.context';
import { useRouter } from 'next/router';
import axios from 'axios';
import config from '../../config/config.json';
import History from './history';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const endpoint = config.api_endpoint;

function Client() {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState({
    lastname: '',
    firstname: '',
    email: '',
    birthday: '',
    adress: '',
    zipcode: '',
    city: '',
    country: '',
    phone: '',
  });
  const [disabl, setDisabl] = useState(true);

  const router = useRouter();

  const { currentUser, isLoading } = useUser();

  const usersInfo = async () => {
    await axios
      .get(`${endpoint}/user/compte?email=${currentUser?.email}`, {
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setInfo(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push('/login');
    } else {
      if (currentUser?.email) usersInfo();
    }
    // eslint-disable-next-line
  }, [currentUser, isLoading]);

  const someFunction1 = () => {
    handleChange();
    edition();
  };

  const someFunction2 = () => {
    handleChange();
    edition();
    putUser();
  };

  const handleChange = () => setEdit(!edit);

  const edition = () => {
    setDisabl(!disabl);
  };

  const newInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const putUser = async () => {
    await axios.put(`${endpoint}/user/compte?email=${currentUser?.email}`, info);
  };

  const deleteUser = async () => {
    await axios
      .delete(`${endpoint}/user/compte?email=${currentUser?.email}`, {
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.localStorage.removeItem('APPToken');
          router.push('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ display: 'flex', padding: '20px 20px 0px 20px' }}>
        <PersonOutlineSharpIcon />
        <Typography>
          {info?.lastname} - {info?.firstname}
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'end' }}>
        <Button variant="outlined" color="secondary" onClick={someFunction1}>
          Editer Profil
        </Button>
      </Box>
      <Box components="form" sx={{ padding: '20px' }}>
        <TextField
          fullWidth
          focused
          disabled={disabl ? true : false}
          color="secondary"
          id="client-lastName"
          label="Nom"
          name="lastname"
          variant="outlined"
          value={info?.lastname}
          onChange={newInfo}
        />
      </Box>
      <Box sx={{ padding: '20px' }}>
        <TextField
          fullWidth
          focused
          disabled={disabl ? true : false}
          color="secondary"
          id="client-firstName"
          label="Prénom"
          name="firstname"
          variant="outlined"
          value={info?.firstname}
          onChange={newInfo}
        />
      </Box>
      <Box sx={{ padding: '20px' }}>
        <TextField
          fullWidth
          focused
          disabled={disabl ? true : false}
          color="secondary"
          id="client-mail"
          label="E-mail"
          name="email"
          variant="outlined"
          value={info?.email}
          onChange={newInfo}
        />
      </Box>
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date de naisance"
            name="birthday"
            inputFormat="DD/MM/YYYY"
            disabled={disabl ? true : false}
            value={info?.birthday}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ padding: '20px' }}>
        <TextField
          fullWidth
          focused
          disabled={disabl ? true : false}
          color="secondary"
          id="client-adress"
          name="adress"
          label="Adresse"
          variant="outlined"
          value={info?.adress}
          onChange={newInfo}
        />
      </Box>
      <Box sx={{ padding: '20px' }}>
        <TextField
          fullWidth
          focused
          disabled={disabl ? true : false}
          color="secondary"
          id="client-cp"
          name="zipcode"
          label="Code Postal"
          variant="outlined"
          value={info?.zipcode}
          onChange={newInfo}
        />
      </Box>
      <Box sx={{ padding: '20px' }}>
        <TextField
          fullWidth
          focused
          disabled={disabl ? true : false}
          color="secondary"
          id="client-ville"
          name="city"
          label="Ville"
          variant="outlined"
          value={info?.city}
          onChange={newInfo}
        />
      </Box>
      <Box sx={{ padding: '20px' }}>
        <TextField
          fullWidth
          focused
          disabled={disabl ? true : false}
          color="secondary"
          id="client-pays"
          name="country"
          label="Pays"
          variant="outlined"
          value={info?.country}
          onChange={newInfo}
        />
      </Box>
      <Box sx={{ padding: '20px' }}>
        <TextField
          fullWidth
          focused
          disabled={disabl ? true : false}
          color="secondary"
          id="client-tel"
          name="phone"
          label="Tel Mobile"
          variant="outlined"
          value={info?.phone}
          onChange={newInfo}
        />
      </Box>
      {edit ? (
        <Box sx={{ textAlign: 'end' }}>
          <Button variant="outlined" color="other" onClick={someFunction2}>
            Valider
          </Button>
        </Box>
      ) : null}

      <Card>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked color="default" />}
            label="Soucrire aux offres et promotion de courses"
          />
        </FormGroup>
      </Card>
      <Box sx={{ paddingTop: '20px', paddingBottom: '20px', width: { xs: '80vw', md: '50vw' } }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Contrat de l'entreprise</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
              leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
              lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Historique des courses</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <History />
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ textAlign: 'center', paddingTop: '20px' }}>
        <Button onClick={handleOpen} color="error">
          Suppression du compte
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Etes-vous sûr de vouloir supprimer vôtre compte ?
            </Typography>
            <Box sx={{ textAlign: 'end', paddingTop: '20px' }}>
              <Button color="secondary" variant="contained" onClick={deleteUser}>
                Oui
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default Client;
