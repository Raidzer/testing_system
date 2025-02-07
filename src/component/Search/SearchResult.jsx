import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  searchData,
  searchError,
  searchIsLoading,
} from "../../store/searchStore";
import { IsLoading } from "../IsLoading";
import SearchList from "./SearchList.jsx/SearchList";
import { Box } from "@mui/material";

const SearchResult = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const isLoading = useSelector(searchIsLoading());
  const { isError, errorMessage } = useSelector(searchError());
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    if (query) {
      setSearchQuery(query);
      dispatch(searchData({ payload: { query } }));
    }
  }, [location.search]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        {isLoading && <IsLoading />}
        {!isLoading && isError && (
          <>
            <h1>{errorMessage}</h1>
          </>
        )}
        {!isLoading && !isError && (
          <>
            <h3>Результат поиска по запросу: "{searchQuery}"</h3>
            <SearchList query={searchQuery}/>
          </>
        )}
      </Box>
    </>
  );
};

export default SearchResult;
