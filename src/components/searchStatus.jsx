import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const addRenderClass = length === 0 ? "danger" : "primary";

  const renderPhrase = (number) => {
    const arr = [
      "человека тусанут",
      "человек тусанёт",
      "человек тусанут",
      "Никто с тобой не тусанёт"
    ];

    if (number === 0) {
      return `${arr[3]}`;
    }

    let substrIndex = 0;

    if (number % 10 === 0 || (number > 10 && number <= 19)) {
      substrIndex = 2;
    } else if (
      (number >= 2 && number <= 4) ||
      (number % 10 >= 2 && number % 10 <= 4)
    ) {
      substrIndex = 0;
    } else if (
      (number >= 5 && number <= 9) ||
      (number % 10 >= 5 && number % 10 <= 9) ||
      number % 10 === 1
    ) {
      substrIndex = 1;
    }
    return `${number} ${arr[substrIndex]} с тобой сегодня`;
  };

  return (
    <h2>
      <span className={`badge bg-${addRenderClass}`}>{`${renderPhrase(
        length
      )}`}</span>
    </h2>
  );
};
SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
};

export default SearchStatus;
