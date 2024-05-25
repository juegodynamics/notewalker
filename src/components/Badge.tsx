import React from 'react';
import {Chip} from '@mui/material';

/**
 * MissingFieldBadge component
 *
 * This component renders a small badge using Material-UI's Chip component.
 * The badge is labeled "Missing" and is styled with a red color to indicate
 * an error or missing required field.
 *
 * @returns {JSX.Element} The rendered component
 */
const MissingFieldBadge: React.FC = () => {
    return <Chip label="Missing" color="error" size="small" />;
};

export default MissingFieldBadge;
