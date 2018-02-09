import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutabelPropTypes from 'react-immutable-proptypes';

import { FacilityFilters } from '../constants/provider.models';
import TextInput from '../../shared/components/text-input';
import * as ProviderActions from '../provider.actions';

export default class FacilityFilterStateful extends Component {
    constructor(props){
        super(props);

        this.state = {
            facilityFilters: new FacilityFilters()
        };

        this.handleFacilityFiltersChange = this.handleFacilityFiltersChange.bind(this);
        this.filterFacilities = this.filterFacilities.bind(this);
    }

    render() {
        const facilityFilters = this.state.facilityFilters,
            distance = facilityFilters.get('distance'),
            facilityName = facilityFilters.get('facilityName'),
            facilityType = facilityFilters.get('facilityType'),
            facilityTypes = this.props.facilityTypes;

        return <FacilityFilterStateless
            distance={distance}
            facilityName={facilityName}
            facilityType={facilityType}
            facilityTypes={facilityTypes}
            updateFacilityFilters={this.handleFacilityFiltersChange}
            filterFacilities={this.filterFacilities} />;
    }

    handleFacilityFiltersChange(param, val) {
        const newFacilityFilters = this.state.facilityFilters.set(param, val);

        this.setState({ 
            facilityFilters: newFacilityFilters
        }, this.filterFacilities(newFacilityFilters));
    }

    filterFacilities(facilityFilters) {
        // Call ProviderActions.filterfacilities
        ProviderActions.FilterFacilities(facilityFilters);
    }
};

FacilityFilterStateful.propTypes = {
    facilityFilters: ImmutabelPropTypes.recordOf(FacilityFilters).isRequired,
    facilityTypes: ImmutabelPropTypes.list.isRequired
};

class FacilityFilterStateless extends Component {
    render() {
        const facilityNameClassName = this.props.facilityName === '' ? "form-control" : "form-control is-valid",
            selectClassName = this.props.facilityType === null ? "form-control" : "form-control is-valid"

        return <div className="row">
            <div className="col">
                <TextInput
                    className={facilityNameClassName}
                    value={this.props.facilityName} 
                    placeholder={"Facility Name"}
                    onChange={val => this.props.updateFacilityFilters('facilityName', val)}
                    onBlur={this.props.filterFacilities}/>
            </div>
           
            <div className="col">
                <select
                    value={this.props.facilityType}
                    className={selectClassName}
                    text="Select Facility Type"
                    id="facilityType"
                    onChange={(event) => this.props.updateFacilityFilters('facilityType', event.target.value)}>

                    <option defaultValue value={null}>Select Facility Type</option>
                    {this.renderFacilityTypes()}
                </select>
            </div>

            <div className="col">
                <input type="text" className="form-control" placeholder="Specialty" />
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
    distance: PropTypes.number.isRequired,
    facilityName: PropTypes.string.isRequired,
    facilityType: PropTypes.string.isRequired,
    facilityTypes: ImmutabelPropTypes.list.isRequired,
    updateFacilityFilters: PropTypes.func.isRequired,
    filterFacilities: PropTypes.func.isRequired
};