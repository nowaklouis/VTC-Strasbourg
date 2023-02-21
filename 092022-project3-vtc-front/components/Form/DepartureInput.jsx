import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
const AddressAutofill = dynamic(() => import('@mapbox/search-js-react').then((mod) => mod.AddressAutofill), {
  ssr: false,
});
import { InputAdornment, TextField } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function DepartureInput({ departureRef, handleDeparture, geoLocLoading, handleGeoLoc }) {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

  return (
    <AddressAutofill
      accessToken={accessToken}
      onRetrieve={(e) => handleDeparture(e)}
      options={{
        language: 'fr',
        country: 'FR',
      }}
    >
      <TextField
        label="Départ"
        variant="standard"
        color="secondary"
        inputRef={departureRef}
        inputProps={{ 'data-cy': 'departure-input' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ paddingBottom: '.4rem' }}>
              {!geoLocLoading ? (
                <LocationOnIcon sx={{ cursor: 'pointer' }} onClick={handleGeoLoc} data-cy="geoloc-btn" />
              ) : (
                <AutorenewIcon
                  sx={{
                    animation: 'spin 2s linear infinite',
                    '@keyframes spin': {
                      '0%': {
                        transform: 'rotate(-360deg)',
                      },
                      '100%': {
                        transform: 'rotate(0deg)',
                      },
                    },
                  }}
                  data-cy="geoloc-loading"
                />
              )}
            </InputAdornment>
          ),
        }}
        fullWidth
      />
    </AddressAutofill>
  );
}

DepartureInput.propTypes = {
  handleDeparture: PropTypes.func.isRequired,
  geoLocLoading: PropTypes.bool.isRequired,
  handleGeoLoc: PropTypes.func.isRequired,
  departureRef: PropTypes.any.isRequired,
};

export default DepartureInput;
