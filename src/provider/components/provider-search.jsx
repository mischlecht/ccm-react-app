import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import ZipCodeInput from '../../shared/components/zip-code-input';
import * as ProviderActions from '../provider.actions';

export default class ProviderSearchStateful extends Component {
    constructor(props){
        super(props);

        this.state = {
            searchParams: Immutable.fromJS({
                zipCode: '',
                providerType: '',
            }),
            zipCodeIsValid: false,
            providerTypeIsValid: false,
            searchButtonEnabled: false
        };

        this.updateZipCodeParam = this.updateZipCodeParam.bind(this);
        this.updateProviderTypeParam = this.updateProviderTypeParam.bind(this);
        this.searchOrClearResults = this.searchOrClearResults.bind(this);
    }

    render() {
        const searchParams = this.state.searchParams,
            zipCode = searchParams.get('zipCode'),
            providerType = searchParams.get('providerType'),
            zipCodeIsValid = this.state.zipCodeIsValid,
            providerTypeIsValid = this.state.providerTypeIsValid;

        return <ProviderSearchStateless
            zipCode={zipCode}
            providerType={providerType}
            zipCodeIsValid={zipCodeIsValid}
            providerTypeIsValid={providerTypeIsValid}
            onZipCodeEdit={val => this.updateZipCodeParam(val)}
            onProviderTypeChange={val => this.updateProviderTypeParam(val)}  />
    }

    updateZipCodeParam(zipCode) {
        const strippedZipCode = zipCode.replace(/\D/g,''),
            newSearchParams = this.state.searchParams.set('zipCode', strippedZipCode),
            zipCodeIsValid = strippedZipCode.length === 5 ? true : false;

        this.setState({ 
            searchParams: newSearchParams,
            zipCodeIsValid: zipCodeIsValid
        });

        this.searchOrClearResults(zipCodeIsValid, this.state.providerTypeIsValid, newSearchParams);
    }

    updateProviderTypeParam(providerType) {
        const newSearchParams = this.state.searchParams.set('providerType', providerType),
            providerTypeIsValid = ['doctor', 'facility'].includes(providerType);

        this.setState({ 
            searchParams: newSearchParams,
            providerTypeIsValid: providerTypeIsValid
        });

        this.searchOrClearResults(this.state.zipCodeIsValid, providerTypeIsValid, newSearchParams);
    }

    searchOrClearResults(zipCodeIsValid, providerTypeIsValid, searchParams) {
        if(zipCodeIsValid && providerTypeIsValid) {
            ProviderActions.SearchProviders(searchParams);
        } else {
            ProviderActions.ClearSearchResults();
        }
    }
};

ProviderSearchStateful.propTypes = {
};

export class ProviderSearchStateless extends Component {
    render() {
        const selectClassName = this.props.providerTypeIsValid ? "form-control is-valid" : "form-control"

        return <div className="row">
            <div className="col-6">
                <ZipCodeInput
                    id="zipCode"
                    placeholder="Zip Code"
                    className="form-control"
                    maxlength="5"
                    isValid={this.props.zipCodeIsValid}
                    value={this.props.zipCode}
                    onChange={this.props.onZipCodeEdit} />
            </div>

            <div className="col-6">
                <select
                    value={this.props.providerType}
                    className={selectClassName}
                    id="providerType"
                    onChange={(event) => this.props.onProviderTypeChange(event.target.value)}>

                    <option defaultValue>Select Provider Type</option>
                    <option value="doctor">Doctor</option>
                    <option value="facility">Facility</option>
                </select>
            </div>
        </div>;
    }
}

ProviderSearchStateless.propTypes = {
  zipCode: PropTypes.string.isRequired,
  providerType: PropTypes.string.isRequired,
  zipCodeIsValid: PropTypes.bool.isRequired,
  providerTypeIsValid: PropTypes.bool.isRequired,
  onZipCodeEdit: PropTypes.func.isRequired,
  onProviderTypeChange: PropTypes.func.isRequired
};