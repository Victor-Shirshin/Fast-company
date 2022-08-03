import React from "react";
import PropTypes from "prop-types";
import _ from "lodash"; // для получения вложенных данных динамически

const TableBody = ({ data, columns }) => {
  console.log(data);
  console.log(columns);
  return (
    <body>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>{_.get(item, columns[column].path)}</td>
          ))}
        </tr>
      ))}
    </body>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableBody;
