export enum ResourceType {
    Patient = 'Patient',
    Condition = 'Condition',
    Encounter = 'Encounter',
    Procedure = 'Procedure',
    DiagnosticReport = 'DiagnosticReport',
}

export enum Operator {
    Equals = 'equals',
    Contains = 'contains',
    StartsWith = 'startsWith',
    EndsWith = 'endsWith',
    GreaterThan = 'greaterThan',
    LessThan = 'lessThan',
}
