import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PageTitle extends Component {
    render() {
        return <div>
            <br/>
            <div className="container-fluid text-center">
                <h1>{this.props.title}</h1>
            </div>
            <br/>
            <hr/>
            <br/>
        </div>;
    }
}

PageTitle.propTypes = {
    title: PropTypes.string.isRequired
}
