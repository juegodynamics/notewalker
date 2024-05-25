import React from 'react';
import {Grid, Typography} from '@mui/material';
import {ContactPoint} from 'fhir/r4';

interface FhirTelecomProps {
    telecom: ContactPoint[];
}

const FhirTelecom: React.FC<FhirTelecomProps> = ({telecom}) => (
    <>
        {telecom?.map((contact, index) => (
            <Grid item xs={12} sm={6} key={index}>
                <Typography variant="subtitle1">{contact.system}</Typography>
                <Typography variant="body2">{contact.value}</Typography>
            </Grid>
        ))}
    </>
);

export default FhirTelecom;
