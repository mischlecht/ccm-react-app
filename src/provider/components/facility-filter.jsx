import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutabelPropTypes from 'react-immutable-proptypes';

import { FacilityFilters } from '../constants/provider.models';
import TextInput from '../../shared/components/text-input';
import * as ProviderActions from '../provider.actions';

export default class FacilityFilterStateful extends Component {
    constructor(props){
        super(props);

        this.handleFacilityFiltersChange = this.handleFacilityFiltersChange.bind(this);
        this.handleResetFilters = this.handleResetFilters.bind(this);
    }

    render() {
        const facilityFilters = this.props.facilityFilters,
            facilityName = facilityFilters.get('facilityName'),
            facilityType = facilityFilters.get('facilityType'),
            facilityTypesFiltered = this.props.facilityTypesFiltered;

        return <FacilityFilterStateless
            facilityName={facilityName}
            facilityType={facilityType}
            facilityTypesFiltered={facilityTypesFiltered}
            updateFacilityFilters={this.handleFacilityFiltersChange}
            resetFilters={this.handleResetFilters} />;
    }

    handleFacilityFiltersChange(param, val) {
        const newFacilityFilters = this.props.facilityFilters.set(param, val);

        ProviderActions.FilterProviders(newFacilityFilters);
    }

    handleResetFilters() {
        ProviderActions.ResetFilters();
    }
};

FacilityFilterStateful.propTypes = {
    facilityFilters: ImmutabelPropTypes.recordOf(FacilityFilters).isRequired,
    facilityTypesFiltered: ImmutabelPropTypes.list.isRequired
};

class FacilityFilterStateless extends Component {
    render() {
        const facilityNameClass = this.props.facilityName === '' ? "form-control" : "form-control is-valid",
            selectClass = this.props.facilityType === '' ? "form-control" : "form-control is-valid"

        return <div className="row form-inline">
            <div className="col-6">
                <TextInput
                    id='facilityNameInput'
                    className={facilityNameClass}
                    value={this.props.facilityName} 
                    label='Facility Name'
                    placeholder="Facility Name"
                    onChange={val => this.props.updateFacilityFilters('facilityName', val)} />
            </div>
           
            <div className="col-4">
            <label htmlFor='facilityTypeSelect'>Facility Type</label>
                <select
                    value={this.props.facilityType}
                    id='facilityTypeSelect'
                    className={selectClass}
                    onChange={(event) => this.props.updateFacilityFilters('facilityType', event.target.value)}>

                    <option defaultValue value=''>Select Facility Type</option>
                    {this.renderFacilityTypes()}
                </select>
            </div>

            <div className="col-2">
            <label htmlFor='resetFacilityFiltersButton'>&nbsp;</label>
                <button
                    id='resetFacilityFiltersButton'
                    className="form-control bg-secondary text-white"
                    onClick={this.props.resetFilters} >Clear Filters</button>
            </div>
        </div>;
    }

    renderFacilityTypes() {
        return this.props.facilityTypesFiltered.map(facilityType => this.renderFacilityTypeOption(facilityType));
    }

    renderFacilityTypeOption(facilityType) {
        const facilityTypeName = facilityType.get('name');

        return <option key={facilityTypeName} value={facilityTypeName}>{facilityTypeName}</option>;
    }
}

FacilityFilterStateless.propTypes = {
    facilityName: PropTypes.string.isRequired,
    facilityType: PropTypes.string.isRequired,
    facilityTypesFiltered: ImmutabelPropTypes.list.isRequired,
    updateFacilityFilters: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired
};