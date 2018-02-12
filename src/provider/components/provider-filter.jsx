import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import DoctorFilter from './doctor/doctor-filter';
import FacilityFilter from './facility/facility-filter';
import * as Models from '../constants/provider.models';

export default class ProviderFilter extends Component {
    setFacilityTypes(facilityTypes) {
        this.setState({facilityTypes});
    }

    render() {
        const doctorFilters = this.props.filters.get('doctorFilters'),
            facilityFilters = this.props.filters.get('facilityFilters'),
            specialtiesFiltered = this.props.staticData.get('specialtiesFiltered'),
            facilityTypesFiltered = this.props.staticData.get('facilityTypesFiltered');

        if(this.props.searchIsValid && this.props.hasSearchResults) {
            switch(this.props.providerType) {
                case 'doctor':
                    return <div className="filter-container">
                        <hr/>
                        <DoctorFilter
                            doctorFilters={doctorFilters}
                            specialtiesFiltered={specialtiesFiltered} />
                    </div>;
                case 'facility':
                    return <div className="filter-container">
                        <hr/>
                        <FacilityFilter
                            facilityFilters={facilityFilters}
                            facilityTypesFiltered={facilityTypesFiltered} />
                    </div>;
                default:
                    return <div></div>;
            }
        } else {
            return <div></div>;
        }
    }
};

ProviderFilter.propTypes = {
    searchIsValid: PropTypes.bool.isRequired,
    hasSearchResults: PropTypes.bool.isRequired,
    providerType: PropTypes.string.isRequired,
    filters: ImmutablePropTypes.recordOf(Models.Filters),
    staticData: ImmutablePropTypes.contains({
        specialtiesFiltered: ImmutablePropTypes.list.isRequired,
        facilityTypesFiltered: ImmutablePropTypes.list.isRequired
    })
};
