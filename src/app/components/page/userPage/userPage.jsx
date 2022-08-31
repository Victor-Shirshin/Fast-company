import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import api from "../../../api";

import QualitiesList from "../../ui/qualities/qualitiesList.jsx";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();

  const history = useHistory();

  useEffect(() => {
    api.users.getById(userId).then((user) => setUser(user));
  }, []); // оставили почему-то пустой?

  const returnPageBack = () => {
    history.replace("/users");
  };

  return (
    user && (
      <>
        <h2>{user.name}</h2>
        <h3>Профессия: {user.profession.name}</h3>
        <div>
          <QualitiesList qualities={user.qualities} />
        </div>
        <h5>completedMeetings: {user.completedMeetings}</h5>
        <h3>Rate: {user.rate}</h3>
        <button
          onClick={() => {
            returnPageBack();
          }}
        >
          Все пользователи
        </button>
      </>
    )
  );
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
