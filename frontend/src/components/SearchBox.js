import React, { useState } from "react";
import classes from "./SearchBox.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

const SearchBox = () => {
  // hooks
  const history = useHistory();

  // Input keyword state
  const [keyword, setKeyword] = useState("");

  // search form handler
  const searchFormHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      console.log("h");
      history.push("/");
    }
  };

  return (
    <div className={classes.SearchBoxContainer}>
      <form onSubmit={searchFormHandler} className={classes.searchBoxForm}>
        <div
          className={classes.l}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            placeholder="Search products..."
          />
          <button type="submit" className={classes.btn}>
            <SearchIcon
              className={classes.searchIcon}
              style={{ color: "white" }}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
