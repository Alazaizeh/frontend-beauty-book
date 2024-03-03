import React, { useState } from 'react';
import { Grid, Checkbox, FormControlLabel, Typography } from '@mui/material';

const filterOptions = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
];

function FilterPage() {
  const [checkedOptions, setCheckedOptions] = useState({});

  const handleCheckboxChange = (option) => {
    setCheckedOptions({ ...checkedOptions, [option]: !checkedOptions[option] });
  };

  return (
    <Grid container spacing={3}>
      {/* Filter Section */}
      <Grid item xs={12}>
        <div style={{ padding: '20px' }}>
          {filterOptions.map((option, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={checkedOptions[option] || false}
                  onChange={() => handleCheckboxChange(option)}
                  sx={{ '&.Mui-checked': { color: '#ff80ab' } }} // Pink color when checked
                />
              }
              label={<Typography variant="body1">{option}</Typography>}
            />
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default FilterPage;
