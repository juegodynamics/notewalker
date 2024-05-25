import React from 'react';
import {Card, CardContent, Typography, Grid} from '@mui/material';
import {Procedure} from 'fhir/r4';
import MissingFieldBadge from './Badge';

interface ProcedureCardProps {
    procedure: Procedure;
}

/**
 * ProcedureCard component
 *
 * This component renders a card with details about a Procedure FHIR resource.
 * It displays various fields from the Procedure resource and uses a badge to
 * indicate any missing required fields.
 *
 * @param {Object} props - The component props
 * @param {Procedure} props.procedure - The Procedure resource to display
 * @returns {JSX.Element} The rendered component
 */
const ProcedureCard: React.FC<ProcedureCardProps> = ({procedure}) => {
    // Function to render a field with a label and value
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
                    Procedure Details
                </Typography>
                <Grid container spacing={1}>
                    {renderField('ID', procedure.id)}
                    {renderField('Status', procedure.status)}
                    {renderField('Code', procedure.code?.coding?.[0]?.display)}
                    {renderField('Subject', procedure.subject?.reference)}
                    {renderField(
                        'Performed Date/Time',
                        procedure.performedDateTime,
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProcedureCard;
