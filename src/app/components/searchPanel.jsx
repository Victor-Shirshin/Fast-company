import React from "react";
import PropTypes from "prop-types";

const Search = ({ handleChangeSearch, searchField }) => {
  return (
    <form className="d-flex">
      <input
        className="form-control"
        type="text"
        placeholder="Search..."
        // aria-label="Search"
        onChange={handleChangeSearch}
        value={searchField}
      />
    </form>
  );
};

Search.propTypes = {
  handleChangeSearch: PropTypes.func.isRequired,
  searchField: PropTypes.string.isRequired
};

export default Search;
