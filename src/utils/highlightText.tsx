import React from 'react';

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
                )
            )}
        </>
    );
};
