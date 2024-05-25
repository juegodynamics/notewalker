import React, {useState, useMemo} from 'react';
import {TextField, Autocomplete} from '@mui/material';
import {debounce} from 'lodash';

const SearchBar: React.FC<{onSearch: (query: string) => void}> = ({
    onSearch,
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Use useMemo to memoize the debounced function
    const debouncedOnSearch = useMemo(
        () => debounce(onSearch, 300), // Adjust delay as needed
        [onSearch]
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
            options={[]} // Add options for auto-suggestions here
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Notes"
                    variant="outlined"
                    onChange={handleSearchChange}
                    value={searchTerm}
                />
            )}
        />
    );
};

export default SearchBar;
