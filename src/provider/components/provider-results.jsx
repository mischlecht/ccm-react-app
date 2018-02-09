import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ProviderSearchResults } from '../constants/provider.models';
import DoctorDetails from './doctor-details';
import FacilityDetails from './facility-details';
import If from '../../shared/components/if';

export default class ProviderResults extends Component {
    render() {
        const providerSearchResults = this.props.providerSearchResults,
            providersFiltered = providerSearchResults.get('providersFiltered');
        
        return <div className="provider-results">
            <If condition={providersFiltered.size > 0} >
                {this.renderProviderResults(providersFiltered)}
            </If>
        </div>
    }

    renderProviderResults(providersFiltered) {
        if(this.props.providerSearchResults.get('providerType') === 'doctor') {
            return providersFiltered.map(doctor => this.renderDoctors(doctor));
        } else {
            return providersFiltered.map(facility => this.renderFacilities(facility));
        }
        
    }

    renderDoctors(doctor) {
        return <DoctorDetails 
            key={doctor.get('id')}
            doctor={doctor} />;
    }

    renderFacilities(facility) {
        return <FacilityDetails 
            key={facility.get('id')}
            facility={facility} />;
    }
};

ProviderResults.propTypes = {
    providerSearchResults: ImmutablePropTypes.recordOf(ProviderSearchResults)
}