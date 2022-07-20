import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ name, arrQualitie }) => {
  return (
    <>
      <td>{name}</td>
      <td>
        {arrQualitie.map((quality) => (
          <span key={quality._id} className={`badge bg-${quality.color} m-1`}>
            {quality.name}
          </span>
        ))}
      </td>
    </>
  );
};
Qualitie.propTypes = {
  name: PropTypes.string.isRequired,
  arrQualitie: PropTypes.array.isRequired
};

export default Qualitie;
