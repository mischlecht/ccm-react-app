import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class If extends Component {
    render() {
        if(this.props.condition) {
            return this.props.children;
        }

        return <span/>;
    }
};

If.propTypes = {
    condition: PropTypes.bool.isRequired,
}