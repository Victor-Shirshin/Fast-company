import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import Qualitie from "./qualitie.jsx";
import {
  getQualitiesByIds,
  getQualitiesStatus,
  loadQualitiesList
} from "../../../store/qualities.js";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesStatus());
  const qualitiesList = useSelector(getQualitiesByIds(qualities));

  // Для получения актуальных данных
  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  return (
    <>
      {!isLoading
        ? qualitiesList.map((item) => <Qualitie key={item._id} {...item} />)
        : "Loading..."}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
