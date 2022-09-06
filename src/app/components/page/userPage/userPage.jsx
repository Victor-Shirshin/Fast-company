import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import api from "../../../api";

import QualitiesList from "../../ui/qualities/qualitiesList.jsx";
import DynamicLoading from "../../DynamicLoading";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((user) => setUser(user));
  }, []);

  if (!user) {
    return (
      <DynamicLoading>
        <h2>Loading...</h2>
      </DynamicLoading>
    );
  }
  return (
    <>
      <h2>{user.name}</h2>
      <h3>Профессия:{user.profession.name}</h3>
      <div>
        <QualitiesList qualities={user.qualities} />
      </div>
      <h5>completedMeetings: {user.completedMeetings}</h5>
      <h3>Rate: {user.rate}</h3>
      <Link to={`/users/${userId}/edit`} className="btn btn-secondary">
        Изменить данные о пользователе
      </Link>
    </>
  );
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
