// Это родительский компонент для комментариев он не от кого не зависит запрашивает данные и содержит в себе состояние.
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { orderBy } from "lodash";

import CommentsList from "../common/comments/commentList";
import AddCommentForm from "../common/comments/addCommentForm";
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  deleteComment
} from "../../store/comments";
// import { useComments } from "../hooks/useComments";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  // const { removeComment } = useComments();
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());
  const currentUserId = useSelector(getCurrentUserId());

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  const handleRemoveComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const handleSubmit = (data) => {
    dispatch(createComment(data, userId, currentUserId));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              "Loading"
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
