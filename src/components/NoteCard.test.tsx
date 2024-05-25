import React from 'react';
import {render, screen} from '@testing-library/react';
import NoteCard from './NoteCard';
import {Note} from 'types';

const mockNote: Note = {
    id: 1,
    provider_name: 'Dr. John Doe',
    hospital_name: 'General Hospital',
    creation_date: '2023-01-01',
    patient_id: 1,
    text: 'This is a sample note text for testing purposes.',
};

describe('NoteCard', () => {
    it('renders without crashing and displays note details', () => {
        render(<NoteCard note={mockNote} searchTerm="" />);

        expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
        expect(screen.getByText('2023-01-01')).toBeInTheDocument();
        expect(
            screen.getByText(
                'This is a sample note text for testing purposes.',
            ),
        ).toBeInTheDocument();
    });

    it('highlights the search term in the note text', () => {
        render(<NoteCard note={mockNote} searchTerm="sample" />);

        expect(screen.getByText('sample')).toHaveStyle(
            'background-color: yellow',
        );
    });

    it('renders note text without highlighting when search term is empty', () => {
        render(<NoteCard note={mockNote} searchTerm="" />);

        expect(
            screen.getByText(
                'This is a sample note text for testing purposes.',
            ),
        ).toBeInTheDocument();
        expect(screen.queryByText('sample')).not.toHaveStyle(
            'background-color: yellow',
        );
    });
});
