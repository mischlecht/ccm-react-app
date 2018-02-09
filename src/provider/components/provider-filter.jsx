import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutabelPropTypes from 'react-immutable-proptypes';
import * as Models from '../constants/provider.models';
// import * as ProviderActions from '../provider.actions';

export default class ProviderFilter extends Component {
    constructor(props){
        super(props);

        this.state = {
            filterOptions: new Models.FilterOptions()
        };

        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    render() {
        const providerType = this.props.providerType,
            doctorFilters = this.props.filterOptions.get('doctorFilters'),
            facilityFilters = this.props.filterOptions.get('facilityFilters');

        if (providerType === 'doctor') {
            return <div className="filter-container">
                <DoctorFilterStateful doctorFilters={doctorFilters} />
            </div>;
        } else if (providerType === 'facility') {
            return <div className="filter-container">
                <FacilityFilterStateful facilityFilters={facilityFilters} />
            </div>;
        } else {
            return <div/>;
        }
    }

    handleFilterChange() {
        // handle facility filter change
        // handle doctor filter change
    }
};

ProviderFilter.propTypes = {
    providerType: PropTypes.string,
    filterOptions: ImmutabelPropTypes.contains({
        doctorFilters: ImmutabelPropTypes.recordOf(Models.DoctorFilters),
        facilityFilters: ImmutabelPropTypes.recordOf(Models.FacilityFilters)
    })
};

export class DoctorFilterStateful extends Component {
    render() {
        return <div className="text-center">
            <hr/>
            <p>Doctor Filter</p>
        </div>;
    }
}

DoctorFilterStateful.propTypes = {
    doctorFilters: ImmutabelPropTypes.recordOf(Models.DoctorFilters)
};

export class FacilityFilterStateful extends Component {
    render() {
        return <div className="text-center">
            <hr/>
            <p>Facility Filter</p>
        </div>;
    }
}

FacilityFilterStateful.propTypes = {
    facilityFilters: ImmutabelPropTypes.recordOf(Models.FacilityFilters)
};