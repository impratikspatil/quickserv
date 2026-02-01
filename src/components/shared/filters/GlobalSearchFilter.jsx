import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const GlobalSearchFilter = ({
    onSearchChange,
    searchValue = '',
    globalSearchData = [
        { title: 'Pratik Washing Service', year: 2023 },
        { title: 'The Gourmet Kitchen', year: 2022 },
        { title: 'Sunny Day Laundromat', year: 2021 },
        { title: 'City Central Cafe', year: 2023 },
        { title: 'Elegant Hair Studio', year: 2022 },
        { title: 'Quick Fix Auto Repair', year: 2023 },
        { title: 'Green Leaf Organic Market', year: 2021 },
        { title: 'Happy Paws Pet Grooming', year: 2022 },
        { title: 'Urban Fitness Gym', year: 2023 },
        { title: 'The Book Nook', year: 2021 },
        // Add more options as needed...
    ]
}) => {
    return (
        <Autocomplete
            size='small'
            sx={{ width: 300, alignSelf: 'center' }}
            id="global-search-filter"
            freeSolo
            value={searchValue}
            onChange={(event, newValue) => {
                onSearchChange(newValue || '');
            }}
            onInputChange={(event, newInputValue) => {
                onSearchChange(newInputValue || '');
            }}
            options={globalSearchData.map((option) => option.title)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search"
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        />
    );
}

export default GlobalSearchFilter;
