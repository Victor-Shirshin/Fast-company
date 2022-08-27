import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
  itemsCount,
  pageSize,
  handlePageChange,
  currentPage
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize); // кол-во страниц отобразить
  if (pageCount === 1) return null; // чтобы не отображать одну страницу
  const pages = _.range(1, pageCount + 1); // массив pages [1, 2, 3]

  return (
    <nav>
      <ul className="pagination">
        {pages.map((item) => (
          <li
            className={"page-item" + (item === currentPage ? " active" : "")}
            key={"page_ " + item}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
