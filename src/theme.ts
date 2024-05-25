import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9', // Light blue for primary color
        },
        secondary: {
            main: '#f48fb1', // Light pink for secondary color
        },
        background: {
            default: '#121212', // Dark background
            paper: '#1d1d1d', // Slightly lighter for paper components
        },
        text: {
            primary: '#ffffff', // White text
            secondary: '#b0bec5', // Light gray text for secondary content
        },
    },
    typography: {
        h6: {
            fontWeight: 600,
        },
    },
});

export default theme;
