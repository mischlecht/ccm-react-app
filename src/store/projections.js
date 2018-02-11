/* eslint-disable import/default */
import * as Immutable from 'immutable';
import * as ProviderModels from '../provider/constants/provider.models';

export function projectFacilityResults(facilityResults){
    let projectedFacilityResults = Immutable.List();

    facilityResults.forEach(function(facility) {
        projectedFacilityResults = projectedFacilityResults.push(new ProviderModels.Facility({
            addressLine1: facility.address_line_1,
            addressLine2: facility.address_line_2,
            city: facility.city,
            distance: facility.distance,
            facilityName: facility.facilityName,
            facilityType: facility.facilityType,
            facility_provider_id: facility.facility_provider_id,
            id: facility.id,
            phone: facility.phone,
            state: facility.state,
            type: facility.type,
            zip: facility.zip
        }));
    });

    return projectedFacilityResults;
}

export function projectDoctorResults(doctorResults){
    let projectedDoctorResults = Immutable.List();

    doctorResults.forEach(function(doctor) {
        projectedDoctorResults = projectedDoctorResults.push(new ProviderModels.Doctor({
            addressLine1: doctor.address_line_1,
            addressLine2: doctor.address_line_2,
            city: doctor.city,
            degree: doctor.degree,
            distance: doctor.distance,
            first: doctor.first,
            gender: doctor.gender,
            id: doctor.id,
            last: doctor.last,
            phone: doctor.phone,
            providerId: doctor.provider_id,
            specialty: doctor.specialty,
            state: doctor.state,
            type: doctor.type,
            zip: doctor.zip
        }));
    });

    return projectedDoctorResults;
}