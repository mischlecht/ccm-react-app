import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ProviderSearch from './provider-search';

export default class ProviderPage extends React.Component {
    render() {
        // const filterOptions = this.props.providerState.get('filterOptions'),
        //     providerResults = this.props.providerState.get('providerResults');
        
        return <div className="container bg-secondary text-light">
            <div className="container-fluid text-center">
                <h2>Provider Search</h2>
            </div>

            <hr/>
            
            <div>
                {/* Add Search Component */}
                <ProviderSearch />
                {/* Add Filter Component */}
                {/* Add Results Component */}
            </div>
        </div>
    }
};

ProviderPage.propTypes = {
    providerState: ImmutablePropTypes.contains({
        filterOptions: PropTypes.object.isRequired,
        providerResults: PropTypes.object.isRequired
    }),
}