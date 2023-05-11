import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import userReducer from "./user";
import projectReducer from "./project";
import projectsReducer from "./projects";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
    projects: projectsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
