// Это родительский компонент для комментариев он не от кого не зависит запрашивает данные и содержит в себе состояние.
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";

import API from "../../api";

import CommentsList from "../common/comments/commentList";
import AddCommentForm from "../common/comments/addCommentForm";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    API.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);

  const handleRemoveComment = (id) => {
    API.comments.remove(id).then((id) => {
      setComments(comments.filter((item) => item._id !== id));
    });
  };

  const handleSubmit = (data) => {
    API.comments
      .add({ ...data, pageId: userId })
      .then((data) => setComments([...comments, data]));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {comments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
