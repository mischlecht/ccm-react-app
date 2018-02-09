import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';

import DoctorFilter from './doctor-filter';
import FacilityFilter from './facility-filter';
import * as Models from '../constants/provider.models';
import * as SpecialtyUtils from '../../shared/utils/specialty-utils';
import * as FacilityUtils from '../../shared/utils/facility-utils';
// import * as ProviderActions from '../provider.actions';

export default class ProviderFilter extends Component {
    constructor(props){
        super(props);

        this.state = {
            specialties: Immutable.List(),
            facilityTypes: Immutable.List()
        };

        this.handleFacilityFilterChange = this.handleFacilityFilterChange.bind(this);
        this.handleDoctorFilterChange = this.handleDoctorFilterChange.bind(this);
    }

    componentDidMount() {
        SpecialtyUtils.populateSpecialtyTypes(specialties => {this.setState({specialties})});
        FacilityUtils.populateFacilityTypes(facilityTypes => {this.setState({facilityTypes})});
    }

    setFacilityTypes(facilityTypes) {
        this.setState({facilityTypes});
    }

    render() {
        const providerType = this.props.providerType,
            doctorFilters = this.props.filters.get('doctorFilters'),
            facilityFilters = this.props.filters.get('doctorFilters'),
            specialties = this.state.specialties,
            facilityTypes = this.state.facilityTypes;

        if (providerType === 'doctor') {
            return <div className="filter-container">
                <hr/>
                <DoctorFilter
                    doctorFilters={doctorFilters}
                    specialties={specialties} />
            </div>;
        } else if (providerType === 'facility') {
            return <div className="filter-container">
                <hr/>
                <FacilityFilter
                    facilityFilters={facilityFilters}
                    facilityTypes={facilityTypes} />
            </div>;
        } else {
            return <div/>;
        }
    }

    handleFacilityFilterChange() {
        // handle facility filter change
        // handle doctor filter change
    }

    handleDoctorFilterChange() {
        // handle facility filter change
        // handle doctor filter change
    }
};

ProviderFilter.propTypes = {
    providerType: PropTypes.string,
    filters: ImmutablePropTypes.contains({
        doctorFilters: ImmutablePropTypes.recordOf(Models.DoctorFilters),
        facilityFilters: ImmutablePropTypes.recordOf(Models.FacilityFilters)
    })
};
