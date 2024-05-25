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
}

const resourceTypes = Object.values(ResourceType);
const operators = Object.values(Operator);
export const resourceFields: Record<ResourceType, string[]> = {
    Patient: ['id', 'name', 'gender', 'birthDate', 'address.text'],
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
    DiagnosticReport: [
        'id',
        'status',
        'category.coding.display',
        'code.coding.display',
        'subject.reference',
        'effectiveDateTime',
        'issued',
        'conclusion',
    ],
};

const AdvancedSearchDialog: React.FC<AdvancedSearchDialogProps> = ({
    open,
    onClose,
    onSearch,
    bundles,
}) => {
    const [criteria, setCriteria] = useState<Criterion[]>([]);
    const [uniqueValues, setUniqueValues] = useState<string[]>([]);

    useEffect(() => {
        if (criteria.length > 0) {
            const {resourceType, field} = criteria[criteria.length - 1];
            fetchUniqueValues(resourceType, field);
        }
    }, [criteria]);

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

    const getFieldValues = (resource: any, field: string): string[] => {
        const fields = field.split('.');
        return getNestedFieldValues(resource, fields);
    };

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

    const handleAddCriterion = () => {
        setCriteria([
            ...criteria,
            {
                resourceType: ResourceType.Patient,
                field: '',
                operator: Operator.Equals,
                value: '',
            },
        ]);
    };

    const handleCriterionChange = (
        index: number,
        key: keyof Criterion,
        value: any,
    ) => {
        const newCriteria: Criterion[] = [...criteria];
        newCriteria[index] = {...newCriteria[index], [key]: value};
        setCriteria(newCriteria);
    };

    const handleSearch = () => {
        onSearch(criteria);
        onClose();
    };

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
                                >
                                    {operators.map((op) => (
                                        <MenuItem key={op} value={op}>
                                            {op}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
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
                                />
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
                <Button onClick={handleAddCriterion} color="primary">
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
