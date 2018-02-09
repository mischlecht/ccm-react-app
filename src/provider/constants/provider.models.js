import * as Immutable from 'immutable';
import * as FacilityUtils from '../../shared/constants/facility-utils';
import * as SpecialtyUtils from '../../shared/constants/specialty-utils';

/** Initial State */
export const ProviderSearchResults = Immutable.Record({
    providerType: '',
    providersRaw: Immutable.List(),
    providersFiltered: Immutable.List()
});

export const DoctorFilters = Immutable.Record({
    distance: Immutable.List([5, 10, 15, 20, 50, 100]),
    first: '',
    last: '',
    specialty: Immutable.List(),
    gender: Immutable.List()
});

export const FacilityFilters = Immutable.Record({
    distance: Immutable.List([5, 10, 15, 20, 50, 100]),
    facilityName: '',
    facilityType: Immutable.List()
});

export const Filters = Immutable.Record({
    doctorFilters: new DoctorFilters(),
    facilityFilters: new FacilityFilters()
})

// Static options used to filter providers
export const FilterOptions = Immutable.Record({
    specialities: SpecialtyUtils.populateSpecialtyTypes(),
    facilityTypes: FacilityUtils.populateFacilityTypes()
});

export const InitialState = Immutable.fromJS({
    filterOptions: new FilterOptions(),
    providerSearchResults: new ProviderSearchResults(),
});

/** Models */
export const Doctor = Immutable.Record({
    addressLine1: '',
    addressLine2: '',
    city: '',
    degree: '',
    distance: '',
    first: '',
    gender: '',
    id: '',
    last: '',
    phone: '',
    providerId: '',
    specialty: '',
    state: '',
    type: '',
    zip: ''
})

export const Facility = Immutable.Record({
    addressLine1: '',
    addressLine2: '',
    city: '',
    distance: '',
    facilityName: '',
    facilityType: '',
    facilityProviderId: '',
    id: '',
    phone: '',
    state: '',
    type: '',
    zip: ''
});