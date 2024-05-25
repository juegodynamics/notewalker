import React from 'react';
import {Typography, Grid} from '@mui/material';
import {PatientCommunication} from 'fhir/r4';

interface FhirCommunicationProps {
    communication: PatientCommunication[];
}

/**
 * FhirCommunication component
 *
 * This component renders the communication information from a FHIR PatientCommunication resource.
 * It displays the languages spoken by the patient.
 *
 * @param {Object} props - The component props
 * @param {PatientCommunication[]} props.communication - The array of PatientCommunication resources to display
 * @returns {JSX.Element} The rendered component
 */
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
