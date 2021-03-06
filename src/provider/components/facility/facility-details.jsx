import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Facility } from '../../constants/provider.models';
import AddressDisplay from '../../../shared/components/address-display';
import If from '../../../shared/components/if';

export default class FacilityDetails extends Component {
    render() {
        const facility = this.props.facility,
            facilityName = facility.get('facilityName'),
            distance = facility.get('distance'),
            facilityType = facility.get('facilityType'),
            addressLine1 = facility.get('addressLine1'),
            addressLine2 = facility.get('addressLine2'),
            city = facility.get('city'),
            state = facility.get('state'),
            zip = facility.get('zip');
        
        return <div className='facility-details provider-details card bg-light' onClick={() => this.props.onClick(facility)}>
            <div className="card-header">
                <h5 className="card-title">{facilityName}</h5>
                <If condition={distance !== 0}>
                    <p className="card-subtitle"><em>({distance} mi.)</em></p>
                </If>
            </div>
            <div className="card-body">
                <p className="card-text">{facilityType}</p>
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

FacilityDetails.propTypes = {
    facility: ImmutablePropTypes.recordOf(Facility)
}