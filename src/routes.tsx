import { Navigate, createHashRouter } from "react-router-dom";
import App from "./App";
import Auth from "./pages/auth";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import Project from "./pages/project";
import Calendar from "./pages/project/Calendar";
import TaskStatus from "./pages/project/TaskStatus";
import ProjectDashboard from "./pages/project/Dashboard";
import Estimation from "./pages/project/Estimation";
import TaskModules from "./pages/project/TaskModules";
import Plans from "./pages/project/Plans";
import MyProjects from "./pages/MyProjects";
import NewProject from "./pages/project/New";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth" replace />,
      },
      {
        path: "home",
        element: <Navigate to="/my-projects" replace />,
      },
      {
        path: "project/:projectId",
        element: <Project />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          {
            path: "dashboard",
            element: <ProjectDashboard />,
          },
          {
            path: "calendar",
            element: <Calendar />,
          },
          {
            path: "status/:date",
            element: <TaskStatus />,
          },
          {
            path: "estimation",
            element: <Estimation />,
          },
          {
            path: "task-module",
            element: <TaskModules />,
          },
          {
            path: "plans",
            element: <Plans />,
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
  {
    path: "my-projects",
    element: <MyProjects />,
  },
  {
    path: "projects/new",
    element: <NewProject />,
  },
]);
