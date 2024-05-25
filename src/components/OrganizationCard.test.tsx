import React from 'react';
import {render, screen} from '@testing-library/react';
import OrganizationCard from './OrganizationCard';
import {Organization} from 'fhir/r4';

const mockOrganization: Organization = {
    resourceType: 'Organization',
    id: 'org-1',
    name: 'Health Organization',
    type: [
        {
            coding: [
                {
                    display: 'Healthcare Provider',
                },
            ],
        },
    ],
    address: [
        {
            text: '123 Health St, Healthcare City, HC 12345',
        },
    ],
};

describe('OrganizationCard', () => {
    it('renders without crashing and displays organization details', () => {
        render(<OrganizationCard organization={mockOrganization} />);

        expect(screen.getByText('Organization Details')).toBeInTheDocument();
        expect(screen.getByText('ID:')).toBeInTheDocument();
        expect(screen.getByText('org-1')).toBeInTheDocument();
        expect(screen.getByText('Name:')).toBeInTheDocument();
        expect(screen.getByText('Health Organization')).toBeInTheDocument();
        expect(screen.getByText('Type:')).toBeInTheDocument();
        expect(screen.getByText('Healthcare Provider')).toBeInTheDocument();
        expect(screen.getByText('Address:')).toBeInTheDocument();
        expect(
            screen.getByText('123 Health St, Healthcare City, HC 12345'),
        ).toBeInTheDocument();
    });

    it('displays a badge for missing fields', () => {
        const incompleteOrganization: Organization = {
            resourceType: 'Organization',
            id: 'org-2',
            // Missing name, type, and address
        };

        render(<OrganizationCard organization={incompleteOrganization} />);

        expect(screen.getByText('ID:')).toBeInTheDocument();
        expect(screen.getByText('org-2')).toBeInTheDocument();
        expect(screen.getByText('Name:')).toBeInTheDocument();
        expect(screen.getByText('Missing')).toBeInTheDocument();
    });
});
