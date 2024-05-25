import {ArrowBack, Delete, Edit} from '@mui/icons-material';
import {
    AppBar,
    Box,
    Container,
    IconButton,
    Paper,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import {NoteExtractions} from 'data/extractions';
import {Bundle} from 'fhir/r4';
import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Note} from 'types';
import {getResourceCard} from 'utils/getResourceCard';

/**
 * DetailView component
 *
 * This component displays the detailed view of a selected note. It shows the
 * note's text and additional structured data from the corresponding FHIR bundle.
 * The user can navigate back to the main view @todo and annotate the note.
 *
 * @param {Object} props - The component props
 * @param {Note[]} props.notes - The list of notes to display
 * @returns {JSX.Element} The rendered component
 */
const DetailView: React.FC<{notes: Note[]}> = ({notes}) => {
    // Hook to navigate programmatically via browser URL
    const navigate = useNavigate();

    // Hook to get the note ID from the URL parameters
    const {id} = useParams<{id: string}>();

    // Find the note that matches the ID from the URL parameters
    const note = notes.find((note) => `${note.id}` === id);

    // Get the corresponding FHIR Bundle for the selected note
    const bundle: Bundle | null = id ? NoteExtractions[parseInt(id) - 1] : null;

    // If the note is not found, display a message
    if (!note) return <Typography variant="h6">Note not found</Typography>;

    // Handle the back navigation
    const handleBack = () => {
        navigate('/notewalker');
    };

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    {/* Back button to navigate to the previous view */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleBack}
                        aria-label="back"
                    >
                        <ArrowBack />
                    </IconButton>
                    {/* Display the provider name in the AppBar */}
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        {note.provider_name}
                    </Typography>
                    {/* Edit button (currently no functionality attached) */}
                    <IconButton color="inherit" aria-label="edit">
                        <Edit />
                    </IconButton>
                    {/* Delete button (currently no functionality attached) */}
                    <IconButton color="inherit" aria-label="delete">
                        <Delete />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box display="flex" mt={2}>
                {/* Main content area for the note text */}
                <Paper
                    elevation={3}
                    style={{flex: 1, padding: '16px', minHeight: '80vh'}}
                >
                    {/* Display the provider name as the heading */}
                    <Typography variant="h4" gutterBottom>
                        {note.provider_name}
                    </Typography>
                    {/* Display the note text */}
                    <Typography variant="body1">{note.text}</Typography>
                </Paper>
                {/* Sidebar for displaying FHIR Bundle entries */}
                <Paper
                    elevation={0}
                    style={{
                        width: '300px',
                        marginLeft: '16px',
                        padding: '16px',
                        maxHeight: '100vh',
                        overflow: 'scroll',
                    }}
                >
                    <Stack direction={'column'} spacing={1}>
                        {/* Render each FHIR resource entry as a card */}
                        {bundle?.entry?.map((entry, index) => (
                            <React.Fragment key={index}>
                                {getResourceCard(entry)}
                            </React.Fragment>
                        ))}
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
};

export default DetailView;
