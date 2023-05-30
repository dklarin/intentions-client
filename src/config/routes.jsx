import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { AdminPrivateRoute } from "./AdminPrivateRoute";
import { Login } from "../components/login/Login";
import {
  IntentionPDF,
  Intentions,
  IntentionNew,
  IntentionUpdate,
  IntentionsCalendar,
} from "../components/intentions";
import { Users, UserNew, UserChange } from "../components/admin";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/intentions" />} />
      <Route path="/login" component={Login} />
      {/* ******************************************** */}
      <PrivateRoute path="/intentions" component={Intentions} />
      <PrivateRoute path="/calendar" component={IntentionsCalendar} />
      <PrivateRoute path="/newintention" component={IntentionNew} />
      <PrivateRoute path="/updateintention/:id" component={IntentionUpdate} />
      <PrivateRoute path="/pdfintention/:id" component={IntentionPDF} />
      {/* ******************************************** */}
      <AdminPrivateRoute path="/newuser" component={UserNew} />
      <PrivateRoute path="/changeuser/:id" component={UserChange} />
      <AdminPrivateRoute path="/users" component={Users} />   
    </Switch>
  );
};
