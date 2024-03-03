import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function SortAndSearch() {
  return (
    <Grid container spacing={3} alignItems="center">
            <Grid item xs={3}/>
  
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          placeholder="Search Salons..."
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            label="Sort By"
            defaultValue=""
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="service">Service</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>
      </Grid>


    </Grid>
  );
}

export default SortAndSearch;
