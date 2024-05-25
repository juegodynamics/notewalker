import React from 'react';
import {render, screen} from '@testing-library/react';
import FhirCommunication from './FhirCommunication';
import {PatientCommunication} from 'fhir/r4';

const mockCommunication: PatientCommunication[] = [
    {
        language: {
            text: 'English',
        },
    },
    {
        language: {
            text: 'Spanish',
        },
    },
];

describe('FhirCommunication', () => {
    it('renders without crashing and displays the languages', () => {
        render(<FhirCommunication communication={mockCommunication} />);

        expect(screen.getByText('Languages')).toBeInTheDocument();
        expect(screen.getByText('English')).toBeInTheDocument();
        expect(screen.getByText('Spanish')).toBeInTheDocument();
    });

    it('renders nothing when no communication data is provided', () => {
        render(<FhirCommunication communication={[]} />);

        expect(screen.queryByText('Languages')).not.toBeInTheDocument();
    });
});
