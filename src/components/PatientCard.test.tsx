import React from 'react';
import {render, screen} from '@testing-library/react';
import PatientCard from './PatientCard';
import {Patient} from 'fhir/r4';

const mockPatient: Patient = {
    resourceType: 'Patient',
    id: 'patient-1',
    name: [
        {
            text: 'John Doe',
        },
    ],
    gender: 'male',
    birthDate: '1980-01-01',
    address: [
        {
            text: '123 Main St, Hometown, HT 12345',
        },
    ],
};

describe('PatientCard', () => {
    it('renders without crashing and displays patient details', () => {
        render(<PatientCard patient={mockPatient} />);

        expect(screen.getByText('Patient Details')).toBeInTheDocument();
        expect(screen.getByText('ID:')).toBeInTheDocument();
        expect(screen.getByText('patient-1')).toBeInTheDocument();
        expect(screen.getByText('Name:')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Gender:')).toBeInTheDocument();
        expect(screen.getByText('male')).toBeInTheDocument();
        expect(screen.getByText('Birth Date:')).toBeInTheDocument();
        expect(screen.getByText('1980-01-01')).toBeInTheDocument();
        expect(screen.getByText('Address:')).toBeInTheDocument();
        expect(
            screen.getByText('123 Main St, Hometown, HT 12345'),
        ).toBeInTheDocument();
    });

    it('displays a badge for missing fields', () => {
        const incompletePatient: Patient = {
            resourceType: 'Patient',
            id: 'patient-2',
            // Missing name, gender, birthDate, and address
        };

        render(<PatientCard patient={incompletePatient} />);

        expect(screen.getByText('ID:')).toBeInTheDocument();
        expect(screen.getByText('patient-2')).toBeInTheDocument();
        expect(screen.getByText('Name:')).toBeInTheDocument();
        expect(screen.getByText('Missing')).toBeInTheDocument();
    });
});
