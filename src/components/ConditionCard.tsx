import React from 'react';
import {Card, CardContent, Typography, Grid} from '@mui/material';
import {Condition} from 'fhir/r4';
import MissingFieldBadge from './Badge';

interface ConditionCardProps {
    condition: Condition;
}

/**
 * ConditionCard component
 *
 * This component renders a card with details about a Condition FHIR resource.
 * It displays various fields from the Condition resource and uses a badge to
 * indicate any missing required fields.
 *
 * @param {Object} props - The component props
 * @param {Condition} props.condition - The Condition resource to display
 * @returns {JSX.Element} The rendered component
 */
const ConditionCard: React.FC<ConditionCardProps> = ({condition}) => {
    // Function to render a field with a label and value
    const renderField = (label: string, value: any) => {
        return (
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2">
                    <strong>{label}:</strong> {value || <MissingFieldBadge />}
                </Typography>
            </Grid>
        );
    };

    return (
        <Card variant="outlined" sx={{mb: 2}}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Condition Details
                </Typography>
                <Grid container spacing={1}>
                    {renderField('ID', condition.id)}
                    {renderField(
                        'Clinical Status',
                        condition.clinicalStatus
                            ? condition.clinicalStatus.coding?.[0]?.display
                            : 'Unknown',
                    )}
                    {renderField(
                        'Verification Status',
                        condition.verificationStatus
                            ? condition.verificationStatus.coding?.[0]?.display
                            : 'Unknown',
                    )}
                    {renderField(
                        'Category',
                        condition.category
                            ? condition.category
                                  .map((c) => c.coding?.[0]?.display)
                                  .join(', ')
                            : 'Unknown',
                    )}
                    {renderField(
                        'Code',
                        condition.code
                            ? condition.code.coding?.[0]?.display
                            : 'Unknown',
                    )}
                    {renderField('Subject', condition.subject?.reference)}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ConditionCard;
