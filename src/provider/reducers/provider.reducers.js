import * as Projections from '../../store/projections';
import { ProviderSearchResults } from '../../provider/constants/provider.models';

export function setProviderResults (previous, action) {
    const { searchResults, providerType } = action;

    let newState = previous,
        projectedProviderResults = [];
    
    if (providerType === 'doctor') {
        projectedProviderResults = Projections.projectDoctorResultsToObject(searchResults);
    } else {
        projectedProviderResults = Projections.projectFacilityResultsToObjects(searchResults);
    }   

    const providerSearchResults = new ProviderSearchResults({
        providerType,
        providers: projectedProviderResults
    });

    newState = newState.setIn(['providerState', 'providerSearchResults'], providerSearchResults)

    return newState;
}

export function clearProviders (previous, action) {
    return previous.setIn(['providerState', 'providerSearchResults'], new ProviderSearchResults());
}