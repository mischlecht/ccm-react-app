import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/provider-page.css';
import * as Models from '../constants/provider.models';

import PageTitle from '../../shared/components/page-title';
import ProviderSearch from './provider-search';
import ProviderResults from './provider-results';
import If from '../../shared/components/if';

export default class ProviderPage extends Component {
    render() {
        // const filterOptions = this.props.providerState.get('filterOptions'),
        const providerSearchResults = this.props.providerState.get('providerSearchResults'),
            providerResults = providerSearchResults.get('providers');
        
        return <div className="container">
            <PageTitle title="Provider Search" />
            <div className="container-fluid row">
                <div id="provider-search-filter-container" className="col-3 divider-right bg-light">
                    <ProviderSearch />
                    {/* Add Filter Component */}
                    <br/>

                    <If condition={providerResults.size > 0}>
                        <p> show filter options </p>
                    </If>
                </div>

                <div className="col-9">
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