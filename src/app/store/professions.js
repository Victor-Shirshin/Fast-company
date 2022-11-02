import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/professions.service";

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    profissionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload;
    },
    professionsRequestedFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: professionsReducer } = professionsSlice;
const { professionsReceived, profissionsRequested, professionsRequestedFiled } = actions;

export const loadProfessionsList = () => async (dispatch) => {
  dispatch(profissionsRequested());
  try {
    const { content } = await professionService.get();
    dispatch(professionsReceived(content));
  } catch (error) {
    dispatch(professionsRequestedFiled(error.message));
  }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsStatus = () => (state) => state.professions.isLoading;

export default professionsReducer;