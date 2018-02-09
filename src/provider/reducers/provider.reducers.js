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
        providersRaw: projectedProviderResults,
        providersFiltered: projectedProviderResults
    });

    newState = newState.setIn(['providerState', 'providerSearchResults'], providerSearchResults)

    return newState;
}

export function clearProviders (previous, action) {
    return previous.setIn(['providerState', 'providerSearchResults'], new ProviderSearchResults());
}

/** Doctor Filter Reducers **/

// Doctor Distance - Number Drop Down
// ---- Distance has to be included in the API request
// Doctor First Name - Text Input
// Doctor Last Name - Text Input
// Doctor Specialty - Text Input
// Doctor Gender - Radio Buttons

/** Facility Filter Reducers **/

export function filterFacilities(previous, action) {
    const { facilityFilters } = action,
        facilityName = facilityFilters.get('facilityName'),
        facilityType = facilityFilters.get('facilityType'),
        unfilteredFacilities = previous.getIn(['providerState', 'providerSearchResults', 'providersRaw']);
    let filteredFacilities = unfilteredFacilities;

    filteredFacilities = filterFacilitiesByFacilityName(unfilteredFacilities, facilityName);
    // filteredFacilities = filterFacilitiesByFacilityType(unfilteredFacilities);

    return previous.setIn(['providerState', 'providerSearchResults', 'providersFiltered'], filteredFacilities);
}

// functional filter function
function filterFacilitiesByFacilityName(unfilteredFacilities, searchName) {
    return unfilteredFacilities.filter((facility) => {
        const facilityNameLower = facility.get('facilityName').toLowerCase(),
            searchNameLower = searchName.toLowerCase();

        return facilityNameLower.search(searchNameLower) !== -1;
    });
}
function filterFacilitiesByFacilityType(unfilteredFacilities, facilityType) {
    return unfilteredFacilities.filter(facility => facility.get('facilityType').equals(facilityType));
}