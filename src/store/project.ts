import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IProjectState {
  id: string | number | null;
  name: string;
  description: string;
}

const initialState: IProjectState = {
  id: 1234,
  name: "Sapthagiri Civil Block Construction",
  description:
    "Lorem ipsum dolor sit amet consectetur. Mattis diam quis et neque. Et et nec eu nibh sed lorem nibh. Quisque tristique amet iaculis imperdiet elementum massa. Quis sollicitudin aliquet est in montes at condimentum. Ut vitae mauris ac potenti rhoncus. Turpis habitant commodo porttitor mauris.",
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject(state, action: PayloadAction<IProjectState>) {
      const { name, id, description } = action.payload;
      state.name = name;
      state.id = id;
      state.description = description;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProject } = projectSlice.actions;
const projectReducer = projectSlice.reducer;

export default projectReducer;
