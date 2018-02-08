import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Facility } from '../constants/provider.models';

export default class FacilityDetails extends Component {
    render() {
        const facility = this.props.facility,
            lastName = facility.get('last'),
            firstName = facility.get('first');
        
        return <div className='bg-light provider-deatil'>
            <p>{lastName}, {firstName}</p>
        </div>
    }
};

FacilityDetails.propTypes = {
    facility: ImmutablePropTypes.recordOf(Facility)
}