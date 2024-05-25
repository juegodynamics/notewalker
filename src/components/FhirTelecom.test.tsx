import React from 'react';
import {render, screen} from '@testing-library/react';
import FhirTelecom from './FhirTelecom';
import {ContactPoint} from 'fhir/r4';

const mockTelecom: ContactPoint[] = [
    {
        system: 'phone',
        value: '123-456-7890',
    },
    {
        system: 'email',
        value: 'test@example.com',
    },
];

describe('FhirTelecom', () => {
    it('renders without crashing and displays the telecom information', () => {
        render(<FhirTelecom telecom={mockTelecom} />);

        expect(screen.getByText('phone')).toBeInTheDocument();
        expect(screen.getByText('123-456-7890')).toBeInTheDocument();
        expect(screen.getByText('email')).toBeInTheDocument();
        expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    it('renders nothing when no telecom data is provided', () => {
        render(<FhirTelecom telecom={[]} />);

        expect(screen.queryByText('phone')).not.toBeInTheDocument();
        expect(screen.queryByText('email')).not.toBeInTheDocument();
    });
});
