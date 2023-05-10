import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TPlan, TProject } from "../constants/project";
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
    addPlan(state, action: PayloadAction<TPlan>) {
      state.plans.push(action.payload);
    },
    deletePlan(state, action: PayloadAction<number>) {
      state.plans.splice(action.payload, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProject, addPlan, deletePlan } = projectSlice.actions;
const projectReducer = projectSlice.reducer;

export default projectReducer;
