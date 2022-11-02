import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getProfessions, getProfessionsStatus } from "../../store/professions";

const Profession = ({ id }) => {
  const professions = useSelector(getProfessions());
  const isLoading = useSelector(getProfessionsStatus());
  const profession = professions.find((prof) => prof._id === id);

  if (isLoading) {
    return <p>{profession.name}</p>;
  } else return "loading ...";
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
