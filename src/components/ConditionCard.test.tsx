import React from 'react';
import {render, screen} from '@testing-library/react';
import ConditionCard from './ConditionCard';
import {Condition} from 'fhir/r4';

const mockCondition: Condition = {
    resourceType: 'Condition',
    id: 'condition-1',
    clinicalStatus: {
        coding: [{display: 'Active'}],
    },
    verificationStatus: {
        coding: [{display: 'Confirmed'}],
    },
    category: [
        {
            coding: [{display: 'Problem List Item'}],
        },
    ],
    code: {
        coding: [{display: 'Diabetes mellitus type 2'}],
    },
    subject: {
        reference: 'Patient/patient-1',
    },
};

describe('ConditionCard', () => {
    it('renders without crashing and displays condition details', () => {
        render(<ConditionCard condition={mockCondition} />);

        expect(screen.getByText('Condition Details')).toBeInTheDocument();
        expect(screen.getByText('ID:')).toBeInTheDocument();
        expect(screen.getByText('condition-1')).toBeInTheDocument();
        expect(screen.getByText('Clinical Status:')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Verification Status:')).toBeInTheDocument();
        expect(screen.getByText('Confirmed')).toBeInTheDocument();
        expect(screen.getByText('Category:')).toBeInTheDocument();
        expect(screen.getByText('Problem List Item')).toBeInTheDocument();
        expect(screen.getByText('Code:')).toBeInTheDocument();
        expect(
            screen.getByText('Diabetes mellitus type 2'),
        ).toBeInTheDocument();
        expect(screen.getByText('Subject:')).toBeInTheDocument();
        expect(screen.getByText('Patient/patient-1')).toBeInTheDocument();
    });

    it('displays a badge for missing fields', () => {
        const incompleteCondition: Partial<Condition> = {
            resourceType: 'Condition',
            id: 'condition-2',
            // Missing clinicalStatus, verificationStatus, category, code, and subject
        };

        render(
            <ConditionCard condition={{...incompleteCondition} as Condition} />,
        );

        expect(screen.getByText('ID:')).toBeInTheDocument();
        expect(screen.getByText('condition-2')).toBeInTheDocument();
        expect(screen.getByText('Clinical Status:')).toBeInTheDocument();
        expect(screen.getByText('Missing')).toBeInTheDocument();
    });
});
