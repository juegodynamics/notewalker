import React, {useState} from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Container,
    Paper,
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Stack,
} from '@mui/material';
import {ArrowBack, Edit, Delete} from '@mui/icons-material';
import {useNavigate, useParams} from 'react-router-dom';
import {Note} from 'types';
import {NoteExtractions} from 'data/extractions';
import {Bundle} from 'fhir/r4';
import {getResourceCard} from 'utils/getResourceCard';

const DetailView: React.FC<{notes: Note[]}> = ({notes}) => {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const note = notes.find((note) => `${note.id}` === id);
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const bundle: Bundle | null = id ? NoteExtractions[parseInt(id) - 1] : null;

    if (!note) return <Typography variant="h6">Note not found</Typography>;

    const handleBack = () => {
        navigate('/notewalker');
    };

    const generateTags = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                'https://api.openai.com/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: 'gpt-4o', // Use the appropriate model ID
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a helpful assistant.',
                            },
                            {
                                role: 'user',
                                content: `Generate a JSON-formatted array of tags for the following note: ${note.text}. The response should be just raw json, no backticks or markdown formatting.`,
                            },
                        ],
                        // max_tokens: 50,
                        temperature: 0.7,
                    }),
                },
            );
            const data = await response.json();
            let tagsText = data.choices[0].message.content.trim();

            // Remove the triple backticks if present
            if (tagsText.startsWith('```') && tagsText.endsWith('```')) {
                console.log('removing backticks');
                tagsText = tagsText.slice(3, -3).trim();
            }

            console.log(tagsText);

            // Parse the JSON string into an array
            const tagsArray = JSON.parse(tagsText);
            setTags(tagsArray);
        } catch (error) {
            console.error('Error generating tags:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleBack}
                        aria-label="back"
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        {note.provider_name}
                    </Typography>
                    <IconButton color="inherit" aria-label="edit">
                        <Edit />
                    </IconButton>
                    <IconButton color="inherit" aria-label="delete">
                        <Delete />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box display="flex" mt={2}>
                <Paper
                    elevation={3}
                    style={{flex: 1, padding: '16px', minHeight: '80vh'}}
                >
                    <Typography variant="h4" gutterBottom>
                        {note.provider_name}
                    </Typography>
                    <Typography variant="body1">{note.text}</Typography>
                </Paper>
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
