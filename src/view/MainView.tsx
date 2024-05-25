import React, {useState} from 'react';
import {
    Container,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import SearchBar from 'components/SearchBar';
import NotesGrid from 'components/NotesGrid';
import {useNavigate} from 'react-router-dom';
import AdvancedSearchDialog from 'components/AdvancedSearchDialog'; // Import the dialog component
import {Criterion, Note} from 'types';
import {NoteExtractions} from 'data/extractions';
import {searchBundles} from 'utils/searchBundles';

const MainView: React.FC<{notes: Note[]}> = ({notes}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [filteredNotes, setFilteredNotes] = useState(notes);
    const navigate = useNavigate();

    const handleNoteSelect = (id: number) => {
        navigate(`/notewalker/note/${id}`);
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleAdvancedSearch = (criteria: Criterion[]) => {
        // Implement the logic to filter notes based on conditions here
        console.log('Advanced Search Conditions:', criteria);

        // Mock: Assume each note has a FHIR Bundle in its structuredData property
        const bundles = notes.map((note) => NoteExtractions[note.id - 1]);

        const matchingIndices = searchBundles(bundles, criteria);

        // Filter notes based on matching indices
        const filtered = notes.filter((_, index) =>
            matchingIndices.includes(index),
        );
        setFilteredNotes(filtered);
    };

    return (
        <Container>
            <SearchBar onSearch={setSearchTerm} />
            <Button
                variant="contained"
                color="primary"
                onClick={handleDialogOpen}
                style={{marginBottom: '16px'}}
            >
                Advanced Search
            </Button>
            <NotesGrid
                notes={filteredNotes.filter((note) =>
                    note.text.toLowerCase().includes(searchTerm?.toLowerCase()),
                )}
                searchTerm={searchTerm}
                onNoteSelect={handleNoteSelect}
            />
            <AdvancedSearchDialog
                open={isDialogOpen}
                onClose={handleDialogClose}
                onSearch={handleAdvancedSearch}
                bundles={notes.map((note) => NoteExtractions[note.id - 1])}
            />
        </Container>
    );
};

export default MainView;
