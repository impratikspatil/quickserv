import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SortByFilter = (
  {
    sortByValue,
    handleChange
  }
) => {




  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size='small' >
      <InputLabel id="sort-by-filter-label">Sort By</InputLabel>
      <Select
        labelId="sort-by-filter-label"
        id="sort-by-filter"
        value={sortByValue}
        label="Sort By"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'distance'}>Distance</MenuItem>
        <MenuItem value={'ratings'}>Ratings</MenuItem>
        <MenuItem value={'popularity'}>Popular</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortByFilter
