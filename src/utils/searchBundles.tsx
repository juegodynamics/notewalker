import {Bundle} from 'fhir/r4';
import {Criterion} from 'types'; // Import the Criterion interface
import {Operator} from 'enums'; // Import the Operator enum

export const searchBundles = (
    bundles: Bundle[],
    criteria: Criterion[],
): number[] => {
    const matchedBundleIndices: number[] = [];

    bundles.forEach((bundle, index) => {
        let isMatch = true;

        criteria.forEach(({resourceType, field, operator, value}) => {
            const resource = bundle?.entry?.find(
                (entry) => entry.resource?.resourceType === resourceType,
            )?.resource;
            if (!resource) {
                isMatch = false;
                return;
            }

            const fieldValue = getFieldValue(resource, field);

            switch (operator) {
                case Operator.Equals:
                    if (fieldValue !== value) isMatch = false;
                    break;
                case Operator.Contains:
                    if (!fieldValue?.includes(value)) isMatch = false;
                    break;
                case Operator.StartsWith:
                    if (!fieldValue?.startsWith(value)) isMatch = false;
                    break;
                case Operator.EndsWith:
                    if (!fieldValue?.endsWith(value)) isMatch = false;
                    break;
                case Operator.GreaterThan:
                    if (
                        fieldValue &&
                        parseFloat(fieldValue) <= parseFloat(value)
                    )
                        isMatch = false;
                    break;
                case Operator.LessThan:
                    if (
                        fieldValue &&
                        parseFloat(fieldValue) >= parseFloat(value)
                    )
                        isMatch = false;
                    break;
                default:
                    isMatch = false;
            }
        });

        if (isMatch) {
            matchedBundleIndices.push(index);
        }
    });

    return matchedBundleIndices;
};

const getFieldValue = (resource: any, field: string): string | null => {
    const fields = field.split('.');
    let value = resource;

    for (const f of fields) {
        if (value[f]) {
            value = value[f];
        } else {
            return null;
        }
    }

    return typeof value === 'string' ? value : null;
};
