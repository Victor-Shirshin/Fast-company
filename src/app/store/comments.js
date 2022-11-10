import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestedFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentsCreateRequested: (state) => {
      state.isLoading = true;
    },
    commentCreated: (state, action) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    commentCreateFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentDeleteRequested: (state, action) => {
      state.isLoading = true;
    },
    commentDeleted: (state, action) => {
      state.entities = state.entities.filter((item) => item._id !== action.payload);
    },
    commentDeleteFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const { commentsReceived, commentsRequested, commentsRequestedFiled, commentsCreateRequested, commentCreated, commentCreateFailed, commentDeleteRequested, commentDeleted, commentDeleteFailed } = actions;

export const createComment = (data, userId, pageId
) => async (dispatch) => {
  dispatch(commentsCreateRequested());
  try {
    const comment = {
      ...data,
      userId,
      pageId,
      _id: nanoid(),
      created_at: Date.now()
    };
    const { content } = await commentService.createComment(comment);
    dispatch(commentCreated(content));
  } catch (error) {
    commentCreateFailed(error.message);
  }
};

export const deleteComment = (id) => async (dispatch) => {
  dispatch(commentDeleteRequested);
  try {
    const { content } = await commentService.removeComment(id);
    if (content === null) {
      dispatch(commentDeleted(id));
    }
  } catch (error) {
    commentDeleteFailed(error.message);
  }
};

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestedFiled(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;