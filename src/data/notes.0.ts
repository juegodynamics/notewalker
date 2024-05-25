export const noteExtractions = [
    {
        resourceType: 'Bundle',
        type: 'document',
        entry: [
            {
                resource: {
                    resourceType: 'Patient',
                    id: 'patient-1',
                    gender: 'male',
                    birthDate: '1963-01-01', // Assuming the current year is 2023 and the patient is 60 years old
                },
            },
            {
                resource: {
                    resourceType: 'Condition',
                    id: 'condition-1',
                    clinicalStatus: {
                        coding: [
                            {
                                system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                                code: 'active',
                            },
                        ],
                    },
                    verificationStatus: {
                        coding: [
                            {
                                system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
                                code: 'confirmed',
                            },
                        ],
                    },
                    category: [
                        {
                            coding: [
                                {
                                    system: 'http://terminology.hl7.org/CodeSystem/condition-category',
                                    code: 'encounter-diagnosis',
                                },
                            ],
                        },
                    ],
                    code: {
                        coding: [
                            {
                                system: 'http://snomed.info/sct',
                                code: '840539006',
                                display: 'COVID-19',
                            },
                        ],
                    },
                    subject: {
                        reference: 'Patient/patient-1',
                    },
                    note: [
                        {
                            text: 'Moderate ARDS from COVID-19',
                        },
                    ],
                },
            },
            {
                resource: {
                    resourceType: 'Encounter',
                    id: 'encounter-1',
                    status: 'finished',
                    class: {
                        code: 'inpatient',
                    },
                    subject: {
                        reference: 'Patient/patient-1',
                    },
                    period: {
                        start: '2023-01-01T00:00:00Z', // Assuming admission date
                        end: '2023-01-10T00:00:00Z', // Assuming discharge date
                    },
                    hospitalization: {
                        dischargeDisposition: {
                            coding: [
                                {
                                    system: 'http://terminology.hl7.org/CodeSystem/discharge-disposition',
                                    code: 'rehab',
                                    display:
                                        'Discharged to rehabilitation clinic',
                                },
                            ],
                        },
                    },
                },
            },
            {
                resource: {
                    resourceType: 'Procedure',
                    id: 'procedure-1',
                    status: 'completed',
                    code: {
                        coding: [
                            {
                                system: 'http://snomed.info/sct',
                                code: '53950000',
                                display: 'Physical therapy procedures',
                            },
                        ],
                    },
                    subject: {
                        reference: 'Patient/patient-1',
                    },
                    performedPeriod: {
                        start: '2023-01-01T00:00:00Z', // Assuming start date of physical therapy
                        end: '2023-01-10T00:00:00Z', // Assuming end date of physical therapy
                    },
                    note: [
                        {
                            text: 'Patient experienced coughing attacks that induced oxygen desaturation and dyspnea with any change of position or deep breathing. Breathing exercises were adapted to avoid prolonged coughing and oxygen desaturation. Exercise progression was low initially but increased daily.',
                        },
                    ],
                },
            },
            {
                resource: {
                    resourceType: 'CarePlan',
                    id: 'careplan-1',
                    status: 'active',
                    intent: 'plan',
                    title: 'Rehabilitation Care Plan',
                    description:
                        'Follow-up care at the rehabilitation clinic with regular monitoring and further rehabilitation exercises until full recovery.',
                    subject: {
                        reference: 'Patient/patient-1',
                    },
                    period: {
                        start: '2023-01-10T00:00:00Z', // Assuming the start date of care plan after discharge
                    },
                    note: [
                        {
                            text: 'Any new symptoms or concerns should be reported to the clinic immediately.',
                        },
                    ],
                },
            },
            {
                resource: {
                    resourceType: 'Observation',
                    id: 'observation-1',
                    status: 'final',
                    code: {
                        coding: [
                            {
                                system: 'http://loinc.org',
                                code: '54564-0',
                                display: 'Overall Impression',
                            },
                        ],
                    },
                    subject: {
                        reference: 'Patient/patient-1',
                    },
                    valueString:
                        "The patient responded well to treatment, and with appropriate medical intervention, was able to overcome the difficulties faced during hospitalization for ARDS from COVID-19. The patient's level of care was of a high standard, with all necessary therapy provided and monitoring of progress before discharge.",
                },
            },
        ],
    },
];
