import * as fs from 'fs';
import path from 'path';

const totalFiles = 847;
const failedFilesPath = path.join(__dirname, 'failedFiles.json');
const failedFiles = JSON.parse(fs.readFileSync(failedFilesPath, 'utf8'));

let importStatements = '';
let noteExtractionsEntries =
    'export const NoteExtractions: Record<number, Bundle> = {\n';

for (let i = 0; i < totalFiles; i++) {
    const importStatement = `import notes_${i} from './notes.${i}.json';\n`;
    const noteEntry = `  ${i}: notes_${i} as Bundle,\n`;

    if (failedFiles.includes(`src/data/extractions/notes.${i}.json`)) {
        // Comment out the failed files
        importStatements += `// ${importStatement}`;
        noteExtractionsEntries += `// ${noteEntry}`;
    } else {
        importStatements += importStatement;
        noteExtractionsEntries += noteEntry;
    }
}

noteExtractionsEntries += '};\n';

const content = `import { Bundle } from 'fhir/r4';\n\n${importStatements}\n${noteExtractionsEntries}`;

fs.writeFileSync('src/data/extractions/index.ts', content);

console.log('NoteExtractions.ts file generated successfully!');
