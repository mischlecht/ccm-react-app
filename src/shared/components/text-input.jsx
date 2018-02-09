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
            className = this.props.className,
            label = this.props.label,
            placeholder = this.props.placeholder;
            
        if(this.props.onChange) {
            return <div>
                <If condition={label != null}>
                    <label htmlFor={id}>{label}</label>
                </If>
                <input
                    type='text'
                    id={id}
                    className={className}
                    value={value}
                    placeholder={placeholder}
                    onChange={this.handleChange} />
            </div>;
        }
        else {
            return <div>
                <If condition={label != null}>
                    <label htmlFor={id}>{label}</label>
                </If>
                <input
                    type='text'
                    id={id}
                    className={className}
                    value={value}
                    placeholder={placeholder}
                    onBlur={this.handleBlur} />
            </div>;
        }
    }

    handleChange(event) {
        const val = event.target.value;
        this.props.onChange(val);
    }

    handleBlur(event) {
        const val = event.target.value;
        this.props.onBlur(val);
    }
};

TextInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,

    id: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string
}