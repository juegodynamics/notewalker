import React from 'react';
import {Card, CardContent, Typography, Grid} from '@mui/material';
import {Encounter} from 'fhir/r4';
import MissingFieldBadge from './Badge';

interface EncounterCardProps {
    encounter: Encounter;
}

const EncounterCard: React.FC<EncounterCardProps> = ({encounter}) => {
    const renderField = (label: string, value: any) => (
        <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
                <strong>{label}:</strong> {value || <MissingFieldBadge />}
            </Typography>
        </Grid>
    );

    return (
        <Card variant="outlined" sx={{mb: 2}}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Encounter Details
                </Typography>
                <Grid container spacing={1}>
                    {renderField('ID', encounter.id)}
                    {renderField('Status', encounter.status)}
                    {renderField('Class', encounter.class?.code)}
                    {renderField('Subject', encounter.subject?.reference)}
                    {renderField('Start', encounter.period?.start)}
                    {renderField('End', encounter.period?.end)}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default EncounterCard;