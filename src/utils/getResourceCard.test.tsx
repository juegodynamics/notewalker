import React from 'react';
import {render, screen} from '@testing-library/react';
import {getResourceCard} from './getResourceCard';
import fhir from 'fhir/r4';
import '@testing-library/jest-dom/extend-expect';

describe('getResourceCard', () => {
    const renderWithType = (node: React.ReactNode) => {
        if (node) {
            render(<>{node}</>);
        }
    };

    it('renders PatientCard for Patient resource', () => {
        const patientEntry: fhir.BundleEntry = {
            resource: {
                resourceType: 'Patient',
                id: 'patient-1',
                name: [{text: 'John Doe'}],
                gender: 'male',
                birthDate: '1980-01-01',
                address: [{text: '123 Main St, Hometown, HT 12345'}],
            } as fhir.Patient,
        };

        renderWithType(getResourceCard(patientEntry));
        expect(screen.getByText('Patient Details')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders OrganizationCard for Organization resource', () => {
        const organizationEntry: fhir.BundleEntry = {
            resource: {
                resourceType: 'Organization',
                id: 'org-1',
                name: 'Health Organization',
                type: [
                    {
                        coding: [
                            {
                                display: 'Healthcare Provider',
                            },
                        ],
                    },
                ],
                address: [{text: '123 Health St, Healthcare City, HC 12345'}],
            } as fhir.Organization,
        };

        renderWithType(getResourceCard(organizationEntry));
        expect(screen.getByText('Organization Details')).toBeInTheDocument();
        expect(screen.getByText('Health Organization')).toBeInTheDocument();
    });

    it('renders PractitionerCard for Practitioner resource', () => {
        const practitionerEntry: fhir.BundleEntry = {
            resource: {
                resourceType: 'Practitioner',
                id: 'practitioner-1',
                name: [{text: 'Dr. Jane Smith'}],
                gender: 'female',
                address: [{text: '456 Health Ave, Wellness City, WC 67890'}],
            } as fhir.Practitioner,
        };

        renderWithType(getResourceCard(practitionerEntry));
        expect(screen.getByText('Practitioner Details')).toBeInTheDocument();
        expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument();
    });

    it('renders ConditionCard for Condition resource', () => {
        const conditionEntry: fhir.BundleEntry = {
            resource: {
                resourceType: 'Condition',
                id: 'condition-1',
                clinicalStatus: {
                    coding: [{display: 'Active'}],
                },
                verificationStatus: {
                    coding: [{display: 'Confirmed'}],
                },
                code: {
                    coding: [{display: 'Hypertension'}],
                },
                subject: {reference: 'Patient/patient-1'},
            } as fhir.Condition,
        };

        renderWithType(getResourceCard(conditionEntry));
        expect(screen.getByText('Condition Details')).toBeInTheDocument();
        expect(screen.getByText('Hypertension')).toBeInTheDocument();
    });

    it('renders EncounterCard for Encounter resource', () => {
        const encounterEntry: fhir.BundleEntry = {
            resource: {
                resourceType: 'Encounter',
                id: 'encounter-1',
                status: 'finished',
                class: {code: 'ambulatory'},
                subject: {reference: 'Patient/patient-1'},
                period: {
                    start: '2023-01-01T12:00:00Z',
                    end: '2023-01-01T16:00:00Z',
                },
            } as fhir.Encounter,
        };

        renderWithType(getResourceCard(encounterEntry));
        expect(screen.getByText('Encounter Details')).toBeInTheDocument();
        expect(screen.getByText('ambulatory')).toBeInTheDocument();
    });

    it('renders ProcedureCard for Procedure resource', () => {
        const procedureEntry: fhir.BundleEntry = {
            resource: {
                resourceType: 'Procedure',
                id: 'procedure-1',
                status: 'completed',
                code: {
                    coding: [{display: 'Appendectomy'}],
                },
                subject: {reference: 'Patient/patient-1'},
                performedDateTime: '2023-01-01T12:00:00Z',
            } as fhir.Procedure,
        };

        renderWithType(getResourceCard(procedureEntry));
        expect(screen.getByText('Procedure Details')).toBeInTheDocument();
        expect(screen.getByText('Appendectomy')).toBeInTheDocument();
    });

    it('renders CarePlanCard for CarePlan resource', () => {
        const carePlanEntry: fhir.BundleEntry = {
            resource: {
                resourceType: 'CarePlan',
                id: 'careplan-1',
                status: 'active',
                intent: 'plan',
                title: 'Discharge Plan',
                description:
                    'Follow up with primary care physician or ophthalmologist for further evaluation and treatment.',
                subject: {reference: 'Patient/patient-1'},
                period: {start: '2023-09-29T16:00:00Z'},
                activity: [
                    {
                        detail: {
                            kind: 'Appointment',
                            code: {
                                coding: [
                                    {
                                        system: 'http://snomed.info/sct',
                                        code: '408443003',
                                        display: 'Follow-up',
                                    },
                                ],
                            },
                            status: 'scheduled',
                            scheduledPeriod: {
                                start: '2023-10-01T00:00:00Z',
                                end: '2023-10-31T23:59:59Z',
                            },
                        },
                    },
                ],
            } as fhir.CarePlan,
        };

        renderWithType(getResourceCard(carePlanEntry));
        expect(screen.getByText('Care Plan Details')).toBeInTheDocument();
        expect(screen.getByText('Discharge Plan')).toBeInTheDocument();
    });

    it('renders a message for unsupported resource type', () => {
        const unsupportedEntry: fhir.BundleEntry = {
            resource: {
                resourceType: 'UnsupportedType',
            } as any,
        };

        renderWithType(getResourceCard(unsupportedEntry));
        expect(
            screen.getByText('Unsupported resource type: UnsupportedType'),
        ).toBeInTheDocument();
    });
});
