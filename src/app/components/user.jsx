import React from "react";
import PropTypes from "prop-types";

import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({
  handleDelete,
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  handleToggleBookMark,
  bookmark
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((item) => (
          <Qualitie {...item} key={item._id} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <BookMark status={bookmark} onClick={() => handleToggleBookMark(_id)} />
      </td>
      <td>
        {/* <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(_id)}
        >
          delete
        </button> */}
      </td>
    </tr>
  );
};
User.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  handleToggleBookMark: PropTypes.func.isRequired,
  bookmark: PropTypes.bool.isRequired
};

export default User;
