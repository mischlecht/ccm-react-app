import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ProviderSearchResults } from '../constants/provider.models';
import DoctorDetails from './doctor-details';
import FacilityDetails from './facility-details';
import LoadingIcon from '../../shared/images/loading.gif';

export default class ProviderResults extends Component {
    componentWillUpdate() {
        // console.log('Provider Results updating');
        //https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif
    }

    render() {
        const searchIsValid = this.props.searchIsValid,
            searchingForProviders = this.props.searchingForProviders,
            providerSearchResults = this.props.providerSearchResults,
            providersFiltered = providerSearchResults.get('providersFiltered');
        
        if (providersFiltered.size > 0) {
            return <div>
                {this.renderProviderResults(providersFiltered)}
            </div>;
        } else if (searchingForProviders) {
            return <div className="text-center">
                <img src={LoadingIcon} alt="Loading..."/>
            </div>;
        } else if (!searchIsValid) {
            return <div className="text-center">
                <br/>
                <h4><em>Enter search parameters</em></h4>
                <small >'Zip Code' + 'Provider Type' required</small>
            </div>;
        } else if (searchIsValid && providersFiltered.size === 0 ) {
            return <div className="text-center">
                <br/>
                <h4><em>No Search Results</em></h4>
                <small ><em>Try increasing 'Search Radius'</em></small>
            </div>;
        }
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
    searchingForProviders: PropTypes.bool.isRequired,
    providerType: PropTypes.string.isRequired,
    providerSearchResults: ImmutablePropTypes.recordOf(ProviderSearchResults)
}