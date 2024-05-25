import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import AdvancedSearchDialog from './AdvancedSearchDialog';
import {Criterion} from 'types';
import {ResourceType, Operator} from 'enums';
import {Bundle} from 'fhir/r4';

const mockBundles: Bundle[] = [
    {
        resourceType: 'Bundle',
        entry: [
            {
                resource: {
                    resourceType: 'Patient',
                    id: 'patient-1',
                    name: [{text: 'John Doe'}],
                    gender: 'male',
                    birthDate: '1980-01-01',
                    address: [{text: '123 Main St'}],
                },
            },
        ],
        type: 'document',
    },
];

const mockCriteria: Criterion[] = [
    {
        resourceType: ResourceType.Patient,
        field: 'name',
        operator: Operator.Equals,
        value: 'John Doe',
    },
];

describe('AdvancedSearchDialog Component', () => {
    it('renders the dialog with initial criteria', () => {
        render(
            <AdvancedSearchDialog
                open={true}
                onClose={jest.fn()}
                onSearch={jest.fn()}
                bundles={mockBundles}
                criteria={mockCriteria}
                setCriteria={jest.fn()}
            />,
        );

        // Check that the initial criterion is displayed
        expect(screen.getByDisplayValue('Patient')).toBeInTheDocument();
        expect(screen.getByDisplayValue('name')).toBeInTheDocument();
        expect(screen.getByDisplayValue('=')).toBeInTheDocument();
        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    });

    it('calls onSearch with the criteria when the Search button is clicked', () => {
        const handleSearch = jest.fn();
        const handleClose = jest.fn();
        const setCriteria = jest.fn();
        render(
            <AdvancedSearchDialog
                open={true}
                onClose={handleClose}
                onSearch={handleSearch}
                bundles={mockBundles}
                criteria={mockCriteria}
                setCriteria={setCriteria}
            />,
        );

        fireEvent.click(screen.getByText('Search'));

        expect(handleSearch).toHaveBeenCalledWith(mockCriteria);
        expect(handleClose).toHaveBeenCalled();
    });

    it('adds a new criterion when Add Criterion button is clicked', () => {
        const setCriteria = jest.fn();
        render(
            <AdvancedSearchDialog
                open={true}
                onClose={jest.fn()}
                onSearch={jest.fn()}
                bundles={mockBundles}
                criteria={mockCriteria}
                setCriteria={setCriteria}
            />,
        );

        fireEvent.click(screen.getByText('Add Criterion'));

        expect(setCriteria).toHaveBeenCalledWith([
            ...mockCriteria,
            {
                resourceType: ResourceType.Patient,
                field: '',
                operator: Operator.Equals,
                value: '',
            },
        ]);
    });

    it('updates a criterion field when changed', () => {
        const setCriteria = jest.fn();
        render(
            <AdvancedSearchDialog
                open={true}
                onClose={jest.fn()}
                onSearch={jest.fn()}
                bundles={mockBundles}
                criteria={mockCriteria}
                setCriteria={setCriteria}
            />,
        );

        fireEvent.change(screen.getByLabelText('Field'), {
            target: {value: 'gender'},
        });

        expect(setCriteria).toHaveBeenCalledWith([
            {
                ...mockCriteria[0],
                field: 'gender',
            },
        ]);
    });
});
