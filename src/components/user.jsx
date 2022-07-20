import React from "react";

import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ handleDelete, userCrop }) => {
  return userCrop.map((user) => (
    <tr key={user._id}>
      <Qualitie name={user.name} arrQualitie={user.qualities} />
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>
        <BookMark />
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(user._id)}
        >
          delete
        </button>
      </td>
    </tr>
  ));
};
User.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  userCrop: PropTypes.array.isRequired
};

export default User;
