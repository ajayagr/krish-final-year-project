import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Auth from "./pages/auth";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";

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
