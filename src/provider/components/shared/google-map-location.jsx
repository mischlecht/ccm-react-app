import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import DoctorIcon from '../doctor/doctor-icon';
import FacilityIcon from '../facility/facility-icon';

export default class GoogleMapLocation extends Component {
    render() {
        const lat = this.props.lat,
            lng = this.props.lng,
            center = { lat, lng },
            zoom = 12;


        if (this.props.providerType === 'doctor') {
            return <GoogleMapReact
            defaultCenter={center}
            defaultZoom={zoom} >
            <DoctorIcon
                lat={lat}
                lng={lng} />
        </GoogleMapReact>;
        } else {
            return <GoogleMapReact
            defaultCenter={center}
            defaultZoom={zoom} >
            <FacilityIcon
                lat={lat}
                lng={lng} />
        </GoogleMapReact>;
        }
    }
};

GoogleMapLocation.propTypes = {
    providerType: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
}