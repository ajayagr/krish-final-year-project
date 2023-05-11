import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TProject } from "../constants/project";
import { projects } from "../constants/project/index";

export interface IProjectsState {
  projects: TProject[];
}

const initialState: IProjectsState = { projects: [...projects] };

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<TProject>) {
      state.projects.push(action.payload);
    },
    editProject(state, action: PayloadAction<TProject>) {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (projectIndex > -1) {
        state.projects.splice(projectIndex, 1, {
          ...state.projects[projectIndex],
          ...action.payload,
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProject, editProject } = projectsSlice.actions;
const projectsReducer = projectsSlice.reducer;

export default projectsReducer;
