export enum ResourceType {
    Patient = 'Patient',
    Practitioner = 'Practitioner',
    Condition = 'Condition',
    Encounter = 'Encounter',
    Procedure = 'Procedure',
    Composition = 'Composition',
}

export enum Operator {
    Equals = 'equals',
    Contains = 'contains',
    StartsWith = 'startsWith',
    EndsWith = 'endsWith',
    GreaterThan = 'greaterThan',
    LessThan = 'lessThan',
}
