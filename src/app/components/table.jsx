import React from "react";
import PropTypes from "prop-types";

import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ selectedSort, onSort, columns, userCrop, children }) => {
  console.log("children", children);
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader
            selectedSort={selectedSort}
            onSort={onSort}
            columns={columns}
          />
          <TableBody data={userCrop} columns={columns} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  selectedSort: PropTypes.object,
  onSort: PropTypes.func,
  columns: PropTypes.object,
  userCrop: PropTypes.array,
  children: PropTypes.array
};

export default Table;
