import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { displayDate } from "../../../utils/displayDate";
// import { useAuth } from "../../hooks/useAuth";
import { getCurrentUserId, getUserById } from "../../../store/users";

const Comment = ({
  content,
  created_at: createdAt,
  userId,
  _id: id,
  onRemove
}) => {
  // const { currentUser } = useAuth();
  const currentUserId = useSelector(getCurrentUserId());
  const user = useSelector(getUserById(userId));

  return (
    <div className="bg-light card-body mb-3" key={id}>
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <img
              src={user.image}
              className=" rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    {user.name}{" "}
                    <span className="small">{displayDate(createdAt)}</span>
                  </p>
                  {currentUserId === userId && (
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onRemove(id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  content: PropTypes.string,
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userId: PropTypes.string,
  _id: PropTypes.string,
  onRemove: PropTypes.func
};

export default Comment;
