import React, {useState} from 'react';
import {Grid, Chip, Box} from '@mui/material';
import NoteCard from './NoteCard';
import {Criterion, Note} from 'types';
import ChipArray from './ChipArray';

interface NotesGridProps {
    notes: Note[];
    searchTerm: string;
    onNoteSelect: (id: number) => void;
    criteria: Criterion[];
    onDeleteCriterion?: (index: number) => void;
}

const NotesGrid: React.FC<NotesGridProps> = ({
    notes,
    searchTerm,
    onNoteSelect,
    criteria,
    onDeleteCriterion,
}) => {
    const [filters, setFilters] = useState<string[]>([]);

    const filteredNotes = notes.filter(
        (note) =>
            (note.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.provider_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) &&
            (filters.length === 0 ||
                filters.every((filter) => note.tags?.includes(filter))),
    );

    const handleFilterChange = (filter: string) => {
        setFilters((prevFilters) => {
            if (prevFilters.includes(filter)) {
                return prevFilters.filter((f) => f !== filter);
            } else {
                return [...prevFilters, filter];
            }
        });
    };

    return (
        <Box>
            <ChipArray
                criteria={criteria}
                onDelete={(index) => {
                    onDeleteCriterion?.(index);
                }}
            />
            <Grid container spacing={2}>
                {filteredNotes.map((note) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={note.id}
                        onClick={() => onNoteSelect(note.id)}
                    >
                        <NoteCard note={note} searchTerm={searchTerm} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default NotesGrid;
