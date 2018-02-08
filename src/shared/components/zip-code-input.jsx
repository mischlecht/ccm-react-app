import React, { Component } from 'react';
import PropTypes from 'prop-types';

import If from '../../shared/components/if';

export default class ZipCodeInput extends Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        let value = this.props.value,
            id = this.props.id,
            label = this.props.label,
            placeholder = this.props.placeholder,
            className = this.props.isValid ? "form-control is-valid" : "form-control";
            
        return <div>
            <If condition={label != null}>
                <label htmlFor={id}>{label}</label>
            </If>
            <input
                type='text'
                id={id}
                className={className}
                value={value}
                maxLength="5"
                placeholder={placeholder}
                onChange={this.handleChange} />
        </div>;
    }

    handleChange(event) {
        const val = event.target.value;
        this.props.onChange(val);
    }
};

ZipCodeInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,

    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string
}