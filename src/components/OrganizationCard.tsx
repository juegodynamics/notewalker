import React from 'react';
import {Card, CardContent, Typography, Grid} from '@mui/material';
import {Organization} from 'fhir/r4';
import MissingFieldBadge from './Badge';

interface OrganizationCardProps {
    organization: Organization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({organization}) => {
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
                    Organization Details
                </Typography>
                <Grid container spacing={1}>
                    {renderField('ID', organization.id)}
                    {renderField('Name', organization.name)}
                    {renderField(
                        'Type',
                        organization.type?.[0]?.coding?.[0]?.display,
                    )}
                    {renderField(
                        'Address',
                        organization.address
                            ? organization.address.map((a) => a.text).join(', ')
                            : 'Unknown',
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default OrganizationCard;
