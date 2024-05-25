import React, {useState, useEffect} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Grid,
    Autocomplete,
} from '@mui/material';
import {Bundle} from 'fhir/r4';
import {Criterion} from 'types';
import {ResourceType, Operator} from 'enums';

interface AdvancedSearchDialogProps {
    open: boolean;
    onClose: () => void;
    onSearch: (criteria: Criterion[]) => void;
    bundles: Bundle[];
    criteria: Criterion[];
    setCriteria: React.Dispatch<React.SetStateAction<Criterion[]>>;
}

// Define the possible resource types and operators as enums
const resourceTypes = Object.values(ResourceType);
const operators = Object.values(Operator);

// Define the fields available for each resource type
export const resourceFields: Record<ResourceType, string[]> = {
    Patient: ['id', 'name', 'gender', 'birthDate', 'address.text'],
    Practitioner: [
        'id',
        'name.text',
        'gender',
        'address.text',
        'telecom.value',
    ],
    Composition: [
        'id',
        'status',
        'category.coding.display',
        'code.coding.display',
        'subject.reference',
        'effectiveDateTime',
        'issued',
        'conclusion',
    ],

    Condition: [
        'id',
        'clinicalStatus.coding.code',
        'clinicalStatus.coding.display',
        'verificationStatus.coding.display',
        'category.coding.display',
        'code.coding.display',
        'subject.reference',
    ],
    Encounter: [
        'id',
        'status',
        'class.code',
        'subject.reference',
        'period.start',
        'period.end',
    ],
    Procedure: [
        'id',
        'status',
        'code.coding.display',
        'subject.reference',
        'performedDateTime',
    ],
};

/**
 * AdvancedSearchDialog component
 *
 * This component provides an advanced search interface allowing users to build
 * complex search criteria. The criteria are based on FHIR resource types and fields.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onClose - Function to call when the dialog is closed
 * @param {Function} props.onSearch - Function to call when a search is performed
 * @param {Bundle[]} props.bundles - Array of FHIR bundles to search within
 * @param {Criterion[]} props.criteria - The current search criteria
 * @param {Function} props.setCriteria - Function to update the search criteria
 * @returns {JSX.Element} The rendered component
 */
const AdvancedSearchDialog: React.FC<AdvancedSearchDialogProps> = ({
    open,
    onClose,
    onSearch,
    bundles,
    criteria,
    setCriteria,
}) => {
    const [uniqueValues, setUniqueValues] = useState<string[]>([]);

    // Fetch unique values for the selected field when criteria changes
    useEffect(() => {
        if (criteria.length > 0) {
            const {resourceType, field} = criteria[criteria.length - 1];
            fetchUniqueValues(resourceType, field);
        }
    }, [criteria]);

    // Fetch unique values for a specific field in the resource type.
    // These are used to populate the Autocomplete.
    const fetchUniqueValues = (resourceType: ResourceType, field: string) => {
        const valuesSet = new Set<string>();

        bundles.forEach((bundle) => {
            bundle?.entry?.forEach((entry) => {
                if (entry.resource?.resourceType === resourceType) {
                    const fieldValues = getFieldValues(entry.resource, field);
                    fieldValues.forEach((value) => {
                        if (value) {
                            valuesSet.add(value);
                        }
                    });
                }
            });
        });

        setUniqueValues(Array.from(valuesSet));
    };

    // Extract values for a specific field from a resource
    const getFieldValues = (resource: any, field: string): string[] => {
        const fields = field.split('.');
        return getNestedFieldValues(resource, fields);
    };

    // Recursively get nested field values from an object
    const getNestedFieldValues = (obj: any, fields: string[]): string[] => {
        if (!obj) return [];
        const field = fields[0];
        const remainingFields = fields.slice(1);

        if (remainingFields.length === 0) {
            if (Array.isArray(obj[field])) {
                return obj[field].map((item: any) =>
                    typeof item === 'object' ? JSON.stringify(item) : item,
                );
            } else {
                return [obj[field]].map((item: any) =>
                    typeof item === 'object' ? JSON.stringify(item) : item,
                );
            }
        }

        if (Array.isArray(obj[field])) {
            return obj[field].flatMap((item: any) =>
                getNestedFieldValues(item, remainingFields),
            );
        } else {
            return getNestedFieldValues(obj[field], remainingFields);
        }
    };

    // Add a new criterion to the criteria list
    const handleAddCriterion = () => {
        setCriteria([
            ...criteria,
            {
                resourceType: ResourceType.Patient,
                field: '',
                operator: Operator.Equals,
                value: '',
                startDate: '',
                endDate: '',
            },
        ]);
    };

    // Update a specific criterion in the criteria list
    const handleCriterionChange = (
        index: number,
        key: keyof Criterion,
        value: any,
    ) => {
        const newCriteria: Criterion[] = [...criteria];
        newCriteria[index] = {...newCriteria[index], [key]: value};
        setCriteria(newCriteria);
    };

    // Handle the search action
    const handleSearch = () => {
        onSearch(criteria);
        onClose();
    };

    // Get the fields for a specific resource type
    const getFields = (resourceType: ResourceType): string[] => {
        return resourceFields[resourceType] || [];
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Advanced Search</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {criteria.map((criterion, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    select
                                    label="Resource Type"
                                    value={criterion.resourceType}
                                    onChange={(e) =>
                                        handleCriterionChange(
                                            index,
                                            'resourceType',
                                            e.target.value as ResourceType,
                                        )
                                    }
                                    fullWidth
                                    sx={{mt: 2}}
                                >
                                    {resourceTypes.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    select
                                    label="Field"
                                    value={criterion.field}
                                    onChange={(e) =>
                                        handleCriterionChange(
                                            index,
                                            'field',
                                            e.target.value,
                                        )
                                    }
                                    fullWidth
                                    sx={{mt: 2}}
                                >
                                    {getFields(
                                        criterion.resourceType as ResourceType,
                                    ).map((field) => (
                                        <MenuItem key={field} value={field}>
                                            {field}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    select
                                    disabled={criterion.field === 'birthDate'}
                                    label="Operator"
                                    value={criterion.operator}
                                    onChange={(e) =>
                                        handleCriterionChange(
                                            index,
                                            'operator',
                                            e.target.value as Operator,
                                        )
                                    }
                                    fullWidth
                                    sx={{mt: 2}}
                                >
                                    {operators.map((op) => (
                                        <MenuItem key={op} value={op}>
                                            {op}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {criterion.field === 'birthDate' ? (
                                <>
                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="Start Date"
                                            type="date"
                                            value={criterion.startDate}
                                            onChange={(e) =>
                                                handleCriterionChange(
                                                    index,
                                                    'startDate',
                                                    e.target.value,
                                                )
                                            }
                                            fullWidth
                                            sx={{mt: 2}}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="End Date"
                                            type="date"
                                            value={criterion.endDate}
                                            onChange={(e) =>
                                                handleCriterionChange(
                                                    index,
                                                    'endDate',
                                                    e.target.value,
                                                )
                                            }
                                            fullWidth
                                            sx={{mt: 2}}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </>
                            ) : (
                                <Grid item xs={12} sm={4}>
                                    <Autocomplete
                                        options={uniqueValues}
                                        value={criterion.value}
                                        onChange={(e, newValue) =>
                                            handleCriterionChange(
                                                index,
                                                'value',
                                                newValue as string,
                                            )
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Value"
                                                fullWidth
                                            />
                                        )}
                                        sx={{mt: 2}}
                                    />
                                </Grid>
                            )}
                        </React.Fragment>
                    ))}
                </Grid>
                <Button
                    onClick={handleAddCriterion}
                    color="primary"
                    sx={{mt: 1}}
                >
                    Add Criterion
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSearch} color="primary">
                    Search
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AdvancedSearchDialog;
