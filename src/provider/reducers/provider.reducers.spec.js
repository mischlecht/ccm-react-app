//import { expect } from 'chai';
import * as ActionTypes from '../../constants/action-types';
import * as ProviderReducers from './provider.reducers';
import * as Models from '../../constants/models';
import * as Paths from '../../shared/constants/provider-state-var-paths';

describe('ProviderReducers', () => {
    const getInitialState = () => {
        return Models.AppState;
    };

    it('updates the search params', () => {
        let testState = getInitialState();

        const testZipCode = '53188',
            testProviderType = '',
            testDistance = 5,
            searchParams = {
                zipCode: '53149',
                zipCodeIsValid: true,
                providerType: 'doctor',
                providerTypeIsValid: true,
                distance: 5,
                distanceIsIncluded: true
            };
        
        testState = ProviderReducers.setSearchParams(testState, searchParams);

        expect(testState.getIn(Paths.searchParams)).toEqual(searchParams);
    });
});
