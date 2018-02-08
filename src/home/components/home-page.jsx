import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import EditName from './edit-name.jsx';

export default class HomePage extends Component {
    render() {
        const myName = this.props.homeState.get('myName');
        const firstName = myName.get('firstName');
        const lastName = myName.get('lastName');
        
        return <div className="container">
            <div className="container-fluid text-center">
                <h2>CCM React App</h2>
            </div>
            
            <hr/>
            
            <div className="row">
                <div className="col-3">
                    <p> 
                        My Name in the Store:
                    </p>
                    <p>
                        <h4>{firstName} {lastName}</h4>
                    </p>
                </div>
                <div className="col-6">
                    <EditName myName={myName} />
                </div>
            </div>
        </div>;
    }
};

HomePage.propTypes = {
    homeState: ImmutablePropTypes.contains({
        myName: PropTypes.object.isRequired,
    }),
}