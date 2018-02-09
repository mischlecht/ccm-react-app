import Immutable from 'immutable';

export function populateSpecialtyTypes() {
    const specialtyTypeApiUrl = 'https://provider-api.ccmnpe.com/specialties';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', specialtyTypeApiUrl, true);
    xhr.onload = function(){
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                return Immutable.fromJS(JSON.parse(xhr.response));
            }
        } 
    };
    xhr.send();
};