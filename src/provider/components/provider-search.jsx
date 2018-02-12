import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import ZipCodeInput from '../../shared/components/zip-code-input';
import { SearchParams } from '../constants/provider.models';
import * as ProviderActions from '../provider.actions';

export default class ProviderSearch extends Component {
    constructor(props){
        super(props);

        this.updateZipCodeParam = this.updateZipCodeParam.bind(this);
        this.updateProviderTypeParam = this.updateProviderTypeParam.bind(this);
        this.handleSearchClear = this.handleSearchClear.bind(this);
        this.handleSearchParamsChange = this.handleSearchParamsChange.bind(this);
    }

    render() {
        const inputUsed = "form-control is-valid",
            inputUnused = "form-control",
            searchParams = this.props.searchParams,
            zipCode = searchParams.get('zipCode'),
            zipCodeIsValid = searchParams.get('zipCodeIsValid'),
            providerType = searchParams.get('providerType'),
            providerTypeIsValid = searchParams.get('providerTypeIsValid'),
            providerTypeClassName = providerTypeIsValid ? inputUsed : inputUnused,
            distance = searchParams.get('distance'),
            distanceIsIncluded = searchParams.get('distanceIsIncluded'),
            distanceClass = distanceIsIncluded ? inputUsed : inputUnused;

        return <div>
            <div className="row form-inline">
                <div className="col-4">
                <label htmlFor='zipCodeInput'>Zip Code *</label>
                    <ZipCodeInput
                        id="zipCodeInput"
                        placeholder="Zip Code"
                        maxlength="5"
                        isValid={zipCodeIsValid}
                        value={zipCode}
                        onChange={this.updateZipCodeParam} />
                </div>

                <div className="col-4">
                    <label htmlFor='providerTypeSelect'>Provider Type *</label>
                    <select
                        value={providerType}
                        className={providerTypeClassName}
                        id="providerTypeSelect"
                        onChange={(event) => this.updateProviderTypeParam(event.target.value)}>

                        <option defaultValue>Select Provider Type</option>
                        <option value="doctor">Doctor</option>
                        <option value="facility">Facility</option>
                    </select>
                </div>

                <div className="col-2">
                    <label htmlFor='radiusSelect'>Search Radius</label>
                    <select
                        id={'radiusSelect'}
                        value={distance}
                        className={distanceClass}
                        onChange={(event) => this.updateDistanceParam(event.target.value)}>

                        <option value={0}>Select Radius</option>
                        <option value={5}>0-5 mi.</option>
                        <option value={10}>5-10 mi.</option>
                        <option value={25}>10-25 mi.</option>
                        <option value={50}>25-50 mi.</option>
                        <option value={100}>50-100 mi.</option>
                    </select>
                </div>

                <div className="col-2">
                <label htmlFor="clearSearchButton">&nbsp;</label>
                    <button 
                        id="clearSearchButton"
                        className="form-control bg-secondary text-white"
                        onClick={this.handleSearchClear}>Clear Search</button>
                </div>
            </div>
        </div>;
    }

    updateZipCodeParam(zipCode) {
        const strippedZipCode = zipCode.replace(/\D/g,''),
            zipCodeIsValid = strippedZipCode.length === 5 ? true : false,
            newSearchParams = this.props.searchParams.set('zipCode', strippedZipCode).set('zipCodeIsValid', zipCodeIsValid);

        this.handleSearchParamsChange(newSearchParams);
    }

    updateProviderTypeParam(providerType) {
        const providerTypeIsValid = ['doctor', 'facility'].includes(providerType),
            newSearchParams = this.props.searchParams.set('providerType', providerType).set('providerTypeIsValid', providerTypeIsValid);

        this.handleSearchParamsChange(newSearchParams);
    }

    updateDistanceParam(distance) {
        const distanceIsIncluded = distance !== '0',
            newSearchParams = this.props.searchParams.set('distance', distance).set('distanceIsIncluded', distanceIsIncluded);

        this.handleSearchParamsChange(newSearchParams);
    }

    handleSearchClear() {
        this.handleSearchParamsChange(new SearchParams());
    }

    handleSearchParamsChange(searchParams) {
        const zipCodeIsValid = searchParams.get('zipCodeIsValid'),
            providerTypeIsValid = searchParams.get('providerTypeIsValid');

        if(zipCodeIsValid && providerTypeIsValid) {
            ProviderActions.SearchProviders(searchParams.set('searchIsValid', true));
        } else {
            ProviderActions.ClearSearchResults(searchParams.set('searchIsValid', false));
        }
    }
};

ProviderSearch.propTypes = {
    searchParams: ImmutablePropTypes.recordOf(SearchParams)
};