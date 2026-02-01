import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import InputAdornment from '@mui/material/InputAdornment';

const LocationFilter = ({
    onLocationChange,
    locationValue = '',
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
        { label: 'Barcelona, Spain' },
        { label: 'Mumbai, India' },
        { label: 'Delhi, India' },
        { label: 'Pune, India' },
        { label: 'Bangalore, India' },
        { label: 'Hyderabad, India' }
    ]
}) => {
    return (
        <Autocomplete
            disablePortal
            freeSolo
            value={locationValue}
            onChange={(event, newValue) => {
                onLocationChange(newValue || '');
            }}
            onInputChange={(event, newInputValue) => {
                onLocationChange(newInputValue || '');
            }}
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
