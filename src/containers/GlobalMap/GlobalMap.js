import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Marker from '../../components/Marker/Marker';

const Map = ({ country }) => {
  const [position, setPosition] = useState({
    center: {
      lat: 48.36,
      lng: 10.89,
    },
    zoom: 11,
  });

  const setCountry = () => {
    if (country.length) {
      const [lat, lng] = [country[0].latlng[0], country[0].latlng[1]];
      const newPosition = {
        center: {
          lat,
          lng,
        },
        zoom: 5,
      };
      setPosition(newPosition);
    }
  };

  useEffect(() => {
    setCountry();
  }, [country]);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
        defaultCenter={position.center}
        defaultZoom={position.zoom}
        center={position.center}
        zoom={position.zoom}
      >
        <Marker
          lat={position.center.lat}
          lng={position.center.lng}
        />
      </GoogleMapReact>
    </div>
  );
};

Map.propTypes = {
  country: PropTypes.arrayOf(PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
      symbol: PropTypes.string,
    })),
    flag: PropTypes.string,
    name: PropTypes.string,
    capital: PropTypes.string,
    region: PropTypes.string,
    population: PropTypes.number,
    latlng: PropTypes.arrayOf(PropTypes.number),
    timezones: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};


export default Map;
