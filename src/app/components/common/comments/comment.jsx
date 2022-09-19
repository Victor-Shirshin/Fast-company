import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import API from "../../../api";
import { displayDate } from "../../../utils/displayDate";

const Comment = ({
  content,
  created_at: createdAt,
  pageId,
  userId,
  _id,
  onRemove
}) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // console.log(content);
  // console.log(createdAt);
  // console.log(pageId);
  // console.log(userId);
  // console.log(_id);
  // console.log(user);

  useEffect(() => {
    setIsLoading(true);
    API.users.getById(userId).then((user) => setUser(user));
    setIsLoading(false);
  }, []);

  return (
    <div className="bg-light card-body mb-3" key={_id}>
      <div className="row">
        {isLoading ? (
          "loading ..."
        ) : (
          <div className="col">
            <div className="d-flex flex-start">
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${(
                  Math.random() + 1
                )
                  .toString(36)
                  .substring(7)}.svg`}
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
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onRemove(_id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                  <p className="small mb-0">{content}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  content: PropTypes.string,
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pageId: PropTypes.string,
  userId: PropTypes.string,
  _id: PropTypes.string,
  onRemove: PropTypes.func
};

export default Comment;
