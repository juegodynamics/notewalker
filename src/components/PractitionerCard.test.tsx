import React from 'react';
import {render, screen} from '@testing-library/react';
import PractitionerCard from './PractitionerCard';
import {Practitioner} from 'fhir/r4';

const mockPractitioner: Practitioner = {
    resourceType: 'Practitioner',
    id: 'practitioner-1',
    name: [
        {
            text: 'Dr. Jane Smith',
        },
    ],
    gender: 'female',
    address: [
        {
            text: '456 Health Ave, Wellness City, WC 67890',
        },
    ],
};

describe('PractitionerCard', () => {
    it('renders without crashing and displays practitioner details', () => {
        render(<PractitionerCard practitioner={mockPractitioner} />);

        expect(screen.getByText('Practitioner Details')).toBeInTheDocument();
        expect(screen.getByText('ID:')).toBeInTheDocument();
        expect(screen.getByText('practitioner-1')).toBeInTheDocument();
        expect(screen.getByText('Name:')).toBeInTheDocument();
        expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Gender:')).toBeInTheDocument();
        expect(screen.getByText('female')).toBeInTheDocument();
        expect(screen.getByText('Address:')).toBeInTheDocument();
        expect(
            screen.getByText('456 Health Ave, Wellness City, WC 67890'),
        ).toBeInTheDocument();
    });

    it('displays a badge for missing fields', () => {
        const incompletePractitioner: Practitioner = {
            resourceType: 'Practitioner',
            id: 'practitioner-2',
            // Missing name, gender, and address
        };

        render(<PractitionerCard practitioner={incompletePractitioner} />);

        expect(screen.getByText('ID:')).toBeInTheDocument();
        expect(screen.getByText('practitioner-2')).toBeInTheDocument();
        expect(screen.getByText('Name:')).toBeInTheDocument();
        expect(screen.getByText('Missing')).toBeInTheDocument();
    });
});
