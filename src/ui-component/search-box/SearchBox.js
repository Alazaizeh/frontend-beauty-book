import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
 import axios from "axios";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { CircularProgress } from "@mui/material";
 const MyComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [timer, setTimer] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVERIP}/salons/search`,
        { textfield: query }
      );

      if (response.status == 200) {
        const data = response.data;
        setResults(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };
  const handleSelected = (salon) => {
  };

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        fetchData(inputValue);
      }, 500)
    );

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [inputValue]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      filterOptions={(options, params) => options}
      noOptionsText={"No Date Found"}
      onClose={() => {
        setOpen(false);
      }}
      //   isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name || option}
      onChange={(event, newValue) => {
        handleSelected(newValue);
      }}
      options={results}
      loading={loading}
      isOptionEqualToValue={(option, value) => {
        return true;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search services or businesses"
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default MyComponent;
