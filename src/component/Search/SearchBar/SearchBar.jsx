import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router";

const SearchBar = ({ onSearch }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const search = () => {
    navigate(`/search?query=${searchQuery}`);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    if (query) {
      setSearchQuery(query);
    }
  }, []);

  return (
    <TextField
      label="Поиск"
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={handleChange}
      onKeyDown={handleSearch}
      InputProps={{
        startAdornment: (
          <Button position="start" onClick={search} sx={{ paddingLeft: 0 }}>
            <SearchIcon />
          </Button>
        ),
      }}
    />
  );
};

export default SearchBar;
