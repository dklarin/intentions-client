import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { AdminPrivateRoute } from "./AdminPrivateRoute";
import { Login } from "../components/login/Login";
import {
  WorkOrders,
  WorkOrderNew,
  WorkOrderChange,
  WorkOrderPDF,
  Intentions,
  IntentionNew,
} from "../components/workorders";
import { Users, UserNew, UserChange } from "../components/admin";
import { NotFound } from "./Notfound";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/workorders" />} />
      <Route path="/login" component={Login} />
      {/* ******************************************** */}
      <PrivateRoute path="/workorders" component={WorkOrders} />
      <PrivateRoute path="/intentions" component={Intentions} />
      <PrivateRoute path="/newintention" component={IntentionNew} />
      {/*<PrivateRoute path="/newworkorder" component={WorkOrderNew} />
      <PrivateRoute path="/changeworkorder/:id" component={WorkOrderChange} />
  <PrivateRoute path="/pdfworkorder/:id" component={WorkOrderPDF} />*/}
      {/* ******************************************** */}
      <AdminPrivateRoute path="/newuser" component={UserNew} />
      <PrivateRoute path="/changeuser/:id" component={UserChange} />)
      <AdminPrivateRoute path="/users" component={Users} />
      {/*} <Route path="/notfound" component={NotFound} />
      <Route path="*" render={() => <Redirect to="/notfound" />} />*/}
    </Switch>
  );
};
