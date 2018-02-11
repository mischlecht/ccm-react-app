import Immutable from 'immutable';
import axios from 'axios';

export function populateSpecialties(callback) {
    const specialtyTypeApiUrl = 'https://provider-api.ccmnpe.com/specialties';

    axios.get(specialtyTypeApiUrl)
        .then(response => {
            callback(Immutable.fromJS(response.data));
        })
        .catch(response => {
            console.log(response);
        });
};

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

export function buildListOfFilterParams(sourceList, paramName) {
    let filteredList = Immutable.List();
    
    sourceList.map(sourceListObj => {
        const immutableObject = Immutable.fromJS({
            name: sourceListObj.get(paramName)
        });

        if (!filteredList.contains(immutableObject)) {
            filteredList = filteredList.push(immutableObject);
        }
        
        return null;
    });

    return filteredList;
}