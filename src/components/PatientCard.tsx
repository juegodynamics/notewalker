import React from 'react';
import {Card, CardContent, Typography, Grid} from '@mui/material';
import {Patient} from 'fhir/r4';
import MissingFieldBadge from './Badge'; // Import the MissingFieldBadge component

interface PatientCardProps {
    patient: Patient;
}

/**
 * PatientCard component
 *
 * This component renders a card with details about a Patient FHIR resource.
 * It displays various fields from the Patient resource and uses a badge to
 * indicate any missing required fields.
 *
 * @param {Object} props - The component props
 * @param {Patient} props.patient - The Patient resource to display
 * @returns {JSX.Element} The rendered component
 */
const PatientCard: React.FC<PatientCardProps> = ({patient}) => {
    // Function to render a field with a label and value
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
