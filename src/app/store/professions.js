import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/professions.service";
import isOutdated from "../utils/isOutdated";

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    professionsRequestedFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: professionsReducer } = professionsSlice;
const { professionsReceived, professionsRequested, professionsRequestedFiled } = actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions;
  if (isOutdated(lastFetch)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.get();
      dispatch(professionsReceived(content));
    } catch (error) {
      dispatch(professionsRequestedFiled(error.message));
    }
  }
};
export const getProfessionById = (id) => (state) => {
  if (state.professions.entities) {
    return state.professions.entities.find(prof => prof._id === id);
  };
};
export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;

export default professionsReducer;