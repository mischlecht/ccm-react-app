import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Facility } from '../../constants/provider.models';
import AddressDisplay from '../../../shared/components/address-display';
import If from '../../../shared/components/if';
import GoogleMapsLocation from '../shared/google-map-location';

export default class FacilityModal extends Component {
    render() {
        const facility = this.props.facility,
            facilityName = facility.get('facilityName'),
            distance = facility.get('distance'),
            facilityType = facility.get('facilityType'),
            addressLine1 = facility.get('addressLine1'),
            addressLine2 = facility.get('addressLine2'),
            city = facility.get('city'),
            state = facility.get('state'),
            zip = facility.get('zip'),
            phone = facility.get('phone'),
            coordinates = facility.getIn(['metaData', 'coordinates']);
        let latitude = null,
            longitude = null;

        if (coordinates) {
            latitude = coordinates.get('latitude');
            longitude = coordinates.get('longitude')
        }
        
        return <div className="doctor-modal-details">
            <div className="row modal-details-content">
                <div className={coordinates ? "col-5" : "col"}>
                    <h3>{facilityName}</h3>
                    <If condition={distance !== 0}>
                        <p><em>({distance} mi.)</em></p>
                    </If>
                    <p>{facilityType}</p>
                    <AddressDisplay
                        id='modalAddress'
                        addressLine1={addressLine1}
                        addressLine2={addressLine2}
                        city={city}
                        state={state}
                        zip={zip} />

                    <a className="modal-phone-number" href={`tel:${phone}`}>{phone}</a>
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

FacilityModal.propTypes = {
    facility: ImmutablePropTypes.recordOf(Facility),
    closeModal: PropTypes.func.isRequired
}