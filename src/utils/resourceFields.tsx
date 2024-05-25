export const resourceFields: Record<
    string,
    Array<{label: string; value: string; type: 'string' | 'date'}>
> = {
    Patient: [
        {label: 'Name', value: 'name', type: 'string'},
        {label: 'Gender', value: 'gender', type: 'string'},
        {label: 'Birth Date', value: 'birthDate', type: 'date'},
        {label: 'Address', value: 'address', type: 'string'},
    ],
    Condition: [
        {label: 'Code', value: 'code', type: 'string'},
        {label: 'Clinical Status', value: 'clinicalStatus', type: 'string'},
        {
            label: 'Verification Status',
            value: 'verificationStatus',
            type: 'string',
        },
        {label: 'Category', value: 'category', type: 'string'},
        {label: 'Severity', value: 'severity', type: 'string'},
        {label: 'Onset Date', value: 'onsetDateTime', type: 'date'},
    ],
    Encounter: [
        {label: 'Status', value: 'status', type: 'string'},
        {label: 'Class', value: 'class', type: 'string'},
        {label: 'Type', value: 'type', type: 'string'},
        {label: 'Period Start', value: 'period.start', type: 'date'},
        {label: 'Period End', value: 'period.end', type: 'date'},
    ],
    Procedure: [
        {label: 'Status', value: 'status', type: 'string'},
        {label: 'Category', value: 'category', type: 'string'},
        {label: 'Code', value: 'code', type: 'string'},
        {label: 'Performed Date', value: 'performedDateTime', type: 'date'},
    ],
    CarePlan: [
        {label: 'Status', value: 'status', type: 'string'},
        {label: 'Intent', value: 'intent', type: 'string'},
        {label: 'Category', value: 'category', type: 'string'},
        {label: 'Title', value: 'title', type: 'string'},
        {label: 'Period Start', value: 'period.start', type: 'date'},
        {label: 'Period End', value: 'period.end', type: 'date'},
    ],
};

export const operators = [
    {label: 'Equals', value: 'eq'},
    {label: 'Not Equals', value: 'ne'},
    {label: 'Greater Than', value: 'gt'},
    {label: 'Less Than', value: 'lt'},
    {label: 'Contains', value: 'contains'},
];
