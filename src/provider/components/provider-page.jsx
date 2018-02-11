import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/provider-page.css';
import * as Models from '../constants/provider.models';

import PageTitle from '../../shared/components/page-title';
import ProviderSearch from './provider-search';
import ProviderResults from './provider-results';
import ProviderFilter from './provider-filter';
import If from '../../shared/components/if';

export default class ProviderPage extends Component {
    render() {
        const providerSearchResults = this.props.providerState.get('providerSearchResults'),
            hasSearchResults = providerSearchResults.get('providersRaw').size > 0,
            searchParams = this.props.providerState.get('searchParams'),
            searchIsValid = searchParams.get('searchIsValid'),
            providerType = searchParams.get('providerType'),
            staticData = this.props.providerState.get('staticData'),
            filters = this.props.providerState.get('filters');
        
        return <div>
            <PageTitle title="Provider Search" />
            <div>
                <div className="search-filter-container">
                    <ProviderSearch 
                        searchParams={searchParams} />
                    <If condition={true}>
                        <ProviderFilter
                            searchIsValid={searchIsValid}
                            hasSearchResults={hasSearchResults}
                            filters={filters}
                            staticData={staticData}
                            providerType={providerType} />
                    </If>
                </div>

                <div id="provider-results-container">
                    <ProviderResults
                        searchIsValid={searchIsValid}
                        providerType={providerType}
                        providerSearchResults={providerSearchResults} />
                </div>

            </div>
        </div>;
    }
};

ProviderPage.propTypes = {
    providerState: ImmutablePropTypes.contains({
        searchParams: ImmutablePropTypes.recordOf(Models.SearchParams),
        providerSearchResults: ImmutablePropTypes.recordOf(Models.ProviderSearchResults),
        filters: ImmutablePropTypes.recordOf(Models.Filters),
        staticData: ImmutablePropTypes.recordOf(Models.StaticData)
    }),
}