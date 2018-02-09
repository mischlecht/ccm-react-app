import * as ActionTypes from '../constants/action-types';
import { createStore } from 'redux';
import * as Models from '../constants/models';
import * as HomeReducers from '../home/reducers/home.reducers';
import * as ProviderReducers from '../provider/reducers/provider.reducers';

export let appInitialState = Models.AppState;

function app(previous = appInitialState, action) {
    switch (action.type) {
        /** Home Action **/
        case ActionTypes.UPDATE_NAME:
            return HomeReducers.updateName(previous, action);

        /** Provider Actions **/
        case ActionTypes.GOT_PROVIDERS:
            return ProviderReducers.setProviderResults(previous, action);
        case ActionTypes.CLEAR_PROVIDERS:
            return ProviderReducers.clearProviders(previous, action);
        case ActionTypes.FILTER_FACILITIES:
            return ProviderReducers.filterFacilities(previous, action);

        /** Default **/
        default:
            return previous;
  }
}

export const store = createStore(app, window.devToolsExtension && window.devToolsExtension());