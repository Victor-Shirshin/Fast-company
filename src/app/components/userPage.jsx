import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";

import api from "../api";

import Qualitie from "./qualitie";

const UserPage = () => {
  const [user, setUser] = useState();

  const history = useHistory();
  const params = useParams();
  const { userId } = params;

  useEffect(() => {
    api.users.getById(userId).then((user) => setUser(user));
  }, [user]);

  const returnPageBack = () => {
    history.replace("/users");
  };

  return (
    user && (
      <>
        <h2>{user.name}</h2>
        <h3>Профессия: {user.profession.name}</h3>
        <div>
          {user.qualities.map((item) => (
            <Qualitie {...item} key={item._id} />
          ))}
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
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default UserPage;
