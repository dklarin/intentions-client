import React from "react";
import { Layout } from "./components/layout/Layout";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { light } from "./style/theme";

function App() {
  return (
    <ThemeProvider theme={light}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
