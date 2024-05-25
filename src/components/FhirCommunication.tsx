import React from 'react';
import {Typography, Grid} from '@mui/material';
import {PatientCommunication} from 'fhir/r4';

interface FhirCommunicationProps {
    communication: PatientCommunication[];
}

const FhirCommunication: React.FC<FhirCommunicationProps> = ({
    communication,
}) => (
    <>
        {communication && communication.length > 0 && (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Languages</Typography>
                    {communication.map((comm, index) => (
                        <Typography variant="body2" key={index}>
                            {comm.language.text}
                        </Typography>
                    ))}
                </Grid>
            </Grid>
        )}
    </>
);

export default FhirCommunication;
