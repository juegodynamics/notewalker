import React, {useState, useMemo} from 'react';
import {TextField, Autocomplete} from '@mui/material';
import {debounce} from 'lodash';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

/**
 * SearchBar component
 *
 * This component renders a search bar with debounced search input.
 * It allows for free text search and debounces the search input to reduce the frequency of search callbacks.
 *
 * @param {Object} props - The component props
 * @param {function} props.onSearch - The function to call when the search term changes
 * @returns {JSX.Element} The rendered component
 */
const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Use useMemo to memoize the debounced function
    const debouncedOnSearch = useMemo(
        () => debounce(onSearch, 300), // Adjust delay as needed
        [onSearch],
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        debouncedOnSearch(value);
    };

    // Cleanup the debounce function on unmount
    React.useEffect(() => {
        return () => {
            debouncedOnSearch.cancel();
        };
    }, [debouncedOnSearch]);

    return (
        <Autocomplete
            freeSolo
            options={[]} // @todo: Add options for auto-suggestions here
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Notes"
                    variant="outlined"
                    onChange={handleSearchChange}
                    value={searchTerm}
                />
            )}
            sx={{mt: 4}}
        />
    );
};

export default SearchBar;
