import {Bundle} from 'fhir/r4';
import {Criterion} from 'types'; // Import the Criterion interface
import {Operator} from 'enums'; // Import the Operator enum

/**
 * searchBundles function
 *
 * This function takes an array of FHIR Bundles and a set of search criteria,
 * and returns an array of indices of the bundles that match all the criteria.
 *
 * @param {Bundle[]} bundles - The array of FHIR Bundles to search within
 * @param {Criterion[]} criteria - The set of criteria to match against the bundles
 * @returns {number[]} The array of indices of the matching bundles
 */
export const searchBundles = (
    bundles: Bundle[],
    criteria: Criterion[],
): number[] => {
    const matchedBundleIndices: number[] = [];

    bundles.forEach((bundle, index) => {
        let isMatch = true;

        criteria.forEach(
            ({resourceType, field, operator, value, startDate, endDate}) => {
                const resource = bundle?.entry?.find(
                    (entry) => entry.resource?.resourceType === resourceType,
                )?.resource;
                if (!resource) {
                    isMatch = false;
                    return;
                }

                const fieldValues = getFieldValues(resource, field);

                if (!fieldValues.length) {
                    isMatch = false;
                    return;
                }
                if (field === 'birthDate' && startDate && endDate) {
                    const dateValue = new Date(fieldValues[0] || '');
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    if (dateValue < start || dateValue > end) isMatch = false;
                    return;
                }

                switch (operator) {
                    case Operator.Equals:
                        if (
                            !fieldValues?.some(
                                (fieldValue) => fieldValue === value,
                            )
                        )
                            isMatch = false;
                        break;
                    case Operator.Contains:
                        if (
                            !fieldValues?.some((fieldValue) =>
                                fieldValue?.includes(value),
                            )
                        )
                            isMatch = false;
                        break;
                    case Operator.StartsWith:
                        if (
                            !fieldValues?.some((fieldValue) =>
                                fieldValue?.startsWith(value),
                            )
                        )
                            isMatch = false;
                        break;
                    case Operator.EndsWith:
                        if (
                            !fieldValues?.some((fieldValue) =>
                                fieldValue?.endsWith(value),
                            )
                        )
                            isMatch = false;
                        break;
                    case Operator.GreaterThan:
                        if (
                            !fieldValues?.some(
                                (fieldValue) =>
                                    parseFloat(fieldValue) > parseFloat(value),
                            )
                        )
                            isMatch = false;
                        break;
                    case Operator.LessThan:
                        if (
                            !fieldValues?.some(
                                (fieldValue) =>
                                    parseFloat(fieldValue) < parseFloat(value),
                            )
                        )
                            isMatch = false;
                        break;
                    default:
                        isMatch = false;
                }
            },
        );

        if (isMatch) {
            matchedBundleIndices.push(index);
        }
    });

    return matchedBundleIndices;
};

/**
 * getFieldValues function
 *
 * This function takes a resource and a dot-separated field path,
 * and returns an array of values of the field within the resource.
 *
 * @param {any} resource - The FHIR resource to extract the field values from
 * @param {string} field - The dot-separated path of the field
 * @returns {string[]} The array of values of the field
 */
const getFieldValues = (resource: any, field: string): string[] => {
    const fields = field.split('.');
    return getNestedFieldValues(resource, fields);
};

/**
 * getNestedFieldValues function
 *
 * This function recursively traverses a resource to find values at the specified nested field path.
 *
 * @param {any} obj - The object to traverse
 * @param {string[]} fields - The array of field names forming the path
 * @returns {string[]} The array of values found at the specified path
 */
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
