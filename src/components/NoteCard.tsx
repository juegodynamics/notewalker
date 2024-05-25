import React from 'react';
import {Card, CardContent, Typography, Box} from '@mui/material';
import {Note} from 'types';
import {format} from 'date-fns';

interface NoteCardProps {
    note: Note;
    searchTerm: string;
}

/**
 * NoteCard component
 *
 * This component renders a card with details about a note. It displays the provider's name,
 * the creation date, and the note text with highlighted search terms.
 *
 * @param {Object} props - The component props
 * @param {Note} props.note - The note to display
 * @param {string} props.searchTerm - The search term to highlight in the note text
 * @returns {JSX.Element} The rendered component
 */
const NoteCard: React.FC<NoteCardProps> = ({note, searchTerm}) => {
    const formattedDate = format(new Date(note.creation_date), 'PPP');

    return (
        <Card
            variant="outlined"
            sx={{
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)', // Adjust hover color as needed
                },
            }}
        >
            <CardContent sx={{flex: '1 1 auto', overflow: 'scroll'}}>
                <Typography variant="h6" gutterBottom>
                    {note.provider_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {formattedDate}
                </Typography>
                <Box sx={{overflowY: 'auto', height: 'calc(100% - 48px)'}}>
                    <Typography variant="body1">
                        <NoteHighlight
                            text={note.text}
                            searchTerm={searchTerm}
                        />
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

interface NoteHighlightProps {
    text: string;
    searchTerm: string;
}

/**
 * NoteHighlight component
 *
 * This component highlights occurrences of the search term in the provided text.
 *
 * @param {Object} props - The component props
 * @param {string} props.text - The text to search within
 * @param {string} props.searchTerm - The search term to highlight
 * @returns {JSX.Element} The rendered component
 */
const NoteHighlight: React.FC<NoteHighlightProps> = ({text, searchTerm}) => {
    if (!searchTerm) return <>{text}</>;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === searchTerm.toLowerCase() ? (
                    <span
                        key={index}
                        style={{backgroundColor: 'yellow', color: 'black'}}
                    >
                        {part}
                    </span>
                ) : (
                    part
                ),
            )}
        </>
    );
};

export default NoteCard;
