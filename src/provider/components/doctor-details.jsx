import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Doctor } from '../constants/provider.models';

export default class DoctorDetails extends Component {
    render() {
        const doctor = this.props.doctor,
            lastName = doctor.get('last'),
            firstName = doctor.get('first'),
            degree = doctor.get('degree'),
            specialty = doctor.get('specialty');
        
        return <div className='col bg-light doctor-detail'>
            <h5>{firstName}, {lastName}, {degree}</h5>
            <p>{specialty}</p>
        </div>
    }
};

DoctorDetails.propTypes = {
    doctor: ImmutablePropTypes.recordOf(Doctor),
    handleClick: PropTypes.func.isRequired
}