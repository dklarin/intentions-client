import React from "react";
import { Route, Redirect } from "react-router-dom";

export const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const role = localStorage.getItem("role");

  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          role === "admin" ? (
            <Component {...props} />
          ) : (
            <Redirect to="/workorders" />
          )
        }
      />
    </div>
  );
};

export default AdminPrivateRoute;
