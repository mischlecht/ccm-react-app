import Immutable from 'immutable';
import axios from 'axios';

export function populateFacilityTypes(callback) {
    const facilityTypeApiUrl = 'https://provider-api.ccmnpe.com/facility_types';

    axios.get(facilityTypeApiUrl)
        .then(response => {
            callback(Immutable.fromJS(response.data));
        })
        .catch(response => {
            console.log(response);
        });
};