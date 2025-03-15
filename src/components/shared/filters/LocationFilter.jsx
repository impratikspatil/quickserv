import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import InputAdornment from '@mui/material/InputAdornment';

const LocationFilter = ({
    allLocations = [
        { label: 'New York, USA' },
        { label: 'London, UK' },
        { label: 'Tokyo, Japan' },
        { label: 'Paris, France' },
        { label: 'Sydney, Australia' },
        { label: 'Berlin, Germany' },
        { label: 'Toronto, Canada' },
        { label: 'Dubai, UAE' },
        { label: 'Singapore' },
        { label: 'Barcelona, Spain' }
    ]
}) => {
    return (
        <Autocomplete
            disablePortal
            options={allLocations.map((location) => location.label)} // Use the label for display
            sx={{ width: 300, alignSelf: 'center' }}
            size='small'
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Location"
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        />
    );
}

export default LocationFilter;
