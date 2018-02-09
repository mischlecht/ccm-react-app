import Immutable from 'immutable';

export function populateFacilityTypes() {
    const facilityTypeApiUrl = 'https://provider-api.ccmnpe.com/facility_types';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', facilityTypeApiUrl, true);
    xhr.onload = function(){
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                return Immutable.fromJS(JSON.parse(xhr.response));
            }
        } 
    };
    xhr.send();
};