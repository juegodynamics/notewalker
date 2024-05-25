import React from 'react';

/**
 * highlightText function
 *
 * This function takes a text and a query, and returns a React component where the query
 * is highlighted within the text. The matching parts of the query are highlighted with
 * a yellow background and black text color.
 *
 * @param {string} text - The text to search within and highlight
 * @param {string} query - The search query to highlight in the text
 * @returns {React.ReactNode} The React component with highlighted query parts
 */
export const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, index) =>
                regex.test(part) ? (
                    <span
                        key={index}
                        style={{backgroundColor: 'yellow', color: 'black'}}
                    >
                        {part}
                    </span>
                ) : (
                    part
                ),
            )}
        </>
    );
};
