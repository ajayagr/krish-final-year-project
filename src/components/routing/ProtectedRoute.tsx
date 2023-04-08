import React from "react";
import { Route, Navigate, PathRouteProps } from "react-router-dom";

interface ProtectedRouteProps extends PathRouteProps {
  isAuthenticated: boolean;
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  element,
  ...rest
}) => {
  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
