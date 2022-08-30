import React from "react";
import PropTypes from "prop-types";

const Search = ({ handleSearchQuery, searchQuery }) => {
  return (
    <form className="d-flex">
      <input
        className="form-control"
        type="text"
        placeholder="Search..."
        // aria-label="Search"
        onChange={handleSearchQuery}
        value={searchQuery}
      />
    </form>
  );
};

Search.propTypes = {
  handleSearchQuery: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired
};

export default Search;
