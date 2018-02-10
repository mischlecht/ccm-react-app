import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import DoctorFilter from './doctor-filter';
import FacilityFilter from './facility-filter';
import * as Models from '../constants/provider.models';

export default class ProviderFilter extends Component {
    setFacilityTypes(facilityTypes) {
        this.setState({facilityTypes});
    }

    render() {
        const providerType = this.props.providerType,
            doctorFilters = this.props.filters.get('doctorFilters'),
            facilityFilters = this.props.filters.get('facilityFilters'),
            specialties = this.props.staticData.get('specialties'),
            facilityTypes = this.props.staticData.get('facilityTypes');

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
};

ProviderFilter.propTypes = {
    providerType: PropTypes.string.isRequired,
    doctorFilters: ImmutablePropTypes.recordOf(Models.DoctorFilters),
    facilityFilters: ImmutablePropTypes.recordOf(Models.FacilityFilters),
    staticData: ImmutablePropTypes.contains({
        specialties: ImmutablePropTypes.list.isRequired,
        facilityTypes: ImmutablePropTypes.list.isRequired
    })
};
