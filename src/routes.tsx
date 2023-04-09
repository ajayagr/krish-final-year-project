import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Auth from "./pages/auth";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import Project from "./pages/project";
import Calendar from "./pages/project/Calendar";
import TaskStatus from "./pages/project/TaskStatus";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth" />,
      },
      {
        path: "project",
        element: <Project />,
        children: [
          { index: true, element: <Calendar /> },
          {
            path: "calendar",
            element: <Calendar />,
          },
          {
            path: "status/:date",
            element: <TaskStatus />,
          },
        ],
      },
      {
        path: "auth",
        element: <Auth />,
        children: [
          { index: true, element: <Login /> },
          { path: "login", element: <Login /> },
          { path: "signup", element: <SignUp /> },
        ],
      },
    ],
  },
]);
