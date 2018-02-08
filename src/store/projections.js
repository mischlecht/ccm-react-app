/* eslint-disable import/default */
import * as Immutable from 'immutable';
import * as ProviderModels from '../provider/constants/provider.models';

export function projectProviderResultsToObject(providerResults){
    let projectedProviderResults = Immutable.List();

    providerResults.forEach(function(provider) {
        projectedProviderResults = projectedProviderResults.push(new ProviderModels.Provider({
            address_line_1: provider.address_line_1,
            address_line_2: provider.address_line_2,
            city: provider.city,
            distance: provider.distance,
            facilityName: provider.facilityName,
            facilityType: provider.facilityType,
            facility_provider_id: provider.facility_provider_id,
            id: provider.id,
            phone: provider.phone,
            state: provider.state,
            type: provider.type,
            zip: provider.zip
        }));
    });

    return projectedProviderResults;
}