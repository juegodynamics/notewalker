import React from 'react';
import {Typography} from '@mui/material';
import {Address} from 'fhir/r4';

interface FhirAddressProps {
    address: Address[];
}

/**
 * FhirAddress component
 *
 * This component renders the address information from a FHIR Address resource.
 * If the address is available, it formats and displays it. If not, it shows
 * a default message indicating no address is available.
 *
 * @param {Object} props - The component props
 * @param {Address[]} props.address - The array of Address resources to display
 * @returns {JSX.Element} The rendered component
 */
const FhirAddress: React.FC<FhirAddressProps> = ({address}) => {
    // Format the address information if available, otherwise show a default message
    const addr = address?.[0]
        ? `${address[0].line?.join(', ')}, ${address[0].city}, ${
              address[0].state
          } ${address[0].postalCode}`
        : 'No address available';

    return <Typography variant="body2">{addr}</Typography>;
};

export default FhirAddress;
