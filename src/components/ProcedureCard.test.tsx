import React from 'react';
import {render, screen} from '@testing-library/react';
import ProcedureCard from './ProcedureCard';
import {Procedure} from 'fhir/r4';

const mockProcedure: Procedure = {
    resourceType: 'Procedure',
    id: 'procedure-1',
    status: 'completed',
    code: {
        coding: [
            {
                display: 'Appendectomy',
            },
        ],
    },
    subject: {
        reference: 'Patient/patient-1',
    },
    performedDateTime: '2023-01-01T12:00:00Z',
};

describe('ProcedureCard', () => {
    it('renders without crashing and displays procedure details', () => {
        render(<ProcedureCard procedure={mockProcedure} />);

        expect(screen.getByText('Procedure Details')).toBeInTheDocument();
        expect(screen.getByText('ID:')).toBeInTheDocument();
        expect(screen.getByText('procedure-1')).toBeInTheDocument();
        expect(screen.getByText('Status:')).toBeInTheDocument();
        expect(screen.getByText('completed')).toBeInTheDocument();
        expect(screen.getByText('Code:')).toBeInTheDocument();
        expect(screen.getByText('Appendectomy')).toBeInTheDocument();
        expect(screen.getByText('Subject:')).toBeInTheDocument();
        expect(screen.getByText('Patient/patient-1')).toBeInTheDocument();
        expect(screen.getByText('Performed Date/Time:')).toBeInTheDocument();
        expect(screen.getByText('2023-01-01T12:00:00Z')).toBeInTheDocument();
    });

    it('displays a badge for missing fields', () => {
        const incompleteProcedure: Partial<Procedure> = {
            resourceType: 'Procedure',
            id: 'procedure-2',
            // Missing status, code, subject, and performedDateTime
        };

        render(
            <ProcedureCard procedure={{...incompleteProcedure} as Procedure} />,
        );

        expect(screen.getByText('ID:')).toBeInTheDocument();
        expect(screen.getByText('procedure-2')).toBeInTheDocument();
        expect(screen.getByText('Status:')).toBeInTheDocument();
        expect(screen.getByText('Missing')).toBeInTheDocument();
    });
});
