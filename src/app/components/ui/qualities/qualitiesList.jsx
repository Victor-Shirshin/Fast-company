import React from "react";
import PropTypes from "prop-types";

import Qualitie from "./qualitie.jsx";

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((item) => (
        <Qualitie {...item} key={item._id} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;