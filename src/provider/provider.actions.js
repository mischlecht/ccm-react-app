import { store } from '../store/store';
import axios from 'axios';
import * as ActionTypes from '../constants/action-types';

export function SearchProviders (searchParams) {
    const zipCode = searchParams.get('zipCode'),
        providerType = searchParams.get('providerType');

    const providerApiUrl = `https://provider-api.ccmnpe.com/search`;
    let searchResults = [],
        requestParams = {
            zip: zipCode,
            providerType
        };

    if(searchParams.get('distance')) {
        requestParams.distance = searchParams.get('distance');
    }

    axios.get(providerApiUrl, {
            params: requestParams
        })
        .then(response => {
            const results = response.data.results;
            if (results) {
                searchResults = results;
            }
            FetchProvidersSuccess(searchResults, providerType);
        });
}

function FetchProvidersSuccess(searchResults, providerType) {
    const action = {
        type: ActionTypes.GOT_PROVIDERS,
        searchResults,
        providerType
    };

    store.dispatch(action);
}

export function ClearSearchResults() {
    const action = {
        type: ActionTypes.CLEAR_PROVIDERS
    }

    store.dispatch(action);
}

/** Filter Doctors */

/** Filter Facilities */
export function FilterFacilities(facilityFilters) {
    const action = {
        type: ActionTypes.FILTER_FACILITIES,
        facilityFilters
    }

    store.dispatch(action);
}

export function ResetFacilityFilter() {
    const action = {
        type: ActionTypes.RESET_FACILITY_FILTERS,
    }

    store.dispatch(action);
}

/** Bootstrap functions */
export function SaveSpecialties(specialties) {
    const action = {
        type: ActionTypes.BOOTSTRAP_SPECIALTIES,
        specialties
    }

    store.dispatch(action);
}

export function SaveFacilityTypes(facilityTypes) {
    const action = {
        type: ActionTypes.BOOTSTRAP_FACILITY_TYPES,
        facilityTypes
    }

    store.dispatch(action);
}