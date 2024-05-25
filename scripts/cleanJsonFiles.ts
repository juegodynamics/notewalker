import fs from 'fs';
import path from 'path';

export const stripComments = (jsonString: string): string => {
    return (
        jsonString
            // Remove single-line comments but not URLs
            .replace(/(^|[^:])\/\/.*$/gm, '$1')
            // Remove multi-line comments
            .replace(/\/\*[\s\S]*?\*\//g, '')
            // Remove control characters
            .replace(/[\x00-\x1F\x7F]/g, '')
            // Ensure proper escaping of double quotes
            .replace(/\\"/g, '"')
    );
};

const failedFilesPath = path.join(__dirname, 'failedFiles.json');
const failedFiles: string[] = [];

// Sanitize JSON to ensure valid key-value pairs, especially for URLs
export const sanitizeJson = (jsonString: string): string => {
    return jsonString
        .replace(/"http:\s*"/g, '"http://')
        .replace(/"https:\s*"/g, '"https://');
};

const validateAndCorrectJson = (jsonString: string): string => {
    let correctedString = jsonString;

    // Check for unclosed objects or arrays
    const openBraces = (jsonString.match(/{/g) || []).length;
    let closeBraces = (jsonString.match(/}/g) || []).length;
    const openBrackets = (jsonString.match(/\[/g) || []).length;
    let closeBrackets = (jsonString.match(/]/g) || []).length;

    // Add missing closing braces or brackets
    while (openBraces > closeBraces) {
        correctedString += '}';
        closeBraces++;
    }

    while (openBrackets > closeBrackets) {
        correctedString += ']';
        closeBrackets++;
    }

    return correctedString;
};

const directoryPath = path.join('src', 'data', 'extractions');

// Function to clean JSON files
const cleanJsonFiles = (dirPath: string) => {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return console.error('Unable to scan directory:', err);
        }

        files.forEach((file) => {
            const filePath = path.join(dirPath, file);

            if (path.extname(file) === '.json') {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Unable to read file:', err);
                        failedFiles.push(filePath);
                        return;
                    }

                    try {
                        const cleanData = stripComments(data);
                        const sanitizedData = sanitizeJson(cleanData); // Sanitize the JSON data
                        const validatedData =
                            validateAndCorrectJson(sanitizedData); // Validate and correct JSON data

                        const jsonData = JSON.parse(validatedData);

                        fs.writeFile(
                            filePath,
                            JSON.stringify(jsonData, null, 2),
                            'utf8',
                            (err) => {
                                if (err) {
                                    console.error('Unable to write file:', err);
                                    failedFiles.push(filePath);
                                    return;
                                }

                                console.log(`Cleaned JSON file: ${filePath}`);
                            },
                        );
                    } catch (e: any) {
                        console.error(
                            `Failed to process file ${filePath}:`,
                            e.message,
                        );
                        const errorPositionMatch =
                            e.message.match(/position (\d+)/);
                        if (errorPositionMatch) {
                            const errorPosition = parseInt(
                                errorPositionMatch[1],
                                10,
                            );
                            console.error(
                                'Problematic area:',
                                highlightError(data, errorPosition),
                            );
                        } else {
                            console.error('Error details:', e);
                        }
                        failedFiles.push(filePath);
                    }
                });
            }
        });
    });
};

// Function to highlight error area
const highlightError = (
    jsonString: string,
    errorPosition: number,
    context: number = 20,
): string => {
    const start = Math.max(0, errorPosition - context);
    const end = Math.min(jsonString.length, errorPosition + context);
    return jsonString.substring(start, end);
};

// Write failed files to a JSON file
const writeFailedFiles = (filePath: string, failedFiles: string[]) => {
    console.log('Writing failed files');
    fs.writeFileSync(filePath, JSON.stringify(failedFiles, null, 2), 'utf8');
};

// Clean JSON files in the specified directory and write failed files at the end
console.log('Beginning cleaning');
cleanJsonFiles(directoryPath);
process.on('exit', () => writeFailedFiles(failedFilesPath, failedFiles));
