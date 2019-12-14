import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({ destination, origin, onReady }) => (
    <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={'AIzaSyACQ0EcknhqeFkOabwvMrOQs_ZVQVxg2fE'}
        strokeWidth={3}
        strokeColor="#222"
        onReady={onReady}
    />
)

export default Directions;
