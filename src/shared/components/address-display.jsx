import React, { Component } from 'react';
import PropTypes from 'prop-types';

import If from './if';
import * as StringUtils from '../utils/string.utils';

export default class AddressDisplay extends Component {
    render() {
        const className = this.props.className,
            addressLine1 = this.props.addressLine1,
            addressLine2 = this.props.addressLine2,
            city = this.props.city,
            state = this.props.state,
            zip = this.props.zip;
        
        return <p className={className}>
                {addressLine1}
                <br/>
                <If condition={StringUtils.isNotNullOrEmpty(addressLine2)}>
                    {addressLine2}
                    <br/>
                </If>
                {city}, {state} {zip}
            </p>;
    }
};

AddressDisplay.propTypes = {
    className: PropTypes.string,
    addressLine1: PropTypes.string.isRequired,
    addressLine2: PropTypes.string,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired
}