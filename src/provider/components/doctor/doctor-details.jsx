import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Doctor } from '../../constants/provider.models';
import AddressDisplay from '../../../shared/components/address-display';
import If from '../../../shared/components/if';

export default class DoctorDetails extends Component {
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
            zip = doctor.get('zip');
        
        return <div className="doctor-details provider-details card bg-light" onClick={() => this.props.onClick(doctor)}>
            <div className="card-header">
                <h5 className="card-title">{lastName}, {firstName}, {degree}</h5>
                <If condition={distance !== 0}>
                    <p className="card-subtitle"><em>({distance} mi.)</em></p>
                </If>
            </div>
            <div className="card-body">
                <p className="card-text">{specialty}</p>
                <AddressDisplay
                    className="card-text"
                    addressLine1={addressLine1}
                    addressLine2={addressLine2}
                    city={city}
                    state={state}
                    zip={zip} />
            </div>
        </div>;
    }
};

DoctorDetails.propTypes = {
    doctor: ImmutablePropTypes.recordOf(Doctor),
    onClick: PropTypes.func.isRequired
}