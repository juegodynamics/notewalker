import React from 'react';
import {Card, CardContent, Typography, Grid} from '@mui/material';
import {CarePlan} from 'fhir/r4';
import MissingFieldBadge from './Badge';

interface CarePlanCardProps {
    carePlan: CarePlan;
}

const CarePlanCard: React.FC<CarePlanCardProps> = ({carePlan}) => {
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
                    Care Plan Details
                </Typography>
                <Grid container spacing={1}>
                    {renderField('ID', carePlan.id)}
                    {renderField('Status', carePlan.status)}
                    {renderField('Intent', carePlan.intent)}
                    {renderField('Title', carePlan.title)}
                    {renderField('Description', carePlan.description)}
                    {renderField('Subject', carePlan.subject?.reference)}
                    {renderField('Start', carePlan.period?.start)}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CarePlanCard;
