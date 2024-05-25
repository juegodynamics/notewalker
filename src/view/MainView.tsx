import {Button, Container, Stack} from '@mui/material';
import AdvancedSearchDialog from 'components/AdvancedSearchDialog';
import NotesGrid from 'components/NotesGrid';
import SearchBar from 'components/SearchBar';
import {NoteExtractions} from 'data/extractions';
import {mockPatients} from 'data/patients';
import {Bundle} from 'fhir/r4';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Criterion, Note} from 'types';
import {
    createPractitionerFromNote,
    formatNoteToFhirComposition,
    formatPatientToFhir,
} from 'utils/formatters';
import {searchBundles} from 'utils/searchBundles';

const MainView: React.FC<{notes: Note[]}> = ({notes}) => {
    // State to store the current search term
    const [searchTerm, setSearchTerm] = useState('');
    // State to control the visibility of the advanced search dialog
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // State to store the filtered notes based on the search term and criteria
    const [filteredNotes, setFilteredNotes] = useState(notes);
    // State to store the criteria in advanced search
    const [criteria, setCriteria] = React.useState<Criterion[]>([]);
    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Handle note selection and navigate to the note detail view
    const handleNoteSelect = (id: number) => {
        navigate(`/notewalker/note/${id}`);
    };

    // Open the advanced search dialog
    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    // Close the advanced search dialog
    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    // Handle advanced search with given criteria
    const handleAdvancedSearch = (criteria: Criterion[]) => {
        console.log('Advanced Search Conditions:', criteria);

        // Map each note to its corresponding FHIR Bundle
        const bundles = notes.map((note) => {
            const extractedBundle = NoteExtractions[note.id - 1];
            const patient = mockPatients[note.patient_id - 1];

            const bundle: Bundle = {
                entry: [
                    ...(extractedBundle?.entry || []),
                    {resource: formatPatientToFhir(patient)},
                    {resource: formatNoteToFhirComposition(note)},
                    {resource: createPractitionerFromNote(note)},
                ],
            } as Bundle;

            return bundle;
        });

        // Get matching indices based on the search criteria
        const matchingIndices = searchBundles(bundles, criteria);

        console.log('Matching indices:', matchingIndices);

        // Filter notes based on matching indices
        const filtered = notes.filter((_, index) =>
            matchingIndices.includes(index),
        );
        setFilteredNotes(filtered);
    };

    const handleRemoveCriterion = (index: number) => {
        // @todo: implement single criterion removal
        // currently removing one removes all, on purpose
        //
        // setCriteria((prevCriteria) => {
        //     const newCriteria = [...prevCriteria];
        //     newCriteria.splice(index, 1);
        //     return newCriteria;
        // });

        setCriteria([]);
        setFilteredNotes(notes);
    };

    return (
        <Container>
            <Stack>
                {/* Search bar to filter notes by text */}
                <SearchBar onSearch={setSearchTerm} />
                {/* Button to open the advanced search dialog */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDialogOpen}
                    style={{marginBottom: '16px'}}
                >
                    Advanced Search
                </Button>
            </Stack>
            {/* Grid to display notes, filtered by the search term */}
            <NotesGrid
                notes={filteredNotes.filter(
                    (note) =>
                        !searchTerm ||
                        note.text
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()),
                )}
                searchTerm={searchTerm}
                onNoteSelect={handleNoteSelect}
                criteria={criteria}
                onDeleteCriterion={handleRemoveCriterion}
            />
            {/* Advanced search dialog */}
            <AdvancedSearchDialog
                open={isDialogOpen}
                onClose={handleDialogClose}
                onSearch={handleAdvancedSearch}
                bundles={notes.map((note) => {
                    const extractedBundle = NoteExtractions[note.id - 1];
                    const patient = mockPatients[note.patient_id - 1];

                    const bundle: Bundle = {
                        entry: [
                            ...(extractedBundle?.entry || []),
                            {resource: formatPatientToFhir(patient)},
                            {resource: formatNoteToFhirComposition(note)},
                            {resource: createPractitionerFromNote(note)},
                        ],
                    } as Bundle;

                    return bundle;
                })}
                criteria={criteria}
                setCriteria={setCriteria}
            />
        </Container>
    );
};

export default MainView;
