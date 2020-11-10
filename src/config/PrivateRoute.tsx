import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AUTH_TOKEN } from "../utils/constants";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          authToken ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    </div>
  );
};

export default PrivateRoute;
