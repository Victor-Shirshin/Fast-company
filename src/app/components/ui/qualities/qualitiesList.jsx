import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../hooks/useQualities.jsx";

import Qualitie from "./qualitie.jsx";

const QualitiesList = ({ qualities }) => {
  const { getQualitiesById, isLoading } = useQualities();
  const qualitiesArray = qualities.map((item) => getQualitiesById(item));

  return (
    <>
      {!isLoading
        ? qualitiesArray.map((item) => <Qualitie key={item._id} {...item} />)
        : "Loading..."}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
