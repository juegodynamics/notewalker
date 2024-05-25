import {mockNotes} from '../src/data/notes';
import fs from 'fs';

const main = async () => {
    for (let i = 847; i < mockNotes.length; i++) {
        // for (let i = 0; i < mock; i++) {
        console.log(`beginning note ${i}`);
        const response = await fetch(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4o', // Use the appropriate model ID
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant.',
                        },
                        {
                            role: 'user',
                            content: `Take the following text and generate a structured FHIR Bundle that captures as much of the text into FHIR Resources as possible. The response should be just raw json, no backticks, no comments, no markdown formatting. Make sure that youre response is able to be processed by JSON.parse with zero further postprocessing. \n\n${mockNotes[i].text}. `,
                        },
                    ],
                    // max_tokens: 50,
                    temperature: 0.7,
                }),
            },
        );

        const data = await response.json();
        let fhirText = data.choices[0].message.content.trim();

        fs.writeFileSync(`src/data/notes.${i}.json`, fhirText, {
            encoding: 'utf-8',
        });
        console.log(`finished note ${i}`);
    }
};

main()
    .then(() => {
        console.log('all finished');
    })
    .catch((err) => {
        console.log(`failed: ${err}`);
    });
