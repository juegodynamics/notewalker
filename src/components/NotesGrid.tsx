import React, {useState} from 'react';
import {Grid, Chip, Box} from '@mui/material';
import NoteCard from './NoteCard';
import {Note} from 'types';

interface NotesGridProps {
    notes: Note[];
    searchTerm: string;
    onNoteSelect: (id: number) => void;
}

const NotesGrid: React.FC<NotesGridProps> = ({
    notes,
    searchTerm,
    onNoteSelect,
}) => {
    const [filters, setFilters] = useState<string[]>([]);

    const filteredNotes = notes.filter(
        (note) =>
            (note.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.provider_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) &&
            (filters.length === 0 ||
                filters.every((filter) => note.tags?.includes(filter)))
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
            <Box display="flex" justifyContent="center" mb={2}>
                <Chip
                    label="Filter 1"
                    onClick={() => handleFilterChange('Filter 1')}
                />
                <Chip
                    label="Filter 2"
                    onClick={() => handleFilterChange('Filter 2')}
                />
                <Chip
                    label="Filter 3"
                    onClick={() => handleFilterChange('Filter 3')}
                />
            </Box>
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
