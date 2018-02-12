import { Component } from 'react';
import PropTypes from 'prop-types';

export default class If extends Component {
    render() {
        if(this.props.condition) {
            return this.props.children;
        }

        return null;
    }
};

If.propTypes = {
    condition: PropTypes.bool.isRequired,
}