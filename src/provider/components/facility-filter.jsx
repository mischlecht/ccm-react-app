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
        this.filterFacilities = this.filterFacilities.bind(this);
        this.handleResetFilters = this.handleResetFilters.bind(this);
    }

    render() {
        const facilityFilters = this.props.facilityFilters,
            facilityName = facilityFilters.get('facilityName'),
            facilityType = facilityFilters.get('facilityType'),
            facilityTypes = this.props.facilityTypes;

        return <FacilityFilterStateless
            facilityName={facilityName}
            facilityType={facilityType}
            facilityTypes={facilityTypes}
            updateFacilityFilters={this.handleFacilityFiltersChange}
            resetFilters={this.handleResetFilters} />;
    }

    handleFacilityFiltersChange(param, val) {
        const newFacilityFilters = this.props.facilityFilters.set(param, val);

        this.filterFacilities(newFacilityFilters);
    }

    filterFacilities(facilityFilters) {
        ProviderActions.FilterFacilities(facilityFilters);
    }

    handleResetFilters() {
        ProviderActions.ResetFacilityFilter();
    }
};

FacilityFilterStateful.propTypes = {
    facilityFilters: ImmutabelPropTypes.recordOf(FacilityFilters).isRequired,
    facilityTypes: ImmutabelPropTypes.list.isRequired
};

class FacilityFilterStateless extends Component {
    render() {
        const facilityNameClassName = this.props.facilityName === '' ? "form-control" : "form-control is-valid",
            selectClassName = this.props.facilityType === '' ? "form-control" : "form-control is-valid"

        return <div className="row">
            <div className="col-5">
                <TextInput
                    className={facilityNameClassName}
                    value={this.props.facilityName} 
                    placeholder={"Facility Name"}
                    onChange={val => this.props.updateFacilityFilters('facilityName', val)} />
            </div>
           
            <div className="col-5">
                <select
                    value={this.props.facilityType}
                    className={selectClassName}
                    text="Select Facility Type"
                    id="facilityType"
                    onChange={(event) => this.props.updateFacilityFilters('facilityType', event.target.value)}>

                    <option defaultValue value=''>Select Facility Type</option>
                    {this.renderFacilityTypes()}
                </select>
            </div>

            <div className="col-2">
                <button
                    className="form-control"
                    onClick={this.props.resetFilters} >Reset</button>
            </div>
        </div>;
    }

    renderFacilityTypes() {
        return this.props.facilityTypes.map(facilityType => this.renderFacilityTypeOption(facilityType));
    }

    renderFacilityTypeOption(facilityType) {
        const facilityTypeName = facilityType.get('name');

        return <option key={facilityTypeName} value={facilityTypeName}>{facilityTypeName}</option>;
    }
}

FacilityFilterStateless.propTypes = {
    facilityName: PropTypes.string.isRequired,
    facilityType: PropTypes.string.isRequired,
    facilityTypes: ImmutabelPropTypes.list.isRequired,
    updateFacilityFilters: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired
};