import React from 'react';
import {Card, CardContent, Typography, Box} from '@mui/material';
import {Note} from 'types';

const NoteCard: React.FC<{note: Note; searchTerm: string}> = ({
    note,
    searchTerm,
}) => {
    return (
        <Card
            variant="outlined"
            sx={{height: 300, display: 'flex', flexDirection: 'column'}}
        >
            <CardContent sx={{flex: '1 1 auto', overflow: 'scroll'}}>
                <Typography variant="h5" gutterBottom>
                    {note.provider_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {note.creation_date}
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

const NoteHighlight: React.FC<{text: string; searchTerm: string}> = ({
    text,
    searchTerm,
}) => {
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
                )
            )}
        </>
    );
};

export default NoteCard;
