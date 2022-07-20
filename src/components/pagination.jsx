import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
  itemsCount,
  pageSize,
  handlePageChange,
  currentPage
}) => {
  // вычислим какое кол-во страниц необходимо отобразить
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null; // чтобы не отображать одну страницу
  console.log(pageCount); // кол-во страниц
  // теперь из числа нужно реализовать массив можно сделать цикл и каждый раз добавлять 1 но у нас есть lodash
  const pages = _.range(1, pageCount + 1); // массив pages [1, 2, 3]
  console.log(pages);

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
