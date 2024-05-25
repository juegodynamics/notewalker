import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import MainView from './MainView';
import {Note} from 'types';
import {NoteExtractions} from 'data/extractions';
import {searchBundles} from 'utils/searchBundles';

jest.mock('data/extractions', () => ({
    NoteExtractions: [
        // Mock FHIR Bundles for testing
        {id: 'bundle-1', resourceType: 'Bundle', type: 'document', entry: []},
        {id: 'bundle-2', resourceType: 'Bundle', type: 'document', entry: []},
    ],
}));

jest.mock('utils/searchBundles', () => ({
    searchBundles: jest.fn(),
}));

const mockNotes: Note[] = [
    {
        id: 1,
        provider_name: 'Dr. Smith',
        hospital_name: 'City Hospital',
        creation_date: '2023-01-01',
        patient_id: 101,
        text: 'First note',
        tags: ['urgent'],
    },
    {
        id: 2,
        provider_name: 'Dr. Jones',
        hospital_name: 'County Hospital',
        creation_date: '2023-02-01',
        patient_id: 102,
        text: 'Second note',
        tags: ['follow-up'],
    },
];

describe('MainView', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <MainView notes={mockNotes} />
            </MemoryRouter>,
        );
        expect(screen.getByText('Advanced Search')).toBeInTheDocument();
    });

    it('filters notes based on search term', () => {
        render(
            <MemoryRouter>
                <MainView notes={mockNotes} />
            </MemoryRouter>,
        );
        fireEvent.change(screen.getByPlaceholderText('Search...'), {
            target: {value: 'First'},
        });
        expect(screen.getByText('First note')).toBeInTheDocument();
        expect(screen.queryByText('Second note')).not.toBeInTheDocument();
    });

    it('opens and closes the advanced search dialog', () => {
        render(
            <MemoryRouter>
                <MainView notes={mockNotes} />
            </MemoryRouter>,
        );
        fireEvent.click(screen.getByText('Advanced Search'));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('filters notes based on advanced search criteria', () => {
        (searchBundles as jest.Mock).mockReturnValue([0]); // Mock the search result to match the first note

        render(
            <MemoryRouter>
                <MainView notes={mockNotes} />
            </MemoryRouter>,
        );

        fireEvent.click(screen.getByText('Advanced Search'));
        fireEvent.click(screen.getByText('Search'));

        expect(screen.getByText('First note')).toBeInTheDocument();
        expect(screen.queryByText('Second note')).not.toBeInTheDocument();
    });
});
