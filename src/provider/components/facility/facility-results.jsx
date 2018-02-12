import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FacilityDetails from './facility-details';
import FacilityModal from './facility-modal';
import Modal from 'react-modal';

export default class FacilityResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facilityDetails: null,
            modalIsOpen: false
        };

        this.renderDoctorCards = this.renderFacilityCards.bind(this);
        this.openDetailsModal = this.openDetailsModal.bind(this);
        this.closeDetailsModal = this.closeDetailsModal.bind(this);
    }

    render() {
        const facilities = this.props.facilities;

        return <div>
            {this.renderFacilityCards(facilities)}
            <Modal
                isOpen={this.state.modalIsOpen}
                className='modal-details'
                overlayClassName="modal-overlay"
                ariaHideApp={false} >
                <FacilityModal
                    facility={this.state.facilityDetails}
                    closeModal={this.closeDetailsModal}/>
            </Modal>
        </div>;
    }

    renderFacilityCards(doctors) {
        return doctors.map(doctor => this.renderFacility(doctor));
    }

    renderFacility(facility) {
        const facilityId = facility.get('id');

        return <FacilityDetails 
            key={facilityId}
            facility={facility} 
            onClick={this.openDetailsModal}/>;
    }

    openDetailsModal(facility) {
        this.setState({ facilityDetails: facility, modalIsOpen: true });
    }

    closeDetailsModal() {
        this.setState({ facilityDetails: null, modalIsOpen: false });
    }
};

FacilityResults.propTypes = {
    facilities: ImmutablePropTypes.list.isRequired
}