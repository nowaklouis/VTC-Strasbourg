import React, { useState } from 'react';
import { Typography, Box, Button, Divider, Modal, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import BookForfaits from './BookForfaits';
const modalStyle = {
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

function Forfaits({ forfaits }) {
  const [open, setOpen] = useState(false);
  const [forfait, setForfait] = useState();
  const handleOpen = (data) => {
    setOpen(true);
    setForfait(data);
  };

  const handleClose = () => {
    setOpen(false);
    setForfait();
  };
  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {forfaits.map((forfait, index) => (
          <Stack
            key={index}
            gap=".5rem"
            justifyContent="space-between"
            sx={{
              backgroundColor: 'white',
              width: { xs: '20rem', md: '20rem' },
              margin: '20px',
              borderRadius: '5px',
              padding: '1rem',
              minHeight: '285px',
              boxShadow: '9px 8px 13px -3px rgba(0,0,0,0.3)',
            }}
          >
            <Stack gap=".5rem">
              <Typography variant="overline" sx={{ textAlign: 'center', lineHeight: '1rem' }}>
                {forfait.departure}
              </Typography>
              <Typography variant="overline" sx={{ textAlign: 'center', lineHeight: '1rem' }}>
                {forfait.destination}
              </Typography>
            </Stack>
            <Divider />
            <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '1rem' }}>
              {forfait.title}
            </Typography>
            <Typography variant="h4" sx={{ textAlign: 'center', color: 'secondary.dark' }}>
              {forfait.price}€
            </Typography>
            <Button
              variant="contained"
              color="success"
              sx={{ backgroundColor: 'black' }}
              onClick={() => handleOpen(forfait)}
            >
              Réserver
            </Button>
          </Stack>
        ))}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <BookForfaits forfait={forfait} />
        </Box>
      </Modal>
    </>
  );
}

Forfaits.propTypes = {
  forfaits: PropTypes.any.isRequired,
};

export default Forfaits;
