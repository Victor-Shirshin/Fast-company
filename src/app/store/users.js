import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import getRandomInt from "../utils/getRandomInt";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken() ? {
  entities: null,
  isLoading: true,
  error: null,
  auth: { userId: localStorageService.getUserId() },
  isLoggedIn: true,
  dataLoaded: false
} : {
  entities: null,
  isLoading: false,
  error: null,
  auth: null,
  isLoggedIn: false,
  dataLoaded: false
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestedFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.auth = null;
      state.isLoggedIn = false;
      state.dataLoaded = false;
    },
    userUpdateFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userSendUpdated: (state) => {
      state.isLoading = true;
    },
    userUpdated: (state, action) => {
      const newUsers = state.entities;
      const userIndex = state.entities.findIndex((item) => item._id === action.payload._id);
      newUsers[userIndex] = action.payload;
      state.isLoading = false;
      // Роман так как в строке ниже, так можно менять state?
      // state.entities = state.entities.map((item) => item._id === action.payload._id ? (item = action.payload) : item);
    }
  }
});

const { actions, reducer: usersReducer } = usersSlice;
const { usersRequested, usersReceived, usersRequestedFiled, authRequestSuccess, authRequestFailed, userCreated, userLoggedOut, userUpdateFailed, userUpdated, userSendUpdated } = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");

export const login = ({ payload, redirect }) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const data = await authService.login({ email, password });
    dispatch(authRequestSuccess({ userId: data.localId }));
    localStorageService.setTokens(data);
    history.push(redirect);
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register({
      email,
      password
    });
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.localId }));
    dispatch(createUser({
      _id: data.localId,
      email,
      rate: getRandomInt(1, 5),
      completedMeetings: getRandomInt(0, 200),
      image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
        .toString(36)
        .substring(7)}.svg`,
      ...rest
    }));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(usersRequestedFiled(error.message));
  }
};

export const updateUserData = (data) => async (dispatch) => {
  dispatch(userSendUpdated());
  try {
    const { content } = await userService.update(data);
    dispatch(userUpdated(content));
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push("/");
};

function createUser(payload) {
  return async function
    (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);
      dispatch(userCreated(content));
      history.push("/users");
    } catch (error) {
      dispatch(createUserFailed(error.message));
    }
  };
}

export const getCurrentUserData = () => (state) => {
  return state.users.entities ? state.users.entities.find(user => user._id === state.users.auth.userId) : null;
};
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getUsersList = () => (state) => state.users.entities;
export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find(user => user._id === userId);
  }
};

export default usersReducer;
