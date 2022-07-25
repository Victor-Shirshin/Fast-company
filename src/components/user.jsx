import React from "react";

import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";
// import _ from "lodash";

const User = ({
  handleDelete,
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate
}) => {
  return (
    <tr key={_id}>
      <Qualitie name={name} arrQualitie={qualities} />
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <BookMark />
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(_id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};
User.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  // userCrop: PropTypes.array.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool
};

export default User;
