import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/provider-page.css';
import * as Models from '../constants/provider.models';

import PageTitle from '../../shared/components/page-title';
import ProviderSearch from './provider-search';
import ProviderResults from './provider-results';
import ProviderFilter from './provider-filter';

export default class ProviderPage extends Component {
    render() {
        // const filterOptions = this.props.providerState.get('filterOptions'),
        const providerSearchResults = this.props.providerState.get('providerSearchResults'),
            providerType = providerSearchResults.get('providerType'),
            filterOptions = this.props.providerState.get('filterOptions');
        
        return <div>
            <PageTitle title="Provider Search" />
            <div>
                <div id="search-filter-container">
                    <ProviderSearch />
                    {/* Add Filter Component */}
                    <ProviderFilter
                        providerType={providerType}
                        filterOptions={filterOptions} />
                </div>

                <div id="provider-results-container">
                    {/* Add Results Component */}
                    <ProviderResults
                        providerSearchResults={providerSearchResults} />
                </div>

            </div>
        </div>;
    }
};

ProviderPage.propTypes = {
    providerState: ImmutablePropTypes.contains({
        filterOptions: ImmutablePropTypes.recordOf(Models.FilterOptions),
        providerSearchResults: ImmutablePropTypes.recordOf(Models.ProviderSearchResults)
    }),
}