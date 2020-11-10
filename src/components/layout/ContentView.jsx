import * as React from "react";
import { Routes } from "../../config/routes";
import { withRouter } from "react-router-dom";
import { Sidebar } from "./Sidebar";

// Dodaje Sidebar na sve komponente osim na Login komponentu i pdf komponentu
export const ContentView = withRouter(({ location }) => {
  let id = location.pathname.toString().slice(14, 15);

  return (
    <div>
      {location.pathname !== "/login" &&
        location.pathname !== "/notfound" &&
        location.pathname !== `/pdfworkorder/${id}` && <Sidebar />}
      <Routes />
    </div>
  );
});
