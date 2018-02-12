import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Buddy from '../images/buddy.jpg';

export default class EasterEgg extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: true
        };

        this.hideModal = this.hideModal.bind(this);
    }
    componentDidMount() {
        setTimeout(this.hideModal, 3000);
    }

    render() {
        return <Modal
            isOpen={this.state.modalIsOpen}
            className="easter-egg-modal-details"
            overlayClassName="easter-egg-modal-overlay"
            ariaHideApp={false} >
            <img src={Buddy} className="easter-egg-img" alt="Buddy"/>
        </Modal>
    }

    hideModal() {
        this.setState({ modalIsOpen: false })
        this.props.hideEasterEgg()
    }
}

EasterEgg.propTypes = {
    hideEasterEgg: PropTypes.func.isRequired
}