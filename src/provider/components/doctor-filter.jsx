import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutabelPropTypes from 'react-immutable-proptypes';

import { DoctorFilters } from '../constants/provider.models';
// import * as ProviderActions from '../provider.actions';

export default class DoctorFilterStateful extends Component {
    constructor(props){
        super(props);

        this.state = {
            doctorFilters: new DoctorFilters()
        };

        this.updateDoctorFilters = this.updateDoctorFilters.bind(this);
    }

    render() {
        const doctorFilters = this.state.doctorFilters,
            distance = doctorFilters.get('distance'),
            firstName = doctorFilters.get('firstName'),
            lastName = doctorFilters.get('lastName'),
            specialty = doctorFilters.get('specialty'),
            gender = doctorFilters.get('gender');

        return <DoctorFilterStateless
            distance={distance}
            firstName={firstName}
            lastName={lastName}
            specialty={specialty}
            gender={gender}
            updateDoctorFilters={this.updateDoctorFilters} />;
    }

    updateDoctorFilters(param, val) {
        const newDoctorFilters = this.state.doctorFilters.set(param, val);

        this.setState({ 
            doctorFilters: newDoctorFilters
        });

        // call ProviderActions.ApplyDoctorFilters
    }
};

DoctorFilterStateful.propTypes = {
    doctorFilters: ImmutabelPropTypes.recordOf(DoctorFilters),
    specialties: ImmutabelPropTypes.list.isRequired
};

class DoctorFilterStateless extends Component {
    render() {
        return <div class="row">
            <div class="col">
                <input type="text" class="form-control" placeholder="First name" />
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Last name" />
            </div>
        </div>;
    }
}

DoctorFilterStateless.propTypes = {
    distance: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    updateFacilityFilters: PropTypes.func.isRequired
};