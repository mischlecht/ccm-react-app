import { store } from '../store/store';
import * as ActionTypes from '../constants/action-types';

export function SearchProviders (searchParams) {
    const zipCode = searchParams.get('zipCode'),
        providerType = searchParams.get('providerType');

    const providerApiUrl = `https://provider-api.ccmnpe.com/search?zip=${zipCode}&providerType=${providerType}`;
    let searchResults = [];

    const xhr = new XMLHttpRequest();
    xhr.open('GET', providerApiUrl, true);
    xhr.onload = function(){
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const results = JSON.parse(xhr.response).results;
                if (results) {
                    searchResults = results;
                }
                FetchProvidersSuccess(searchResults, providerType);
            }
        } 
    };
    xhr.send();
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