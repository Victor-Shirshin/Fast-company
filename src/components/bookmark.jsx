import { useState } from "react";
const BookMark = () => {
  const [book, setBook] = useState("bi bi-bookmark");

  // const styleBookMark = {
  //   fontSize: "25px",
  // };

  const handleToggleBookMark = () => {
    if (book === "bi bi-bookmark") {
      setBook((prevState) => (prevState = "bi bi-bookmark-star-fill"));
    } else {
      setBook((prevState) => (prevState = "bi bi-bookmark"));
    }
  };

  return (
    <i
      className={book}
      // style={styleBookMark}
      onClick={handleToggleBookMark}
    ></i>
  );
};

export default BookMark;
