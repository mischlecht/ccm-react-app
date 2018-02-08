import React, { Component } from 'react';
import PropTypes from 'prop-types';

import If from '../../shared/components/if';

export default class TextInput extends Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        let value = this.props.value,
            id = this.props.id,
            label = this.props.label,
            placeholder = this.props.placeholder;
            
        return <div>
            <If condition={label != null}>
                <label htmlFor={id}>{label}</label>
            </If>
            <input
                type='text'
                id={id}
                className="form-control"
                value={value}
                placeholder={placeholder}
                onChange={this.handleChange} />
        </div>;
    }

    handleChange(event) {
        const val = event.target.value;
        this.props.onChange(val);
    }
};

TextInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,

    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string
}