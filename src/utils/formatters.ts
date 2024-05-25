import {
    Patient as FhirPatient,
    Composition,
    Identifier,
    HumanName,
    ContactPoint,
    Address,
    CodeableConcept,
    Coding,
    Reference,
    Practitioner,
} from 'fhir/r4';
import {Patient, Note} from 'types';

// Utility function to format a Patient object to FHIR Patient resource
export const formatPatientToFhir = (patient: Patient): FhirPatient => {
    const fhirPatient: FhirPatient = {
        resourceType: 'Patient',
        id: `${patient?.id || 'Unknown'}`,
        name: [
            {
                text: patient?.name || '',
            },
        ],
        gender: patient?.gender.toLowerCase() as FhirPatient['gender'],
        birthDate: patient?.date_of_birth,
    };

    return fhirPatient;
};

// Utility function to format a Note object to FHIR Composition resource
export const formatNoteToFhirComposition = (note: Note): Composition => {
    const fhirComposition: Composition = {
        resourceType: 'Composition',
        id: `${note.id}`,
        status: 'final',
        type: {
            coding: [
                {
                    system: 'http://loinc.org',
                    code: '34133-9',
                    display: 'Summary of episode note',
                },
            ],
        },
        subject: {
            reference: `Patient/${note.patient_id}`,
        },
        date: note.creation_date,
        author: [
            {
                display: note.provider_name,
            },
        ],
        title: 'Clinical Note',
        section: [
            {
                title: 'Note Content',
                text: {
                    status: 'generated',
                    div: `<div>${note.text}</div>`,
                },
            },
        ],
    };

    return fhirComposition;
};

/**
 * createPractitionerFromNote function
 *
 * This function takes a Note object and creates a simple Practitioner resource
 * based on the note's information.
 *
 * @param {Note} note - The Note object
 * @returns {Practitioner} The created Practitioner resource
 */
export const createPractitionerFromNote = (note: Note): Practitioner => {
    return {
        resourceType: 'Practitioner',
        id: `practitioner-${note.id}`,
        name: [
            {
                use: 'official',
                text: note.provider_name,
                family: '',
                given: note.provider_name.split(' '),
            },
        ],
        telecom: [
            {
                system: 'phone',
                value: '555-555-5555', // Placeholder, can be replaced with actual data if available
                use: 'work',
            },
            {
                system: 'email',
                value: `${note.provider_name.split(' ').join('.')}@hospital.org`, // Placeholder email generation
                use: 'work',
            },
        ],
        address: [
            {
                text: note.hospital_name,
            },
        ],
    };
};
