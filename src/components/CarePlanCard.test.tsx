import React from 'react';
import {render, screen} from '@testing-library/react';
import CarePlanCard from './CarePlanCard';
import {CarePlan} from 'fhir/r4';

const mockCarePlan: CarePlan = {
    resourceType: 'CarePlan',
    id: 'careplan-1',
    status: 'active',
    intent: 'plan',
    title: 'Care Plan Title',
    description: 'Description of the care plan',
    subject: {
        reference: 'Patient/patient-1',
    },
    period: {
        start: '2023-01-01',
    },
};

describe('CarePlanCard', () => {
    it('renders without crashing and displays care plan details', () => {
        render(<CarePlanCard carePlan={mockCarePlan} />);

        expect(screen.getByText('Care Plan Details')).toBeInTheDocument();
        expect(screen.getByText('ID:')).toBeInTheDocument();
        expect(screen.getByText('careplan-1')).toBeInTheDocument();
        expect(screen.getByText('Status:')).toBeInTheDocument();
        expect(screen.getByText('active')).toBeInTheDocument();
        expect(screen.getByText('Intent:')).toBeInTheDocument();
        expect(screen.getByText('plan')).toBeInTheDocument();
        expect(screen.getByText('Title:')).toBeInTheDocument();
        expect(screen.getByText('Care Plan Title')).toBeInTheDocument();
        expect(screen.getByText('Description:')).toBeInTheDocument();
        expect(
            screen.getByText('Description of the care plan'),
        ).toBeInTheDocument();
        expect(screen.getByText('Subject:')).toBeInTheDocument();
        expect(screen.getByText('Patient/patient-1')).toBeInTheDocument();
        expect(screen.getByText('Start:')).toBeInTheDocument();
        expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    });

    it('displays a badge for missing fields', () => {
        const incompleteCarePlan: Partial<CarePlan> = {
            resourceType: 'CarePlan',
            id: 'careplan-2',
            status: 'active',
            intent: 'plan',
            // Missing title, description, subject, and start period
        };

        render(<CarePlanCard carePlan={{...incompleteCarePlan} as CarePlan} />);

        expect(screen.getByText('ID:')).toBeInTheDocument();
        expect(screen.getByText('careplan-2')).toBeInTheDocument();
        expect(screen.getByText('Title:')).toBeInTheDocument();
        screen.getAllByText('Missing').forEach((element) => {
            expect(element).toBeInTheDocument();
        });
    });
});
