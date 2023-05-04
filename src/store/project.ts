import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TProject } from "../constants/project";
import { projects } from "../constants/project/index";

const initialState: TProject = {
  ...projects[0],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject(state, action: PayloadAction<TProject>) {
      state = { ...action.payload };
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProject } = projectSlice.actions;
const projectReducer = projectSlice.reducer;

export default projectReducer;
