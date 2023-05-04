import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Designations } from "../constants/options";

export interface IUserState {
  name: string;
  role: Designations | null;
}

const initialState: IUserState = {
  name: "",
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
