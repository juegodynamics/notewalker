import React from 'react';
import {Card, CardContent, Typography, Grid, Chip} from '@mui/material';
import {Practitioner} from 'fhir/r4';
import MissingFieldBadge from './Badge'; // Import the MissingFieldBadge component

interface PractitionerCardProps {
    practitioner: Practitioner;
}

const PractitionerCard: React.FC<PractitionerCardProps> = ({practitioner}) => {
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
                    Practitioner Details
                </Typography>
                <Grid container spacing={1}>
                    {renderField('ID', practitioner.id)}
                    {renderField(
                        'Name',
                        practitioner.name
                            ? practitioner.name.map((n) => n.text).join(', ')
                            : 'Unknown',
                    )}
                    {renderField('Gender', practitioner.gender)}
                    {renderField(
                        'Address',
                        practitioner.address
                            ? practitioner.address.map((a) => a.text).join(', ')
                            : 'Unknown',
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PractitionerCard;
