import React from 'react';
import {render, screen} from '@testing-library/react';
import FhirAddress from './FhirAddress';
import {Address} from 'fhir/r4';

const mockAddress: Address[] = [
    {
        line: ['123 Main St', 'Apt 4B'],
        city: 'Metropolis',
        state: 'NY',
        postalCode: '12345',
    },
];

describe('FhirAddress', () => {
    it('renders without crashing and displays the formatted address', () => {
        render(<FhirAddress address={mockAddress} />);

        expect(
            screen.getByText('123 Main St, Apt 4B, Metropolis, NY 12345'),
        ).toBeInTheDocument();
    });

    it('displays a default message when no address is available', () => {
        render(<FhirAddress address={[]} />);

        expect(screen.getByText('No address available')).toBeInTheDocument();
    });
});
