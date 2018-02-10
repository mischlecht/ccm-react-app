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
            staticData = this.props.providerState.get('staticData'),
            providerType = providerSearchResults.get('providerType'),
            filters = this.props.providerState.get('filters'),
            providerTypeSelected = ['doctor', 'facility'].includes(providerType);
        
        return <div>
            <PageTitle title="Provider Search" />
            <div>
                <div className={providerTypeSelected ? "search-filter-container" : "search-container"}>
                    <ProviderSearch />
                    {/* Add Filter Component */}
                    <ProviderFilter
                        filters={filters}
                        staticData={staticData}
                        providerType={providerType} />
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
        filters: ImmutablePropTypes.recordOf(Models.Filters),
        providerSearchResults: ImmutablePropTypes.recordOf(Models.ProviderSearchResults),
        staticData: ImmutablePropTypes.recordOf(Models.StaticData)
    }),
}