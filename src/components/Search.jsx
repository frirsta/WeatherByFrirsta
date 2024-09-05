import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Autocomplete from "@mui/material/Autocomplete";

const Search = ({
  onHandleSubmit,
  onHandleChange,
  onHandleInputChange,
  options,
  onHandleIconClick,
}) => {
  return (
    <Box sx={{ width: "100%", maxWidth: "45vw" }}>
      <form onSubmit={onHandleSubmit}>
        <Autocomplete
          freeSolo
          onChange={onHandleChange}
          onInputChange={onHandleInputChange}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.label
          }
          options={options}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {option.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              variant="standard"
              type="text"
              placeholder="Enter city name"
              sx={{ width: "100%" }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={onHandleIconClick}>
                      <SearchOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </form>
    </Box>
  );
};

export default Search;
