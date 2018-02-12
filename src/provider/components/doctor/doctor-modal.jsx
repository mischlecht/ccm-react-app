import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Doctor } from '../../constants/provider.models';
import AddressDisplay from '../../../shared/components/address-display';
import If from '../../../shared/components/if';
import GoogleMapsLocation from '../shared/google-map-location';

export default class DoctorModal extends Component {
    render() {
        const doctor = this.props.doctor,
            lastName = doctor.get('last'),
            firstName = doctor.get('first'),
            degree = doctor.get('degree'),
            distance = doctor.get('distance'),
            specialty = doctor.get('specialty'),
            addressLine1 = doctor.get('addressLine1'),
            addressLine2 = doctor.get('addressLine2'),
            city = doctor.get('city'),
            state = doctor.get('state'),
            zip = doctor.get('zip'),
            phone = doctor.get('phone'),
            coordinates = doctor.getIn(['metaData', 'coordinates']);
        let latitude = null,
            longitude = null;

        if (coordinates) {
            latitude = coordinates.get('latitude');
            longitude = coordinates.get('longitude')
        }
        
        return <div className="doctor-modal-details">
            <div className="row modal-details-content">
                <div className={coordinates ? "col-5" : "col"}>
                    <h3>{lastName}, {firstName}, {degree}</h3>
                    <If condition={distance !== 0}>
                        <p><em>({distance} mi.)</em></p>
                    </If>
                    <p>{specialty}</p>
                    <AddressDisplay
                        id='modalAddress'
                        addressLine1={addressLine1}
                        addressLine2={addressLine2}
                        city={city}
                        state={state}
                        zip={zip} />

                    <a href={`tel:${phone}`}>{phone}</a>
                </div>
                <If condition={coordinates !== null} >
                    <div className="col-7">
                        <GoogleMapsLocation
                        lat={latitude}
                        lng={longitude}
                        providerType='facility' />
                    </div>
                </If>
            </div>

            <div className="row modal-details-footer">
                <div className="col">
                    <button className="form-control bg-secondary text-white"
                        id='close-modal-button'
                        onClick={this.props.closeModal}>Close</button>
                </div>
            </div>
            
        </div>;
    }
};

DoctorModal.propTypes = {
    doctor: ImmutablePropTypes.recordOf(Doctor),
    closeModal: PropTypes.func.isRequired
}