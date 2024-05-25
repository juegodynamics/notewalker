import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
    it('renders without crashing', () => {
        render(<SearchBar onSearch={jest.fn()} />);

        expect(screen.getByLabelText('Search Notes')).toBeInTheDocument();
    });

    it('calls onSearch with debounced input', async () => {
        const onSearchMock = jest.fn();
        render(<SearchBar onSearch={onSearchMock} />);

        fireEvent.change(screen.getByLabelText('Search Notes'), {
            target: {value: 'test'},
        });

        await waitFor(() => {
            expect(onSearchMock).toHaveBeenCalledWith('test');
        });
    });

    it('cleans up the debounce function on unmount', () => {
        const onSearchMock = jest.fn();
        const {unmount} = render(<SearchBar onSearch={onSearchMock} />);

        fireEvent.change(screen.getByLabelText('Search Notes'), {
            target: {value: 'test'},
        });
        unmount();

        // The test will pass if no errors are thrown during unmount
    });
});
