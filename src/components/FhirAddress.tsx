import React from 'react';
import {Typography} from '@mui/material';
import {Address} from 'fhir/r4';

interface FhirAddressProps {
    address: Address[];
}

const FhirAddress: React.FC<FhirAddressProps> = ({address}) => {
    const addr = address?.[0]
        ? `${address[0].line?.join(', ')}, ${address[0].city}, ${
              address[0].state
          } ${address[0].postalCode}`
        : 'No address available';

    return <Typography variant="body2">{addr}</Typography>;
};

export default FhirAddress;
