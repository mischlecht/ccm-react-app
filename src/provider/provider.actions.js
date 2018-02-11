import { store } from '../store/store';
import axios from 'axios';
import * as ActionTypes from '../constants/action-types';

/** Search + Filter Actions */
export function SearchProviders (searchParams) {
    store.dispatch({
        type: ActionTypes.SEARCHING_FOR_PROVIDERS
    });

    const zipCode = searchParams.get('zipCode'),
        providerType = searchParams.get('providerType'),
        distance = searchParams.get('distance');

    const providerApiUrl = `https://provider-api.ccmnpe.com/search`;
    let searchResults = [],
        requestParams = {
            zip: zipCode,
            providerType,
            distance
        };

    axios.get(providerApiUrl, {
            params: requestParams
        })
        .then(response => {
            const results = response.data.results;
            if (results) {
                searchResults = results;
            }
            FetchProvidersSuccess(searchParams, searchResults);
        });
}

function FetchProvidersSuccess(searchParams, searchResults) {
    const action = {
        type: ActionTypes.GOT_PROVIDERS,
        searchParams,
        searchResults
    };

    store.dispatch(action);
}

export function ClearSearchResults(searchParams) {
    const action = {
        type: ActionTypes.CLEAR_PROVIDERS,
        searchParams
    }

    store.dispatch(action);
}

export function FilterProviders(providerFilters) {
    const action = {
        type: ActionTypes.FILTER_PROVIDERS,
        providerFilters
    }

    store.dispatch(action);
}

export function ResetFilters() {
    const action = {
        type: ActionTypes.RESET_FILTERS,
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