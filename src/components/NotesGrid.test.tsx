import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import NotesGrid from './NotesGrid';
import {Note} from 'types';

const mockNotes: Note[] = [
    {
        id: 1,
        provider_name: 'Dr. John Doe',
        hospital_name: 'General Hospital',
        creation_date: '2023-01-01',
        patient_id: 1,
        text: 'This is a sample note text for testing purposes.',
        tags: ['Filter 1'],
    },
    {
        id: 2,
        provider_name: 'Dr. Jane Smith',
        hospital_name: 'City Hospital',
        creation_date: '2023-02-01',
        patient_id: 2,
        text: 'Another example of a note text for testing.',
        tags: ['Filter 2'],
    },
];

describe('NotesGrid', () => {
    it('renders without crashing and displays notes', () => {
        render(
            <NotesGrid
                notes={mockNotes}
                searchTerm=""
                onNoteSelect={jest.fn()}
                criteria={[]}
                onDeleteCriterion={() => null}
            />,
        );

        expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
        expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument();
    });

    it('filters notes based on the search term', () => {
        render(
            <NotesGrid
                notes={mockNotes}
                searchTerm="John"
                onNoteSelect={jest.fn()}
                criteria={[]}
            />,
        );

        expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Dr. Jane Smith')).not.toBeInTheDocument();
    });

    it('filters notes based on selected filters', () => {
        render(
            <NotesGrid
                notes={mockNotes}
                searchTerm=""
                onNoteSelect={jest.fn()}
                criteria={[]}
            />,
        );

        fireEvent.click(screen.getByText('Filter 1'));
        expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Dr. Jane Smith')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('Filter 2'));
        expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
        expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument();
    });

    it('calls onNoteSelect when a note is clicked', () => {
        const onNoteSelectMock = jest.fn();
        render(
            <NotesGrid
                notes={mockNotes}
                searchTerm=""
                onNoteSelect={onNoteSelectMock}
                criteria={[]}
            />,
        );

        fireEvent.click(screen.getByText('Dr. John Doe'));
        expect(onNoteSelectMock).toHaveBeenCalledWith(1);
    });
});
