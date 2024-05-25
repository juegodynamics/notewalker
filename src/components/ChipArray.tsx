import React from 'react';
import {Chip, Box} from '@mui/material';
import {Criterion} from 'types';
import {Operator, ResourceType} from 'enums';

interface ChipArrayProps {
    criteria: Criterion[];
    onDelete: (index: number) => void;
}

const operatorSymbols: Record<Operator, string> = {
    [Operator.Equals]: '=',
    [Operator.Contains]: '⊂',
    [Operator.StartsWith]: '∧',
    [Operator.EndsWith]: '∨',
    [Operator.GreaterThan]: '>',
    [Operator.LessThan]: '<',
};

const ChipArray: React.FC<ChipArrayProps> = ({criteria, onDelete}) => {
    return (
        <Box display="flex" flexWrap="wrap" gap={1} sx={{mb: 2}}>
            {criteria.map((criterion, index) => (
                <Chip
                    key={index}
                    label={`${criterion.resourceType}.${criterion.field} ${operatorSymbols[criterion.operator]} ${criterion.value}`}
                    onDelete={() => onDelete(index)}
                    color="primary"
                />
            ))}
        </Box>
    );
};

export default ChipArray;
