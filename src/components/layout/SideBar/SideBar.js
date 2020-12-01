import React, { useState } from "react";
import { elastic as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

export const SideBar = (props) => {
  const [state, setState] = useState({ menuOpen: false });
  const handleStateChange = (state) => {
    setState({ menuOpen: state.isOpen });
  };
  const closeMenu = () => {
    setState({ menuOpen: false });
  };
  return (
    <Menu
      isOpen={state.menuOpen}
      onStateChange={(state) => handleStateChange(state)}
    >
      <Link
        className="menu-item"
        children="Lista"
        to="/intentions"
        onClick={() => closeMenu()}
      />
      <Link
        className="menu-item"
        children="Kalendar"
        to="/calendar"
        onClick={() => closeMenu()}
      />
      <Link
        className="menu-item"
        children="Nova"
        to="/newintention"
        onClick={() => closeMenu()}
      />
    </Menu>
  );
};
