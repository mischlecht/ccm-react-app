import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ProviderSearchResults } from '../constants/provider.models';
import DoctorDetails from './doctor-details';
import FacilityDetails from './facility-details';
import If from '../../shared/components/if';

export default class ProviderResults extends Component {
    render() {
        const providerSearchResults = this.props.providerSearchResults,
            providers = providerSearchResults.get('providers');
        
        return <div className="container">
            <div className="text-center">
                <p>Provider Results</p>
            </div>

            <div className="container provider-results">
                <If condition={providers.size > 0} >
                    <div className="row">
                        {this.renderProviderResults(providers)}
                    </div>
                </If>
            </div>
        </div>
    }

    renderProviderResults(providers) {
        if(this.props.providerSearchResults.get('providerType') === 'doctor') {
            return providers.map(doctor => this.renderDoctors(doctor));
        } else {
            return providers.map(facility => this.renderFacilities(facility));
        }
        
    }

    renderDoctors(doctor) {
        return <DoctorDetails 
            key={doctor.get('providerId')}
            doctor={doctor} />
    }

    renderFacilities(facility) {
        return <FacilityDetails 
            key={facility.get('facilityProviderId')}
            facility={facility} />
    }
};

ProviderResults.propTypes = {
    providerSearchResults: ImmutablePropTypes.recordOf(ProviderSearchResults)
}