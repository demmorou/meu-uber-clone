import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { APY_KEY } from 'react-native-dotenv';

const Directions = ({ destination, origin, onReady }) => (
    <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={APY_KEY}
        strokeWidth={3}
        strokeColor="#222"
        onReady={onReady}
    />
)

export default Directions;
