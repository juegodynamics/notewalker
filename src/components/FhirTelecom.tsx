import React from 'react';
import {Grid, Typography} from '@mui/material';
import {ContactPoint} from 'fhir/r4';

interface FhirTelecomProps {
    telecom: ContactPoint[];
}

/**
 * FhirTelecom component
 *
 * This component renders the telecom information from a FHIR ContactPoint resource.
 * It displays the system (e.g., phone, email) and the corresponding value.
 *
 * @param {Object} props - The component props
 * @param {ContactPoint[]} props.telecom - The array of ContactPoint resources to display
 * @returns {JSX.Element} The rendered component
 */
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
