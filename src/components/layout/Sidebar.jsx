import React, { useState, useLayoutEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import styled from "styled-components";

import { Link } from "react-router-dom";
import { AUTH_TOKEN } from "../../utils/constants";

import { SideBar } from "./SideBar/SideBar";
//import "./SideBar/Sidebar.css";

const StyledProSidebar = styled(ProSidebar)`
  position: fixed;
`;

/*const StyledDiv = styled.div`
  position: fixed;
  width: 200px;
  height: 45px;
  left: 0px;
  top: 0px;
  background-color: white;
`;*/

export const Sidebar = () => {
  const role = localStorage.getItem("role");

  let collapsed = false;
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
  }

  function ShowWindowDimensions() {
    const [width] = useWindowSize();

    if (width < 1128) {
      collapsed = true;
    }
  }

  ShowWindowDimensions();

  return !collapsed ? (
    <StyledProSidebar>
      <Menu iconShape="square">
        <SubMenu title="Intencije" defaultOpen>
          <MenuItem>
            Lista intencija
            <Link to="/intentions" />
          </MenuItem>
          <MenuItem>
            Kalendar intencija
            <Link to="/calendar" />
          </MenuItem>
          <MenuItem>
            Nova intencija
            <Link to="/newintention" />
          </MenuItem>
        </SubMenu>
        {role === "admin" ? (
          <SubMenu title="Administracija" defaultOpen={true}>
            <MenuItem>
              Lista korisnika
              <Link to="/users" />
            </MenuItem>
            <MenuItem>
              Novi korisnik
              <Link to="/newuser" />
            </MenuItem>
          </SubMenu>
        ) : (
          <div />
        )}
        <MenuItem>
          Odjava
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              localStorage.clear();
            }}
          />
        </MenuItem>
      </Menu>
    </StyledProSidebar>
  ) : (
    <div>
      <SideBar />
      <div
        style={{
          position: "fixed",
          height: "60px",
          width: "472px",
          background: "white",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Sidebar;
