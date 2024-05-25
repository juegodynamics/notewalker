import React from 'react';
import fhir from 'fhir/r4';
import PatientCard from 'components/PatientCard';
import OrganizationCard from 'components/OrganizationCard';
import PractitionerCard from 'components/PractitionerCard';
import ConditionCard from 'components/ConditionCard';
import EncounterCard from 'components/EncounterCard';
import ProcedureCard from 'components/ProcedureCard';
import CarePlanCard from 'components/CarePlanCard';

/**
 * getResourceCard function
 *
 * This function takes a FHIR BundleEntry and returns the corresponding React component
 * to display the resource details. It supports various FHIR resource types such as
 * Patient, Organization, Practitioner, Condition, Encounter, Procedure, and CarePlan.
 *
 * @param {fhir.BundleEntry} entry - The FHIR BundleEntry containing the resource
 * @returns {React.ReactNode} The React component to display the resource details
 */
export const getResourceCard = (
    entry: fhir.BundleEntry,
): React.ReactNode | null => {
    if (!entry.resource) {
        return null;
    }

    switch (entry.resource.resourceType) {
        case 'Patient':
            return <PatientCard patient={entry.resource as fhir.Patient} />;
        case 'Organization':
            return (
                <OrganizationCard
                    organization={entry.resource as fhir.Organization}
                />
            );
        case 'Practitioner':
            return (
                <PractitionerCard
                    practitioner={entry.resource as fhir.Practitioner}
                />
            );
        case 'Condition':
            return (
                <ConditionCard condition={entry.resource as fhir.Condition} />
            );
        case 'Encounter':
            return (
                <EncounterCard encounter={entry.resource as fhir.Encounter} />
            );
        case 'Procedure':
            return (
                <ProcedureCard procedure={entry.resource as fhir.Procedure} />
            );
        case 'CarePlan':
            return <CarePlanCard carePlan={entry.resource as fhir.CarePlan} />;
        default:
            return (
                <div>
                    Unsupported resource type: {entry.resource.resourceType}
                </div>
            );
    }
};
