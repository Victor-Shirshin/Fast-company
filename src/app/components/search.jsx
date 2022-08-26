import React from "react";
import PropTypes from "prop-types";

const Search = ({ searchUser }) => {
  return (
    <form className="d-flex">
      <input
        className="form-control"
        type="text"
        placeholder="Search..."
        // aria-label="Search"
        onChange={searchUser}
      />
    </form>
  );
};

Search.propTypes = {
  searchUser: PropTypes.func.isRequired
};

export default Search;
