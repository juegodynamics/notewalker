import {searchBundles} from './searchBundles';
import {Bundle} from 'fhir/r4';
import {Criterion} from 'types';
import {Operator, ResourceType} from 'enums';

describe('searchBundles', () => {
    const sampleBundles: Bundle[] = [
        {
            resourceType: 'Bundle',
            type: 'document',
            entry: [
                {
                    resource: {
                        resourceType: 'Patient',
                        id: 'patient-1',
                        name: [{text: 'John Doe'}],
                        gender: 'male',
                        birthDate: '1980-01-01',
                    },
                },
            ],
        },
        {
            resourceType: 'Bundle',
            type: 'document',
            entry: [
                {
                    resource: {
                        resourceType: 'Condition',
                        id: 'condition-1',
                        clinicalStatus: {coding: [{code: 'active'}]},
                        verificationStatus: {coding: [{code: 'confirmed'}]},
                        code: {
                            coding: [
                                {
                                    code: 'diabetes',
                                    display: 'Diabetes Mellitus',
                                },
                            ],
                        },
                        subject: {reference: 'Patient/patient-1'},
                    },
                },
            ],
        },
    ];

    it('returns correct indices for Equals operator', () => {
        const criteria: Criterion[] = [
            {
                resourceType: ResourceType.Patient,
                field: 'gender',
                operator: Operator.Equals,
                value: 'male',
            },
        ];
        const result = searchBundles(sampleBundles, criteria);
        expect(result).toEqual([0]);
    });

    it('returns correct indices for Contains operator', () => {
        const criteria: Criterion[] = [
            {
                resourceType: ResourceType.Condition,
                field: 'code.coding.display',
                operator: Operator.Contains,
                value: 'Diabetes',
            },
        ];
        const result = searchBundles(sampleBundles, criteria);
        expect(result).toEqual([1]);
    });

    it('returns correct indices for StartsWith operator', () => {
        const criteria: Criterion[] = [
            {
                resourceType: ResourceType.Patient,
                field: 'name.text',
                operator: Operator.StartsWith,
                value: 'John',
            },
        ];
        const result = searchBundles(sampleBundles, criteria);
        expect(result).toEqual([0]);
    });

    it('returns correct indices for EndsWith operator', () => {
        const criteria: Criterion[] = [
            {
                resourceType: ResourceType.Patient,
                field: 'name.text',
                operator: Operator.EndsWith,
                value: 'Doe',
            },
        ];
        const result = searchBundles(sampleBundles, criteria);
        expect(result).toEqual([0]);
    });

    it('returns correct indices for GreaterThan operator', () => {
        const criteria: Criterion[] = [
            {
                resourceType: ResourceType.Patient,
                field: 'birthDate',
                operator: Operator.GreaterThan,
                value: '1979-12-31',
            },
        ];
        const result = searchBundles(sampleBundles, criteria);
        expect(result).toEqual([0]);
    });

    it('returns correct indices for LessThan operator', () => {
        const criteria: Criterion[] = [
            {
                resourceType: ResourceType.Patient,
                field: 'birthDate',
                operator: Operator.LessThan,
                value: '1981-01-01',
            },
        ];
        const result = searchBundles(sampleBundles, criteria);
        expect(result).toEqual([0]);
    });

    it('returns an empty array when no matches are found', () => {
        const criteria: Criterion[] = [
            {
                resourceType: ResourceType.Patient,
                field: 'gender',
                operator: Operator.Equals,
                value: 'female',
            },
        ];
        const result = searchBundles(sampleBundles, criteria);
        expect(result).toEqual([]);
    });

    it('handles missing resource field gracefully', () => {
        const criteria: Criterion[] = [
            {
                resourceType: ResourceType.Patient,
                field: 'missingField',
                operator: Operator.Equals,
                value: 'value',
            },
        ];
        const result = searchBundles(sampleBundles, criteria);
        expect(result).toEqual([]);
    });

    it('handles unsupported operator gracefully', () => {
        const criteria: Criterion[] = [
            {
                resourceType: ResourceType.Patient,
                field: 'gender',
                operator: 'UnsupportedOperator' as Operator,
                value: 'male',
            },
        ];
        const result = searchBundles(sampleBundles, criteria);
        expect(result).toEqual([]);
    });
});
