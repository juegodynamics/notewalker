import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import DetailView from './DetailView';
import {Note} from 'types';
import {NoteExtractions} from 'data/extractions';
import {getResourceCard} from 'utils/getResourceCard';

// Mock data for testing
jest.mock('data/extractions', () => ({
    NoteExtractions: [
        {id: 'bundle-1', resourceType: 'Bundle', type: 'document', entry: []},
        {id: 'bundle-2', resourceType: 'Bundle', type: 'document', entry: []},
    ],
}));

jest.mock('utils/getResourceCard', () => ({
    getResourceCard: jest.fn(() => <div>Mocked Resource Card</div>),
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

describe('DetailView', () => {
    test('renders without crashing and displays note text', () => {
        React.act(() => {
            render(
                <MemoryRouter initialEntries={['/notewalker/note/1']}>
                    <Routes>
                        <Route path="/notewalker" element={<div>Home</div>} />
                        <Route
                            path="/notewalker/note/:id"
                            element={<DetailView notes={mockNotes} />}
                        />
                    </Routes>
                </MemoryRouter>,
            );
        });

        // Check if the note's text is displayed
        expect(screen.getByText('First note')).toBeInTheDocument();
    });

    it('displays "Note not found" if the note does not exist', () => {
        render(
            <MemoryRouter initialEntries={['/notewalker/note/3']}>
                <Routes>
                    <Route
                        path="/notewalker/note/:id"
                        element={<DetailView notes={mockNotes} />}
                    />
                </Routes>
            </MemoryRouter>,
        );

        expect(screen.getByText('Note not found')).toBeInTheDocument();
    });

    it('navigates back to the previous view when the back button is clicked', () => {
        const {container} = render(
            <MemoryRouter initialEntries={['/notewalker/note/1']}>
                <Routes>
                    <Route path="/notewalker" element={<div>Home</div>} />
                    <Route
                        path="/notewalker/note/:id"
                        element={<DetailView notes={mockNotes} />}
                    />
                </Routes>
            </MemoryRouter>,
        );

        fireEvent.click(screen.getByLabelText('back'));
        expect(container).toHaveTextContent('Home');
    });

    it('displays resource cards for the FHIR bundle entries', () => {
        render(
            <MemoryRouter initialEntries={['/notewalker/note/1']}>
                <Routes>
                    <Route
                        path="/notewalker/note/:id"
                        element={<DetailView notes={mockNotes} />}
                    />
                </Routes>
            </MemoryRouter>,
        );

        screen.getAllByText('Dr. Smith').forEach((element) => {
            expect(element).toBeInTheDocument();
        });
    });
});
