import React, { Component, Fragment } from 'react';
import { 
    Dimensions, 
    View, 
    StatusBar,
    Image } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import { APY_KEY } from 'react-native-dotenv';

import Geocoder from 'react-native-geocoding';

Geocoder.init(APY_KEY);

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';

import { getPixelSize } from '../../utils';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

import { 
    LocationBox, 
    LocationText, 
    LocationTimeText, 
    LocationTimeTextSmall, 
    LocationTimeBox,
    Back } from './styles';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends Component {

    state = {
        location: null,
        duration: null,
        region: null,
        destination: null,
    }

    async componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const location = address.substring(0, address.indexOf(','));

                this.setState({
                    location,
                    region: {
                        latitude, 
                        longitude, 
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }
                });
            },
            () => {},
            {
                timeout: 5000,
            }
        );
    }

    handleOnLocationSeleted = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude } } = geometry;
        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            }
        });
    }

    handleBack = () => {
        this.setState({ destination: null });
    }

    render() {

        const { region, destination, duration, location } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent backgroundColor="transparent" barStyle='dark-content' />
                <MapView
                    style={{ flex: 1 }}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                    ref={el => this.mapView = el}
                >
                    {destination && (
                        <Fragment>
                            <Directions
                                origin={region}
                                destination={destination}
                                onReady={(result) => {
                                    this.setState({ duration: Math.floor(result.duration) })
                                    this.mapView.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            right: getPixelSize(50),
                                            bottom: getPixelSize(350),
                                            left: getPixelSize(50),
                                            top: getPixelSize(50),
                                        }
                                    });
                                }}
                            />
                            <Marker 
                                coordinate={destination} 
                                anchor={{ x: 0, y: 0 }} 
                                image={markerImage}>
                                <LocationBox>
                                    <LocationText>{destination.title}</LocationText>
                                </LocationBox>
                            </Marker>
 
                            <Marker 
                                coordinate={region} 
                                anchor={{ x: 0, y: 0 }}
                            >
                                <LocationBox>
                                    <LocationTimeBox>
                                        <LocationTimeText>{duration}</LocationTimeText>
                                        <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                                    </LocationTimeBox>
                                    <LocationText>{location}</LocationText>
                                </LocationBox>
                            </Marker>

                        </Fragment>
                    )}
                </MapView>

                { destination ?
                    (
                    <Fragment>
                        <Back onPress={this.handleBack}>
                            <Image source={backImage} />
                        </Back>
                        <Details />
                    </Fragment>
                    ) : <Search onLocationSeleted={this.handleOnLocationSeleted} /> }

            </View>
        )
    }
}