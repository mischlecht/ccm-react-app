import * as Immutable from 'immutable';

export const SearchParams = Immutable.Record({
    zipCode: '',
    providerType: ''
});

export const ProviderSearchResults = Immutable.Record({
    providerType: '',
    providers: Immutable.List()
});

export const FilterOptions = Immutable.Record({
    distance: '',
    facilityName: '',
    facilityType: '',
    first: '',
    last: '',
    specialty: '',
    gender: ''
});

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

export const InitialState = Immutable.fromJS({
    filterOptions: new FilterOptions(),
    providerSearchResults: new ProviderSearchResults(),
});