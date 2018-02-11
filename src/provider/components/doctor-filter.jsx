import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutabelPropTypes from 'react-immutable-proptypes';

import { DoctorFilters } from '../constants/provider.models';
import TextInput from '../../shared/components/text-input';
import * as ProviderActions from '../provider.actions';

export default class DoctorFilterStateful extends Component {
    constructor(props){
        super(props);

        this.handleDoctorFiltersChange = this.handleDoctorFiltersChange.bind(this);
        this.handleResetFilters = this.handleResetFilters.bind(this);
    }

    render() {
        const doctorFilters = this.props.doctorFilters,
            distance = doctorFilters.get('distance'),
            lastName = doctorFilters.get('lastName'),
            firstName = doctorFilters.get('firstName'),
            specialty = doctorFilters.get('specialty'),
            gender = doctorFilters.get('gender'),
            specialtiesFiltered = this.props.specialtiesFiltered;

        return <DoctorFilterStateless
            lastName={lastName}
            firstName={firstName}
            specialty={specialty}
            gender={gender}
            distance={distance}
            specialtiesFiltered={specialtiesFiltered}
            updateDoctorFilters={this.handleDoctorFiltersChange}
            resetFilters={this.handleResetFilters} />;
    }

    handleDoctorFiltersChange(param, val) {
        const newDoctorFilters = this.props.doctorFilters.set(param, val);

        ProviderActions.FilterProviders(newDoctorFilters);
    }

    handleResetFilters() {
        ProviderActions.ResetFilters();
    }
};

DoctorFilterStateful.propTypes = {
    doctorFilters: ImmutabelPropTypes.recordOf(DoctorFilters),
    specialtiesFiltered: ImmutabelPropTypes.list.isRequired
};

class DoctorFilterStateless extends Component {
    render() {
        const formUnused = "form-control",
            formUsed = "form-control is-valid",
            lastNameClass = this.props.lastName === '' ? formUnused : formUsed,
            firstNameClass = this.props.firstName === '' ? formUnused : formUsed,
            specialtyClass = this.props.specialty === '' ? formUnused : formUsed,
            genderClass = this.props.gender === '' ? formUnused : formUsed;

        return <div>
            <div className="row form-inline">
                <div className="col-6">
                    <TextInput
                        id='lastNameInput'
                        className={lastNameClass}
                        label='Last Name'
                        value={this.props.lastName} 
                        placeholder='Last Name'
                        onChange={val => this.props.updateDoctorFilters('lastName', val)} />
                </div>
        
                <div className="col-6">
                    <TextInput
                        id='firstNameInput'
                        className={firstNameClass}
                        value={this.props.firstName} 
                        label='First Name'
                        placeholder='First Name'
                        onChange={val => this.props.updateDoctorFilters('firstName', val)} />
                </div>
            </div>

            <br/>

            <div className="row form-inline">
                <div className="col-6">
                    <label htmlFor='specialtySelect'>Specialty</label>
                    <select
                        id='specialtySelect'
                        value={this.props.specialty}
                        className={specialtyClass}
                        onChange={(event) => this.props.updateDoctorFilters('specialty', event.target.value)}>

                        <option defaultValue value=''>Select Specialty</option>
                        {this.renderSpecialties()}
                    </select>
                </div>
                <div className="col-2">
                    <label htmlFor='genderSelect'>Gender</label>
                    <select
                        id='genderSelect'
                        value={this.props.gender}
                        className={genderClass}
                        onChange={(event) => this.props.updateDoctorFilters('gender', event.target.value)}>

                        <option defaultValue value=''>Select Gender</option>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                    </select>
                </div>
                <div className="col-2"/>
                <div className="col-2">
                    <label htmlFor='resetDoctorFiltersButton'>&nbsp;</label>
                    <button
                        id='resetDoctorFiltersButton'
                        className="form-control bg-secondary text-white"
                        onClick={this.props.resetFilters} >Clear Filters</button>
                </div>
            </div>
        </div>;
    }

    renderSpecialties() {
        return this.props.specialtiesFiltered.map(specialty => this.renderSpecialtyOption(specialty));
    }

    renderSpecialtyOption(specialty) {
        const specialtyName = specialty.get('name');

        return <option key={specialtyName} value={specialtyName}>{specialtyName}</option>;
    }
}

DoctorFilterStateless.propTypes = {
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    specialtiesFiltered: ImmutabelPropTypes.list.isRequired,
    updateDoctorFilters: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired
};