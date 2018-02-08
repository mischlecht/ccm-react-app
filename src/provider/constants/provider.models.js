import * as Immutable from 'immutable';

export const SearchParams = Immutable.Record({
    zipCode: '',
    providerType: ''
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

export const Provider = Immutable.Record({
    address_line_1: '',
    address_line_2: '',
    city: '',
    distance: '',
    facilityName: '',
    facilityType: '',
    facility_provider_id: '',
    id: '',
    phone: '',
    state: '',
    type: '',
    zip: ''
});

export const InitialState = Immutable.fromJS({
    filterOptions: new FilterOptions(),
    providerResults: Immutable.List(),
    filteredResults: Immutable.List()
});