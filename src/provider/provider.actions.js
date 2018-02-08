import { store } from '../store/store';
import * as ActionTypes from '../constants/action-types';

export function SearchProviders (searchParams) {
    const zipCode = searchParams.get('zipCode'),
        providerType = searchParams.get('providerType');

    const providerApiUrl = `https://provider-api.ccmnpe.com/search?zip=${zipCode}&providerType=${providerType}`;
    let providerResults = [];

    const xhr = new XMLHttpRequest();
    xhr.open('GET', providerApiUrl, true);
    xhr.onload = function(){
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const results = JSON.parse(xhr.response).results;
                if (results) {
                    providerResults = results;
                }
                FetchProvidersSuccess(providerResults);
            }
        } 
    };
    xhr.send();
}

function FetchProvidersSuccess(providerResults) {
    const action = {
        type: ActionTypes.GOT_PROVIDERS,
        providerResults
    };

    store.dispatch(action);
}