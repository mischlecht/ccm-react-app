import * as Projections from '../../store/projections';
import Immutable from 'immutable';
import {
    ProviderSearchResults,
    Filters, 
    DoctorFilters,
    FacilityFilters } from '../../provider/constants/provider.models';
import * as Paths from '../../shared/constants/provider-state-var-paths';
import * as ListUtils from '../../shared/utils/list.utils';
import * as ProviderUtils from '../../shared/utils/provider.utils';

export function searchingForProviders(previous, action) {
    let newState = previous;
    newState = resetProviderSearchResults(newState);
    newState = setLoadingState(newState, true);

    return newState;
}

export function setProviderResults (previous, action) {
    const {
        searchParams,
        searchResults,
        metaData
    } = action;

    let newState = previous;

    // update search params in store
    newState = updateSearchParams(newState, searchParams);
    
    // set search results in store
    newState = projectProviderResults(newState, searchResults);

    // project metadata to their providerResults
    newState = projectMetaDataToProviders(newState, metaData);

    // Since this is a fresh search with new provider results, reset the filters
    newState = resetAllFilters(newState);

    newState = setLoadingState(newState, false);
    
    return newState;
}

function updateSearchParams (previous, newSearchParams) {
    return previous.setIn(Paths.searchParams, newSearchParams);
}

function projectProviderResults(previous, searchResults) {
    let newState = previous;
    const providerType = getProviderType(newState);
    
    if (providerType === 'doctor') {
        newState = projectDoctorResults(newState, searchResults);
    } else {
        newState = projectFacilityResults(newState, searchResults);
    }   

    return newState;
}

function projectDoctorResults(previous, doctorSearchResults) {
    let newState = previous;

    const projectedProviderResults = Projections.projectDoctorResults(doctorSearchResults),
        providerSearchResults = new ProviderSearchResults({
            providerType: getProviderType(newState),
            providersRaw: projectedProviderResults,
            providersFiltered: projectedProviderResults
        });

    newState = setProviderSearchResults(newState, providerSearchResults);
    // filter out unused specialties
    newState = filterUnusedSpecialties(newState);

    return newState;
}

function projectFacilityResults(previous, facilitySearchResults) {
    let newState = previous;

    const projectedProviderResults = Projections.projectFacilityResults(facilitySearchResults),
        providerSearchResults = new ProviderSearchResults({
            providerType: getProviderType(newState),
            providersRaw: projectedProviderResults,
            providersFiltered: projectedProviderResults
        });

    newState = setProviderSearchResults(newState, providerSearchResults);
    // filter out unused facility types
    newState = filterUnusedFacilityTypes(newState);

    return newState;
}

function projectMetaDataToProviders(previous, metaData) {
    let newState = previous;

    const providers = getProvidersRaw(newState),
        providersWithMetaData = Projections.projectMetaDataToProviders(metaData, providers);

    newState = setProvidersRaw(newState, providersWithMetaData);
    newState = setProvidersFiltered(newState, providersWithMetaData);

    return newState;
}

export function applyFilters(previous, action) {
    const { providerFilters } = action;
    let newState = previous;

    if (getProviderType(newState) === 'doctor') {
        newState = applyDoctorFilters(previous, providerFilters);
    } else {
        newState = applyFacilityFilters(previous, providerFilters);
    }
    return newState;
}


/*******************************/
/** FUNCTIONAL GETTER REDUCERS */
/*******************************/
function getProviderType(previous) {
    const searchParams = previous.getIn(Paths.searchParams)
    return searchParams.get('providerType');
}

function getProvidersRaw(previous) {
    return previous.getIn(Paths.providersRaw);
}

/*******************************/
/** FUNCTIONAL SETTER REDUCERS */
/*******************************/
function setProvidersRaw(previous, providersRaw) {
    let newState = previous;
    return newState.setIn(Paths.providersRaw, providersRaw);
}

function setProvidersFiltered(previous, providersFiltered) {
    let newState = previous;
    return newState.setIn(Paths.providersFiltered, providersFiltered);
}

function setProviderSearchResults(previous, providerSearchResults) {
    let newState = previous;
    return newState.setIn(Paths.providerSearchResults, providerSearchResults);
}

function setDoctorFilters(previous, doctorFilters) {
    let newState = previous;
    return newState.setIn(Paths.doctorFilters, doctorFilters);
}

function setFacilityFilters(previous, facilityFilters) {
    let newState = previous;
    return newState.setIn(Paths.facilityFilters, facilityFilters);
}

function setFilteredFacilities(previous, filteredFacilities) {
    let newState = previous;
    return newState.setIn(Paths.providersFiltered, filteredFacilities);
}

function setSpecialties(previous, specialties) {
    let newState = previous;
    return newState.setIn(Paths.specialties, specialties);
}

function setSpecialtiesFiltered(previous, specialtiesFiltered) {
    let newState = previous;
    return newState.setIn(Paths.specialtiesFiltered, specialtiesFiltered);
}

function setFacilityTypes(previous, facilityTypes) {
    let newState = previous;
    return newState.setIn(Paths.facilityTypes, facilityTypes);
}

function setFacilityTypesFiltered(previous, facilityTypesFiltered) {
    let newState = previous;
    return newState.setIn(Paths.facilityTypesFiltered, facilityTypesFiltered);
}

function setLoadingState(previous, loading) {
    let newState = previous;
    return newState.setIn(Paths.loading, loading);
}

/******************************/
/** FUNCTIONAL RESET REDUCERS */
/******************************/
function resetDoctorFilters(previous) {
    return previous.setIn(Paths.doctorFilters, new DoctorFilters());
}

function resetFacilityFilters(previous) {
    return previous.setIn(Paths.facilityFilters, new FacilityFilters());
}

function resetProviderSearchResults(previous) {
    let newState = previous;
    return newState.setIn(Paths.providerSearchResults, new ProviderSearchResults());
}

function resetFilters(previous) {
    let newState = previous;
    return newState.setIn(Paths.filters, new Filters());
}

/********************/
/** FILTER REDUCERS */
/********************/
function applyDoctorFilters(previous, doctorFilters) {
    const lastName = doctorFilters.get('lastName'),
        firstName = doctorFilters.get('firstName'),
        specialty = doctorFilters.get('specialty'),
        gender = doctorFilters.get('gender'),
        unfilteredDoctors = previous.getIn(Paths.providersRaw);
    let newState = previous,
        filteredDoctors = unfilteredDoctors;

    if (lastName) {
        filteredDoctors = filterDoctorsByLastName(filteredDoctors, lastName);
    }
    if(firstName) {
        filteredDoctors = filterDoctorsByFirstName(filteredDoctors, firstName);
    }
    if(specialty) {
        filteredDoctors = filterDoctorsBySpecialty(filteredDoctors, specialty);
    }
    if(gender) {
        filteredDoctors = filterDoctorsByGender(filteredDoctors, gender);
    }

    newState = setProvidersFiltered(newState, filteredDoctors);
    newState = setDoctorFilters(newState, doctorFilters);
    newState = resetFacilityFilters(newState);

    return newState;
}

function applyFacilityFilters(previous, facilityFilters) {
    const facilityName = facilityFilters.get('facilityName'),
        facilityType = facilityFilters.get('facilityType'),
        unfilteredFacilities = previous.getIn(Paths.providersRaw);

    let newState = previous,
        filteredFacilities = unfilteredFacilities;

    if (facilityName) {
        filteredFacilities = filterFacilitiesByFacilityName(filteredFacilities, facilityName);
    }
    if(facilityType) {
        filteredFacilities = filterFacilitiesByFacilityType(filteredFacilities, facilityType);
    }

    newState = setFilteredFacilities(newState, filteredFacilities);
    newState = setFacilityFilters(newState, facilityFilters);
    newState = resetDoctorFilters(newState);

    return newState;
}

export function resetAllFilters(previous, action) {
    const providersRaw = previous.getIn(Paths.providersRaw);
    let newState = previous;

    newState = setProvidersFiltered(newState, providersRaw);
    newState = resetFilters(newState);

    return newState;
}

export function clearProviders (previous, action) {
    let newState = previous;

    newState = updateSearchParams(newState, action.searchParams);
    newState = resetProviderSearchResults(newState)
    newState = resetFilters(newState);
    
    return newState;
}

function filterUnusedSpecialties(previous) {
    let newState = previous,
        filteredSpecialties = Immutable.List();
    // Get raw doctor results
    const doctorsRaw = getProvidersRaw(newState);

    // gather specialties present from raw provider results
    filteredSpecialties = ProviderUtils.buildListOfFilterParams(doctorsRaw, 'specialty');

    // alphabetize filtered specialties
    filteredSpecialties = ListUtils.sortListByParam(filteredSpecialties, 'name');
    
    // set specialties filtered
    newState = setSpecialtiesFiltered(newState, filteredSpecialties);

    return newState;

}

function filterUnusedFacilityTypes(previous) {
    let newState = previous,
        filteredFacilityTypes = Immutable.List();

    const facilitiesRaw = getProvidersRaw(newState);

    // gather specialties present from raw provider results
    filteredFacilityTypes = ProviderUtils.buildListOfFilterParams(facilitiesRaw, 'facilityType');

    // alphabetize filtered specialties
    filteredFacilityTypes = ListUtils.sortListByParam(filteredFacilityTypes, 'name');
    
    // set specialties filtered
    newState = setFacilityTypesFiltered(newState, filteredFacilityTypes);

    return newState;
}

/*******************************/
/** FUNCTIONAL FILTER REDUCERS */
/*******************************/
function filterDoctorsByLastName(unfilteredDoctors, searchName) {
    return unfilteredDoctors.filter((doctor) => {
        const lastNameLower = doctor.get('last').toLowerCase(),
            searchLastNameLower = searchName.toLowerCase();

        return lastNameLower.search(searchLastNameLower) !== -1;
    });
}

function filterDoctorsByFirstName(unfilteredDoctors, searchName) {
    return unfilteredDoctors.filter((doctor) => {
        const firstNameLower = doctor.get('first').toLowerCase(),
            searchFirstNameLower = searchName.toLowerCase();

        return firstNameLower.search(searchFirstNameLower) !== -1;
    });
}

function filterDoctorsBySpecialty(unfilteredDoctors, specialty) {
    return unfilteredDoctors.filter((doctor) => {
        return doctor.get('specialty') === specialty;
    });
}

function filterDoctorsByGender(unfilteredDoctors, gender) {
    return unfilteredDoctors.filter((doctor) => {
        return doctor.get('gender') === gender;
    });
}

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

/****************************/
/** DATA BOOTSTRAP REDUCERS */
/****************************/
export function gotSpecialties(previous, action) {
    const { specialties } = action;
    let newState = previous;

    newState = setSpecialties(newState, specialties);
    newState = setSpecialtiesFiltered(newState, specialties);
    
    return newState;
}

export function gotFacilityTypes(previous, action) {
    const { facilityTypes } = action;
    let newState = previous;

    newState = setFacilityTypes(newState, facilityTypes);
    newState = setFacilityTypesFiltered(newState, facilityTypes);

    return newState;
}

