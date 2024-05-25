import React from 'react';
import {Chip} from '@mui/material';

const MissingFieldBadge: React.FC = () => {
    return <Chip label="Missing" color="error" size="small" />;
};

export default MissingFieldBadge;
