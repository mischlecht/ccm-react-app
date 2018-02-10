import * as Projections from '../../store/projections';
import { ProviderSearchResults, FacilityFilters } from '../../provider/constants/provider.models';
import * as Paths from '../../shared/constants/provider-state-var-paths';

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

    newState = newState.setIn(Paths.providerSearchResults, providerSearchResults)

    // if (providerType === 'doctor') {
    //     // filter out unused specialties type
    // } else if (providerType === 'facility') {
    //     // filter out unused facility types
    //     newState = filterOutFacilityTypes(newState);
    // }

    return newState;
}

// function filterOutFacilityTypes(previous) {
//     const rawFacilityTypes = previous.getIn(['providerState', 'staticData', 'facilityTypes']);

//     return previous;
// }

export function clearProviders (previous, action) {
    return previous.setIn(Paths.providerSearchResults, new ProviderSearchResults());
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
        unfilteredFacilities = previous.getIn(Paths.providersRaw);
    let filteredFacilities = unfilteredFacilities;

    if (facilityName) {
        filteredFacilities = filterFacilitiesByFacilityName(unfilteredFacilities, facilityName);
    }
    if(facilityType) {
        filteredFacilities = filterFacilitiesByFacilityType(unfilteredFacilities, facilityType);
    }

    return previous.setIn(Paths.providersFiltered, filteredFacilities)
                    .setIn(Paths.facilityFilters, facilityFilters);
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
    return unfilteredFacilities.filter((facility) => {
        return facility.get('facilityType') === facilityType;
    });
}

export function resetFacilityFilters(previous, action) {
    const providersRaw = previous.getIn(Paths.providersRaw);

    return previous.setIn(Paths.providersFiltered, providersRaw).setIn(Paths.facilityFilters, new FacilityFilters());
}

/** Got Bootstrap Data */
export function gotSpecialties(previous, action) {
    const { specialties } = action;

    return previous.setIn(Paths.staticSpecialties, specialties);
}

export function gotFacilityTypes(previous, action) {
    const { facilityTypes } = action;

    return previous.setIn(Paths.staticFacilityTypes, facilityTypes);
}