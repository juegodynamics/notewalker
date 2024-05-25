import React from 'react';
import {Card, CardContent, Typography, Grid, Chip} from '@mui/material';
import {Patient} from 'fhir/r4';
import MissingFieldBadge from './Badge'; // Import the MissingFieldBadge component

interface PatientCardProps {
    patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({patient}) => {
    const renderField = (label: string, value: any) => {
        return (
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2">
                    <strong>{label}:</strong> {value || <MissingFieldBadge />}
                </Typography>
            </Grid>
        );
    };

    return (
        <Card variant="outlined" sx={{mb: 2}}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Patient Details
                </Typography>
                <Grid container spacing={1}>
                    {renderField('ID', patient.id)}
                    {renderField(
                        'Name',
                        patient.name
                            ? patient.name.map((n) => n.text).join(', ')
                            : 'Unknown',
                    )}
                    {renderField('Gender', patient.gender)}
                    {renderField('Birth Date', patient.birthDate)}
                    {renderField(
                        'Address',
                        patient.address
                            ? patient.address.map((a) => a.text).join(', ')
                            : 'Unknown',
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PatientCard;
