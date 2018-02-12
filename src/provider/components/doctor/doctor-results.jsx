import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DoctorDetails from './doctor-details';
import DoctorModal from './doctor-modal';
import Modal from 'react-modal';

export default class DoctorResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorDetails: null,
            modalIsOpen: false
        };

        this.renderDoctorCards = this.renderDoctorCards.bind(this);
        this.openDetailsModal = this.openDetailsModal.bind(this);
        this.closeDetailsModal = this.closeDetailsModal.bind(this);
    }

    render() {
        const doctors = this.props.doctors;

        return <div>
            {this.renderDoctorCards(doctors)}
            <Modal
                isOpen={this.state.modalIsOpen}
                className='modal-details'
                overlayClassName="modal-overlay"
                ariaHideApp={false} >
                <DoctorModal
                    doctor={this.state.doctorDetails}
                    closeModal={this.closeDetailsModal}/>
            </Modal>
        </div>;
    }

    renderDoctorCards(doctors) {
        return doctors.map(doctor => this.renderDoctor(doctor));
    }

    renderDoctor(doctor) {
        const doctorId = doctor.get('id');

        return <DoctorDetails 
            key={doctorId}
            doctor={doctor} 
            onClick={this.openDetailsModal}/>;
    }

    openDetailsModal(doctor) {
        this.setState({ doctorDetails: doctor, modalIsOpen: true });
    }

    closeDetailsModal() {
        this.setState({ doctorDetails: null, modalIsOpen: false });
    }
};

DoctorResults.propTypes = {
    doctors: ImmutablePropTypes.list.isRequired
}