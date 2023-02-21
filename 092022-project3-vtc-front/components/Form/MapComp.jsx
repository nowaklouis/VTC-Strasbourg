import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Map, { Marker } from 'react-map-gl';

import FmdGoodTwoToneIcon from '@mui/icons-material/FmdGoodTwoTone';
import PersonPinCircleTwoToneIcon from '@mui/icons-material/PersonPinCircleTwoTone';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

function MapComp({ depMarker, destMarker }) {
  const [viewState, setViewState] = useState({
    latitude: 48.58186963621235,
    longitude: 7.750978575153635,
    zoom: 12,
  });

  useEffect(() => {
    if (depMarker.coord.length > 0)
      setViewState({
        latitude: depMarker.coord[1],
        longitude: depMarker.coord[0],
        zoom: 12,
      });
  }, [depMarker]);

  return (
    <Map
      {...viewState}
      mapboxAccessToken={accessToken}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/light-v11"
      initialViewState={viewState}
      style={{ width: '450px', height: '450px' }}
      pitch={60}
    >
      {depMarker.coord.length > 0 && (
        <Marker latitude={depMarker.coord[1]} longitude={depMarker.coord[0]} anchor={'center'}>
          <PersonPinCircleTwoToneIcon />
        </Marker>
      )}
      {destMarker.coord.length > 0 && (
        <Marker latitude={destMarker.coord[1]} longitude={destMarker.coord[0]} anchor={'center'}>
          <FmdGoodTwoToneIcon />
        </Marker>
      )}
    </Map>
  );
}

MapComp.propTypes = {
  depMarker: PropTypes.shape({
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    coord: PropTypes.arrayOf(PropTypes.number),
  }),
  destMarker: PropTypes.shape({
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    coord: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default MapComp;
