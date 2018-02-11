import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ProviderSearchResults } from '../constants/provider.models';
import DoctorDetails from './doctor-details';
import FacilityDetails from './facility-details';
import If from '../../shared/components/if';

export default class ProviderResults extends Component {
    render() {
        const searchIsValid = this.props.searchIsValid,
            providerSearchResults = this.props.providerSearchResults,
            providersFiltered = providerSearchResults.get('providersFiltered');
        
        return <div className="provider-results">
            <If condition={providersFiltered.size > 0} >
                {this.renderProviderResults(providersFiltered)}
            </If>
            <If condition={!searchIsValid} >
                <div className="text-center">
                    <br/>
                    <h4><em>Enter search parameters</em></h4>
                    <small >'Zip Code' + 'Provider Type' required</small>
                </div>
            </If>
            <If condition={searchIsValid && providersFiltered.size === 0} >
                <div className="text-center">
                    <br/>
                    <h4><em>No Search Results</em></h4>
                    <small ><em>Try increasing 'Search Radius'</em></small>
                </div>
            </If>
        </div>
    }

    renderProviderResults(providersFiltered) {
        if(this.props.providerType === 'doctor') {
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
    searchIsValid: PropTypes.bool.isRequired,
    providerType: PropTypes.string.isRequired,
    providerSearchResults: ImmutablePropTypes.recordOf(ProviderSearchResults)
}