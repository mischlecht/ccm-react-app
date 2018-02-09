import Immutable from 'immutable';
import axios from 'axios';

export function populateSpecialtyTypes(callback) {
    const specialtyTypeApiUrl = 'https://provider-api.ccmnpe.com/specialties';

    axios.get(specialtyTypeApiUrl)
        .then(response => {
            callback(Immutable.fromJS(response.data));
        })
        .catch(response => {
            console.log(response);
        });
};