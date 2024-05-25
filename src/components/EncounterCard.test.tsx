import React from 'react';
import {render, screen} from '@testing-library/react';
import EncounterCard from './EncounterCard';
import {Encounter} from 'fhir/r4';

const mockEncounter: Encounter = {
    resourceType: 'Encounter',
    id: 'encounter-1',
    status: 'finished',
    class: {code: 'AMB'},
    subject: {
        reference: 'Patient/patient-1',
    },
    period: {
        start: '2023-01-01T12:00:00Z',
        end: '2023-01-01T16:00:00Z',
    },
};

describe('EncounterCard', () => {
    it('renders without crashing and displays encounter details', () => {
        render(<EncounterCard encounter={mockEncounter} />);

        expect(screen.getByText('Encounter Details')).toBeInTheDocument();
        expect(screen.getByText('ID:')).toBeInTheDocument();
        expect(screen.getByText('encounter-1')).toBeInTheDocument();
        expect(screen.getByText('Status:')).toBeInTheDocument();
        expect(screen.getByText('finished')).toBeInTheDocument();
        expect(screen.getByText('Class:')).toBeInTheDocument();
        expect(screen.getByText('AMB')).toBeInTheDocument();
        expect(screen.getByText('Subject:')).toBeInTheDocument();
        expect(screen.getByText('Patient/patient-1')).toBeInTheDocument();
        expect(screen.getByText('Start:')).toBeInTheDocument();
        expect(screen.getByText('2023-01-01T12:00:00Z')).toBeInTheDocument();
        expect(screen.getByText('End:')).toBeInTheDocument();
        expect(screen.getByText('2023-01-01T16:00:00Z')).toBeInTheDocument();
    });

    it('displays a badge for missing fields', () => {
        const incompleteEncounter: Partial<Encounter> = {
            resourceType: 'Encounter',
            id: 'encounter-2',
            // Missing status, class, subject, period
        };

        render(
            <EncounterCard encounter={{...incompleteEncounter} as Encounter} />,
        );

        expect(screen.getByText('ID:')).toBeInTheDocument();
        expect(screen.getByText('encounter-2')).toBeInTheDocument();
        expect(screen.getByText('Status:')).toBeInTheDocument();
        expect(screen.getByText('Missing')).toBeInTheDocument();
    });
});
