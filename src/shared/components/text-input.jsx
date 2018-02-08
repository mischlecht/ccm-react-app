import React from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        let value = this.props.value,
            id = this.props.id,
            label = this.props.label,
            placeholder = this.props.placeholder;
            
            
        if (label != null) {
            return <div>
                <label for={id}>{label}</label>
                <input
                    type='text'
                    id={id}
                    class="form-control"
                    value={value}
                    placeholder={placeholder}
                    onChange={this.handleChange} />
            </div>;
        } else {
            return <div>
                <input
                    type='text'
                    value={value}
                    onChange={this.handleChange} />
            </div>;
        }
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