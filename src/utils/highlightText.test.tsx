import React from 'react';
import {render} from '@testing-library/react';
import {highlightText} from './highlightText';

describe('highlightText', () => {
    it('renders the text without highlights when query is empty', () => {
        const text = 'Hello, world!';
        const query = '';

        const {container} = render(<>{highlightText(text, query)}</>);
        expect(container.textContent).toBe(text);
        expect(container.querySelector('span')).toBeNull();
    });

    it('highlights the query in the text', () => {
        const text = 'Hello, world!';
        const query = 'world';

        const {container} = render(<>{highlightText(text, query)}</>);
        expect(container.textContent).toBe(text);
        const highlighted = container.querySelector('span');
        expect(highlighted).not.toBeNull();
        expect(highlighted).toHaveStyle(
            'background-color: yellow; color: black;',
        );
        expect(highlighted?.textContent).toBe(query);
    });

    it('highlights multiple occurrences of the query', () => {
        const text = 'Hello, world! World, hello!';
        const query = 'world';

        const {container} = render(<>{highlightText(text, query)}</>);
        expect(container.textContent).toBe(text);
        const highlights = container.querySelectorAll('span');
        expect(highlights.length).toBe(2);
        highlights.forEach((highlight) => {
            expect(highlight).toHaveStyle(
                'background-color: yellow; color: black;',
            );
            expect(highlight.textContent?.toLowerCase()).toBe(
                query.toLowerCase(),
            );
        });
    });

    it('is case-insensitive', () => {
        const text = 'Hello, world! World, hello!';
        const query = 'WORLD';

        const {container} = render(<>{highlightText(text, query)}</>);
        expect(container.textContent).toBe(text);
        const highlights = container.querySelectorAll('span');
        expect(highlights.length).toBe(2);
        highlights.forEach((highlight) => {
            expect(highlight).toHaveStyle(
                'background-color: yellow; color: black;',
            );
            expect(highlight.textContent?.toLowerCase()).toBe(
                query.toLowerCase(),
            );
        });
    });

    it('does not highlight if query is not found', () => {
        const text = 'Hello, world!';
        const query = 'goodbye';

        const {container} = render(<>{highlightText(text, query)}</>);
        expect(container.textContent).toBe(text);
        expect(container.querySelector('span')).toBeNull();
    });
});
