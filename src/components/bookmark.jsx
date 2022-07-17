import { useState } from "react";

const BookMark = () => {
  const [className, setClass] = useState("bi bi-bookmark");

  const handleToggleBookMark = () => {
    if (className === "bi bi-bookmark") {
      setClass((prevState) => (prevState = "bi bi-bookmark-star-fill"));
    } else {
      setClass((prevState) => (prevState = "bi bi-bookmark"));
    }
  };

  return (
    <button>
      <i className={className} onClick={handleToggleBookMark}></i>
    </button>
  );
};

export default BookMark;
