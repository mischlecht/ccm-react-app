import * as Immutable from 'immutable';

/** Initial State */
export const ProviderSearchResults = Immutable.Record({
    providerType: '',
    providersRaw: Immutable.List(),
    providersFiltered: Immutable.List()
});

export const DoctorFilters = Immutable.Record({
    distance: 0,
    first: '',
    last: '',
    specialty: '',
    gender: ''
});

export const FacilityFilters = Immutable.Record({
    facilityName: '',
    facilityType: ''
});

export const Filters = Immutable.Record({
    doctorFilters: new DoctorFilters(),
    facilityFilters: new FacilityFilters()
});

export const StaticData = Immutable.Record({
    specialties: Immutable.List(),
    facilityTypes: Immutable.List()
});

/** Static options used to filter providers */
export const InitialState = Immutable.fromJS({
    filters: new Filters(),
    staticData: new StaticData(),
    providerSearchResults: new ProviderSearchResults()
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