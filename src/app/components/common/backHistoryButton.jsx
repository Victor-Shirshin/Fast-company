import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const BackHistoryButton = () => {
  const history = useHistory();
  const { currentUser } = useAuth();

  return (
    <button
      className="btn btn-primary"
      onClick={() => history.push(`/users/${currentUser._id}`)}
    >
      <i className="bi bi-caret-left"></i>
      Назад
    </button>
  );
};

export default BackHistoryButton;
